'use client'

import { useState, useEffect } from 'react'
import { Phone, Mail, Globe, User } from 'lucide-react'
import Navbar from '@/components/nav';


const AnimatedQuote = ({ quote, author }: { quote: string; author: string }) => (
  <div className="quote-container animate-fade-in">
    <p className="text-xl italic text-green-400 mb-2">&ldquo;{quote}&rdquo;</p>
    <p className="text-white text-sm">- {author}</p>
  </div>
)

const quotes = [
  {
    quote: "Champions keep playing until they get it right",
    author: "Billie Jean King"
  },
  {
    quote: "True victory is victory over oneself",
    author: "Olga Korbut"
  },
  {
    quote: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing",
    author: "Pelé"
  }
]

export default function AntiDopingContacts() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', { name, email, message })
    // Reset form fields
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black text-white">
      {/* New Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl font-bold leading-tight animate-slide-in">
                Empowering Athletes Through{' '}
                <span className="text-green-400">Fair Play</span>
              </h1>
              <p className="text-gray-300 text-lg animate-fade-in">
                Your trusted companion for anti-doping awareness and support. We provide confidential counseling and resources to help athletes maintain integrity in sports.
              </p>
              <div className="flex gap-8 animate-slide-in">
                <div>
                  <div className="text-3xl font-bold text-green-400">98%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">10k+</div>
                  <div className="text-gray-400">Athletes Helped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">24/7</div>
                  <div className="text-gray-400">Support</div>
                </div>
              </div>
              <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center gap-2 animate-fade-in">
                Get Support Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="relative animate-fade-in hidden md:block">
              <div className="relative z-10 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Counseling Success</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-white">89%</div>
                      <div className="text-sm text-gray-400">Athletes report improved well-being</div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Response Time</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-white">&lt;2h</div>
                      <div className="text-sm text-gray-400">Average support response</div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Global Network</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-white">50+</div>
                      <div className="text-sm text-gray-400">Countries supported</div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Expert Team</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-white">200+</div>
                      <div className="text-sm text-gray-400">Certified counselors</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="bg-gray-900 py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-32">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-500 ${
                  index === currentQuote
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform translate-y-8'
                }`}
              >
                <AnimatedQuote quote={quote.quote} author={quote.author} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-green-700 py-4 mb-[10vh]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold animate-slide-in">Anti-Doping Resources & Contacts</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* <section className="mb-12 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">About Anti-Doping</h2>
          <p className="text-gray-300">
            Anti-doping programs seek to preserve what is intrinsically valuable about sport. This intrinsic value is often referred to as "the spirit of sport"; it is the essence of Olympism; it is how we play true.
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-300">
            <li className="animate-slide-in" style={{ animationDelay: '0.1s' }}>Ethics, fair play and honesty</li>
            <li className="animate-slide-in" style={{ animationDelay: '0.2s' }}>Health</li>
            <li className="animate-slide-in" style={{ animationDelay: '0.3s' }}>Excellence in performance</li>
          </ul>
        </section> */}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-green-500 rounded-lg p-6 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-green-400">WADA Contacts</h3>
              <p className="text-gray-400">World Anti-Doping Agency</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Globe className="mr-2 text-green-400" />
                <a href="https://www.wada-ama.org" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                  www.wada-ama.org
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 text-green-400" />
                <span className="text-white">+1 514-904-9232</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 text-green-400" />
                <a href="mailto:info@wada-ama.org" className="text-green-400 hover:underline">
                  info@wada-ama.org
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-green-500 rounded-lg p-6 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-green-400">NADA Contacts</h3>
              <p className="text-gray-400">National Anti-Doping Agency</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Globe className="mr-2 text-green-400" />
                <a href="https://www.nadaindia.org" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                  www.nadaindia.org
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 text-green-400" />
                <span className="text-white">+91 11-24368274</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 text-green-400" />
                <a href="mailto:info@nadaindia.org" className="text-green-400 hover:underline">
                  info@nadaindia.org
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Counselors and Advisors</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Dr. Jane Smith", role: "Sports Psychologist", contact: "+1 123-456-7890" },
              { name: "John Doe", role: "Nutritionist", contact: "+1 234-567-8901" },
              { name: "Dr. Emily Brown", role: "Anti-Doping Advisor", contact: "+1 345-678-9012" },
            ].map((advisor, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-green-500 rounded-lg p-6 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <User className="w-12 h-12 text-green-400 mb-2" />
                  <h3 className="font-semibold text-lg">{advisor.name}</h3>
                  <p className="text-gray-400">{advisor.role}</p>
                  <p className="text-green-400 mt-2">{advisor.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Need Help?</h2>
          <div className="bg-gray-900 border border-green-500 rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-green-400">Contact Us</h3>
              <p className="text-gray-400">
                If you need any assistance or have questions, please don't hesitate to reach out.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        .animate-slide-in {
          animation: slideIn 0.5s ease-in-out;
        }

        .quote-container {
          max-width: 600px;
          text-align: center;
        }
      `}</style>
    </div>
    </>
  )
}

