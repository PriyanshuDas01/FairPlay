// import Image from "next/image"
// import Img1 from '@/images/2.jpg'
// import Img2 from '@/images/1.jpg'
// import Navbar from "@/components/nav"

// export default function AddBlog() {
//   return (
//     <>
//     {/* <Navbar/> */}
//     <main className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="border-b">
//         <div className="container mx-auto px-4 py-6">
//           <div className="space-y-2">
//             <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">
//               Sports & Wellness Journal
//             </div>
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//               Athletes for Awareness
//             </h1>
//             <p className="text-lg text-gray-600">
//               Exploring the intersection of sports excellence and substance awareness through powerful stories and expert insights.
//             </p>
//           </div>
//         </div>
//       </header>

//       {/* Featured Article */}
//       <section className="container mx-auto px-4 py-12">
//         <article className="relative overflow-hidden rounded-xl bg-red-500 text-white">
//           <div className="relative z-10 grid gap-4 p-8 md:grid-cols-2 md:p-12 lg:p-16">
//             <div className="space-y-4">
//               <div className="text-sm font-medium">Featured Story</div>
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
//                 The Road to Recovery: From Professional Athlete to Mental Health Advocate
//               </h2>
//               <p className="text-blue-100">
//                 A compelling journey of transformation, resilience, and the importance of mental health in professional sports.
//               </p>
//               <button className="bg-white text-green-600 hover:bg-gray-100 px-2 py-3">
//                 Read Full Story
//               </button>
//             </div>
//             <div className="relative aspect-video md:aspect-auto">
//               <Image
//                 src={Img1}
//                 alt="Featured article cover"
//                 className="rounded-lg object-cover"
//                 fill
//                 priority
//               />
//             </div>
//           </div>
//         </article>
//       </section>

//       {/* Recent Articles Grid */}
//       <section className="container mx-auto px-4 py-12">
//         <h2 className="mb-8 text-2xl font-bold">Latest Articles</h2>
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {[
//             {
//               title: "Understanding Performance-Enhancing Substances in Sports",
//               category: "Education",
//               description: "A comprehensive guide to recognizing and avoiding harmful substances in competitive sports."
//             },
//             {
//               title: "Youth Sports & Prevention Programs",
//               category: "Community",
//               description: "How local sports programs are leading the fight against substance abuse in young athletes."
//             },
//             {
//               title: "Mental Health in Professional Sports",
//               category: "Wellness",
//               description: "Breaking the stigma: Professional athletes speak out about mental health and substance use."
//             }
//           ].map((article, i) => (
//             <article key={i} className="group cursor-pointer space-y-4">
//               <div className="relative aspect-video overflow-hidden rounded-lg">
//                 <Image
//                   src={Img2}
//                   alt={article.title}
//                   className="object-cover transition-transform duration-300 group-hover:scale-105"
//                   fill
//                 />
//               </div>
//               <div className="space-y-2">
//                 <div className="text-sm font-medium text-blue-600">{article.category}</div>
//                 <h3 className="text-xl font-semibold text-gray-900">{article.title}</h3>
//                 <p className="text-gray-600">{article.description}</p>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

     
       
//     </main>
//     </>
//   )
// }


'use client';
import { useEffect, useState } from 'react';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '@/lib/api';
import Navbar from '@/components/nav';
import Img1 from "@/images/1.jpg";
import Image from 'next/image';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleCreateBlog = async () => {
    if (newBlog.title.trim() && newBlog.content.trim() && newBlog.author.trim()) {
      try {
        // Fix here: Pass individual properties instead of the whole object
        const blog = await createBlog(newBlog.title, newBlog.content, newBlog.author);
        setBlogs((prev) => [...prev, blog]);
        setNewBlog({ title: '', content: '', author: '' });
      } catch (error) {
        console.error('Failed to create blog:', error);
      }
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-semibold text-center mt-[5vh] text-gray-800 mb-6">Blog Posts</h1>
      <p className="text-lg text-center mt-[5vh] text-gray-400 mb-6">"Writing is the painting of the voice."</p>
      <div className="max-w-7xl mt-[20vh] mx-auto p-6 rounded-lg shadow-md shadow-green-600 flex flex-col lg:flex-row">
        <div className="lg:w-2/3">
          <div className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              className="p-3 border border-gray-300 shadow-md shadow-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              className="p-3 border border-gray-300 shadow-md shadow-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              placeholder="Content"
            />
            <input
              type="text"
              className="p-3 border border-gray-300 shadow-md shadow-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={newBlog.author}
              onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
              placeholder="Author"
            />
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg shadow-blue-600 transition-all duration-300"
              onClick={handleCreateBlog}
            >
              Add Blog
            </button>
          </div>
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li key={blog._id} className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300">
                <h2 className="text-lg font-bold text-gray-700">{blog.title}</h2>
                <p className="text-gray-600">{blog.content}</p>
                <p className="text-sm text-gray-500 mt-2">By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</p>
                <button
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                  onClick={() => handleDeleteBlog(blog._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Image for larger screens */}
        <div className="hidden md:block lg:w-2/3 pl-[25vh]">
          <Image
            src={Img1}
            alt="Opening Image"
            className="w-[25vh] h-[25vh] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
