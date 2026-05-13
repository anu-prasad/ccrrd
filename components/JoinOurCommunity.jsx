"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

export default function JoinOurCommunity() {
  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Simple top separator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#214293] to-[#347d3a]"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Title */}
        <h2 className="text-4xl font-bold text-[#214293] mb-6">
          Join Our Community
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
          "Each person who visits{" "}
          <span className="font-semibold text-[#214293]">
            CCRRD
          </span>
          is not just our guest, but and inspiration to us. We are deeply grateful for your presence and invite you to walk with us in building a resilient and hopeful planet for future generations.""
        </p>

        {/* Button */}
        <Link
          href="/involved"
          className="inline-flex items-center gap-3 bg-[#347d3a] hover:bg-[#214293] text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Users className="w-5 h-5" />
          Register as Volunteer
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}