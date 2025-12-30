// Twitter API integration using RapidAPI

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!
const TWITTER_API_ENDPOINT = process.env.TWITTER_API_ENDPOINT || 'https://twitter241.p.rapidapi.com'

export interface TwitterPost {
  tweet_id: string
  author_handle: string
  author_name: string
  author_avatar: string | null
  content: string
  media_urls: string[] | null
  likes_count: number
  retweets_count: number
  replies_count: number
  bookmarks_count: number | null
  posted_at: string
  source_account: string
}

export interface TwitterThresholds {
  min_likes: number
  min_retweets: number
  min_replies: number
  min_bookmarks: number
  is_active: boolean
}

async function fetchTwitterAPI(endpoint: string, params?: Record<string, string>) {
  const url = new URL(`${TWITTER_API_ENDPOINT}${endpoint}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'twitter241.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_KEY,
    },
  })

  if (!response.ok) {
    throw new Error(`Twitter API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Get user's timeline tweets
export async function getUserTweets(username: string, count: number = 40) {
  try {
    // First get user ID from username
    const userResponse = await fetchTwitterAPI('/user-by-username', { username })

    if (!userResponse.data?.rest_id) {
      throw new Error('User not found')
    }

    const userId = userResponse.data.rest_id

    // Get user's tweets
    const tweetsResponse = await fetchTwitterAPI('/user-tweets', {
      user: userId,
      count: count.toString(),
    })

    const tweets = tweetsResponse.data?.user?.result?.timeline_v2?.timeline?.instructions || []

    // Extract actual tweets from the response
    const allTweets: any[] = []
    for (const instruction of tweets) {
      if (instruction.type === 'TimelineAddEntries') {
        const entries = instruction.entries || []
        for (const entry of entries) {
          if (entry.content?.entryType === 'TimelineTimelineItem') {
            const tweetResults = entry.content?.itemContent?.tweet_results?.result
            if (tweetResults) {
              allTweets.push(tweetResults)
            }
          }
        }
      }
    }

    return allTweets.map(parseTwitterTweet).filter(Boolean)
  } catch (error) {
    console.error('Error fetching user tweets:', error)
    throw error
  }
}

// Get liked tweets (as shown in your example)
export async function getLikedTweets(tweetId: string, count: number = 40) {
  try {
    const response = await fetchTwitterAPI('/likes', {
      pid: tweetId,
      count: count.toString(),
    })

    const tweets = response.data || []

    return tweets.map((item: any) => {
      const tweet = item.tweet || item
      return parseTwitterTweet(tweet)
    }).filter(Boolean)
  } catch (error) {
    console.error('Error fetching liked tweets:', error)
    throw error
  }
}

// Parse Twitter API response to our format
function parseTwitterTweet(tweetData: any): TwitterPost | null {
  try {
    if (!tweetData) return null

    const legacy = tweetData.legacy || tweetData.tweet?.legacy
    const core = tweetData.core?.user_results?.result
    const userLegacy = core?.legacy

    if (!legacy || !core) return null

    const mediaEntities = legacy.entities?.media_urls || []
    const mediaUrls = mediaEntities.map((m: any) => m.media_url_https || m.url).filter(Boolean)

    return {
      tweet_id: legacy.id_str || tweetData.rest_id,
      author_handle: userLegacy?.screen_name || '',
      author_name: userLegacy?.name || '',
      author_avatar: userLegacy?.profile_image_url_https || null,
      content: legacy.full_text || '',
      media_urls: mediaUrls.length > 0 ? mediaUrls : null,
      likes_count: legacy.favorite_count || 0,
      retweets_count: legacy.retweet_count || 0,
      replies_count: legacy.reply_count || 0,
      bookmarks_count: null, // Not always available
      posted_at: legacy.created_at || new Date().toISOString(),
      source_account: userLegacy?.screen_name || '',
    }
  } catch (error) {
    console.error('Error parsing tweet:', error)
    return null
  }
}

// Filter tweets by thresholds
export function filterTweetsByThresholds(tweets: TwitterPost[], thresholds: TwitterThresholds): TwitterPost[] {
  if (!thresholds.is_active) return tweets

  return tweets.filter(tweet => {
    if (tweet.likes_count < thresholds.min_likes) return false
    if (tweet.retweets_count < thresholds.min_retweets) return false
    if (tweet.replies_count < thresholds.min_replies) return false
    if (thresholds.min_bookmarks > 0 && (tweet.bookmarks_count || 0) < thresholds.min_bookmarks) return false
    return true
  })
}
