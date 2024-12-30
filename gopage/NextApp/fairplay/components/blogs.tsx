'use client';
import { useEffect, useState } from 'react';
import { getBlogs } from '@/lib/api';
import Image from "next/image"
import Img1 from '@/images/2.jpg'
import Navbar from "@/components/nav"

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  thumbnail?: string;
}

export default function Blog() {
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const blogs = await getBlogs();
        setLatestBlogs(blogs.slice(0, 3)); // Get the latest 3 blogs
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">
                Sports & Wellness Journal
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Athletes for Awareness
              </h1>
              <p className="text-lg text-gray-600">
                Exploring the intersection of sports excellence and substance awareness through powerful stories and expert insights.
              </p>
            </div>
          </div>
        </header>

        {/* Featured Article */}
        <section className="container mx-auto px-4 py-12">
          <article className="relative overflow-hidden rounded-xl bg-green-500 text-white">
            <div className="relative z-10 grid gap-4 p-8 md:grid-cols-2 md:p-12 lg:p-16">
              <div className="space-y-4">
                <div className="text-sm font-medium">Featured Story</div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  The Road to Recovery: From Professional Athlete to Mental Health Advocate
                </h2>
                <p className="text-blue-100">
                  A compelling journey of transformation, resilience, and the importance of mental health in professional sports.
                </p>
                <button className="bg-white text-green-600 hover:bg-gray-100 px-2 py-3">
                  Read Full Story
                </button>
              </div>
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={Img1}
                  alt="Featured article cover"
                  className="rounded-lg object-cover"
                  fill
                  priority
                />
              </div>
            </div>
          </article>
        </section>

        {/* Recent Articles Grid */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="mb-8 text-2xl font-bold">Latest Articles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestBlogs.map((blog) => (
              <article key={blog._id} className="group cursor-pointer space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={blog.thumbnail || '/placeholder.svg'}
                    alt={blog.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    fill
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-blue-600">Category</div>
                  <h3 className="text-xl font-semibold text-gray-900">{blog.title}</h3>
                  <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

