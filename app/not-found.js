'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-6">
      {/* Error Code */}
      <h1 className="text-[8rem] md:text-[10rem] font-extrabold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 text-center max-w-lg mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow-md hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
      >
        <span>Go Back Home</span>
      </Link>
    </div>
  )
}
