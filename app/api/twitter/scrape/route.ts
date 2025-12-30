import { NextRequest, NextResponse } from 'next/server'
import { db, supabase } from '@/lib/supabase'
import { getUserTweets, filterTweetsByThresholds } from '@/lib/twitter-api'

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json(
        { success: false, error: 'Username is required' },
        { status: 400 }
      )
    }

    // Get current thresholds
    const thresholdsData = await db.getThresholds()
    const thresholds = thresholdsData || {
      min_likes: 100,
      min_retweets: 50,
      min_replies: 20,
      min_bookmarks: 0,
      is_active: true
    }

    // Fetch tweets from Twitter API
    const tweets = await getUserTweets(username, 40)

    // Filter by thresholds
    const filteredTweets = filterTweetsByThresholds(tweets, thresholds)

    // Save to database
    let savedCount = 0
    let skippedCount = 0

    for (const tweet of filteredTweets) {
      try {
        // Check if tweet already exists
        const { data: existing } = await supabase
          .from('twitter_posts')
          .select('id')
          .eq('tweet_id', tweet.tweet_id)
          .single()

        if (existing) {
          skippedCount++
          continue
        }

        // Insert new tweet
        await supabase
          .from('twitter_posts')
          .insert({
            ...tweet,
            is_published: true
          })

        savedCount++
      } catch (error) {
        console.error('Error saving tweet:', error)
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        total: tweets.length,
        filtered: filteredTweets.length,
        saved: savedCount,
        skipped: skippedCount
      },
      message: `Successfully scraped ${savedCount} tweets (${skippedCount} already existed)`
    })
  } catch (error) {
    console.error('Error scraping tweets:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to scrape tweets'
      },
      { status: 500 }
    )
  }
}
