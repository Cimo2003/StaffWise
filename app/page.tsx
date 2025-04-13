import Image from "next/image"
import Link from "next/link"
import { Calendar, Bell, Smartphone } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/mainLogo.png"
            alt="Staff Wise Logo"
            width={32}
            height={32}
            className="text-primary"
          />
          <span className="text-2xl font-semibold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            Staff Wise
          </span>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="border border-gray-300 bg-white px-6 py-2 rounded hover:bg-gray-50 transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
            Get Started
          </Link>
        </div>
        
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-10% to-white py-16 md:py-24">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
                Transform Class Schedule Chaos into Perfect Organization
              </h1>
              <p className="text-gray-700 mb-8 max-w-lg">
                The intelligent scheduling system that streamlines college administration, ensuring efficient
                organization of educational processes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition-colors">
                  Start Free Trial
                </Link>
                <Link href="/login" className="border border-gray-300 bg-white px-6 py-3 rounded hover:bg-gray-50 transition-colors">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-b from-90% to-white rounded-xl shadow-xl p-4 mb-8">
                <Image
                  src="/DashboardScreenshot.png?height=300&width=500"
                  alt="Schedule Dashboard"
                  width={500}
                  height={300}
                  className="rounded-lg opacity-75"
                />
              </div>
              <div className="bg-gradient-to-b from-90% to-white rounded-xl shadow-xl p-4 absolute bottom-0 -right-10 translate-y-1/4 max-w-xs">
                <Image
                  src="/analyticsDashboard.png?height=150&width=300"
                  alt="Analytics Dashboard"
                  width={300}
                  height={150}
                  className="rounded-lg opacity-75"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Illustration Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <Image
              src="/schedule.png"
              alt="Schedule Illustration"
              width={400}
              height={200}
              className="mx-auto"
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">Powerful Features for Efficient Management</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Scheduling</h3>
                <p className="text-gray-600">Intelligent system for automatic distribution of classes and resources.</p>
              </div>
              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Conflict Prevention</h3>
                <p className="text-gray-600">Advanced alert system to prevent scheduling conflicts and overlaps.</p>
              </div>
              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mobile Access</h3>
                <p className="text-gray-600">Access and manage schedules from anywhere using our mobile app.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-t from-55% to-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Institutionaposs Scheduling?</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Join hundreds of institutions already using SchedulePro
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition-colors">
                Start Free Trial
              </Link>
              <Link href="/login" className="border border-gray-300 bg-white px-6 py-3 rounded hover:bg-gray-50 transition-colors">
                  Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">SchedulePro</h3>
              <p className="text-gray-400 text-sm">Modern educational scheduling for the modern era.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            © 2023 SchedulePro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

