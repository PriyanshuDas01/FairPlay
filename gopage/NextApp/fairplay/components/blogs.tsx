'use client';
import { useEffect, useState, useRef } from 'react';
import { getBlogs } from '@/lib/api';
import Image from "next/image"
import Img1 from '@/images/2.jpg'
import Navbar from "@/components/nav"
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  thumbnail?: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getBlogs();
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  const handleClosePopup = () => {
    setSelectedBlog(null);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

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
            {blogs.slice(0, 3).map((blog) => (
              <article key={blog._id} className="group cursor-pointer space-y-4" onClick={() => handleBlogClick(blog)}>
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

        {/* Older Articles Side-Scroll */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="mb-8 text-2xl font-bold">Older Articles</h2>
          <div className="relative">
            <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
              {blogs.slice(3).map((blog) => (
                <article key={blog._id} className="flex-shrink-0 w-64 cursor-pointer space-y-4" onClick={() => handleBlogClick(blog)}>
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
                    <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
                    <p className="text-gray-600">{blog.content.substring(0, 50)}...</p>
                  </div>
                </article>
              ))}
            </div>
            <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </section>
      </main>

      {/* Blog Popup */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <button onClick={handleClosePopup} className="absolute top-4 right-4">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            {selectedBlog.thumbnail && (
              <Image
                src={selectedBlog.thumbnail}
                alt={selectedBlog.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <p className="text-gray-600 mb-4">{selectedBlog.content}</p>
            <p className="text-sm text-gray-500">By {selectedBlog.author} on {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </>
  )
}

