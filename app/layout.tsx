import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI知识学习网站",
  description: "个人AI知识管理平台 - 收集AI实践、图片、学习心得和Twitter精选内容",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-slate-800 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
            <p>© 2024 AI知识库. Built with Next.js & Supabase</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
