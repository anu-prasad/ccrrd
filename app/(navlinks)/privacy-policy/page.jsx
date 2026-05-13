'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content-section');
      const scrollPos = window.scrollY + 150;

      sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = [
    { id: 'section1', title: 'Information We Collect', number: '1' },
    { id: 'section2', title: 'How We Use This Information', number: '2' },
    { id: 'section3', title: 'Information Sharing and Disclosure', number: '3' },
    { id: 'section4', title: 'Data Security', number: '4' },
    { id: 'section5', title: 'Your Rights', number: '5' },
    { id: 'section6', title: 'Policy Updates', number: '6' },
    { id: 'contact', title: 'Contact Us', number: '7' },
  ];

  const informationTypes = [
    {
      icon: '👤',
      title: 'Personal Identification Information',
      description: 'Full name, phone number, email address, and postal address.',
      bgColor: 'bg-green-50 border-green-400',
      iconColor: 'text-green-500'
    },
    {
      icon: '💳',
      title: 'Financial / Transaction Information',
      description: 'Donation amount, payment mode, date, and transaction details.',
      bgColor: 'bg-blue-50 border-blue-400',
      iconColor: 'text-blue-500'
    },
    {
      icon: '🆔',
      title: 'PAN Information',
      description: 'Permanent Account Number (PAN) may be collected, especially for issuing tax exemption certificates under Section 80G/12A of the Income Tax Act.',
      bgColor: 'bg-purple-50 border-purple-400',
      iconColor: 'text-purple-500'
    },
    {
      icon: '📋',
      title: 'Optional Information',
      description: 'Any other details voluntarily shared by you while filling donation or contact forms.',
      bgColor: 'bg-yellow-50 border-yellow-400',
      iconColor: 'text-yellow-500'
    }
  ];

  const usageTypes = [
    {
      icon: '🧾',
      title: 'Issuing Receipts and Acknowledgments',
      description: 'To confirm and acknowledge your donation.',
      gradient: 'from-green-50 to-green-100'
    },
    {
      icon: '📜',
      title: 'Providing Tax Exemption Certificates',
      description: 'If applicable under 80G/12A.',
      gradient: 'from-blue-50 to-blue-100'
    },
    {
      icon: '✉️',
      title: 'Donor Communication',
      description: 'To share updates about CCRRD\'s projects, events, impact stories, and opportunities for support (only if you choose to opt-in for communication).',
      gradient: 'from-purple-50 to-purple-100'
    },
    {
      icon: '⚖️',
      title: 'Regulatory Compliance',
      description: 'To comply with legal and financial reporting requirements under Indian law.',
      gradient: 'from-orange-50 to-orange-100'
    }
  ];

  const userRights = [
    {
      icon: '🔍',
      text: 'Request a copy of the information we hold about you.',
      bgColor: 'bg-blue-50 border-blue-400',
      iconColor: 'text-blue-500'
    },
    {
      icon: '✏️',
      text: 'Correct or update your personal details.',
      bgColor: 'bg-green-50 border-green-400',
      iconColor: 'text-green-500'
    },
    {
      icon: '❌',
      text: 'Opt-out from receiving communications at any time by writing to us.',
      bgColor: 'bg-orange-50 border-orange-400',
      iconColor: 'text-orange-500'
    }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy - CCRRD</title>
        <meta name="description" content="Privacy Policy for Centre for Community Research and Rural Development (CCRRD). Learn how we protect and use your personal information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-gray-50 text-gray-800 min-h-screen">
        
        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At Centre for Community Research and Rural Development (CCRRD), we deeply value the trust and confidence of our donors, supporters, and well-wishers. Protecting your personal information and ensuring transparency in how we use it is of utmost importance to us.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              <span className="mr-2">📅</span>
              Last Updated: <span className="font-semibold">September 2025</span>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3">📋</span>
              Table of Contents
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group text-left"
                >
                  <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent font-bold text-lg">
                    {item.number}.
                  </span>
                  <span className="group-hover:text-blue-600 transition-colors">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 1 - Information We Collect */}
          <section id="section1" className="content-section bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100" style={{ scrollMarginTop: '100px' }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mr-4 text-4xl">1.</span>
              Information We Collect
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              When you choose to support CCRRD through donations, volunteering, or communication with us, we may collect the following details:
            </p>
            <div className="space-y-6">
              {informationTypes.map((item, index) => (
                <div key={index} className={`flex items-start space-x-4 p-4 ${item.bgColor} rounded-lg border-l-4`}>
                  <span className="text-xl mt-1">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 - How We Use Information */}
          <section id="section2" className="content-section bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100" style={{ scrollMarginTop: '100px' }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mr-4 text-4xl">2.</span>
              How We Use This Information
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The information collected from you is used only for legitimate purposes related to CCRRD's work. These include:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {usageTypes.map((item, index) => (
                <div key={index} className={`p-6 bg-gradient-to-br ${item.gradient} rounded-lg`}>
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 - Information Sharing */}
          <section id="section3" className="content-section bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100" style={{ scrollMarginTop: '100px' }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mr-4 text-4xl">3.</span>
              Information Sharing and Disclosure
            </h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="text-red-500 text-xl mr-3">🛡️</span>
                <h3 className="font-bold text-gray-800">Important Policy</h3>
              </div>
              <p className="text-gray-700 font-semibold">CCRRD does <strong>not sell, rent, or trade</strong> donor information to any third party.</p>
            </div>
            <p className="text-gray-600 mb-4">Information may be shared only with:</p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-500 mt-1">⚙️</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Authorized Service Providers</h3>
                  <p className="text-gray-600 text-sm">(such as payment gateways like Razorpay) for processing transactions securely.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-500 mt-1">🏛️</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Government Authorities</h3>
                  <p className="text-gray-600 text-sm">If required under applicable laws.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 - Data Security */}
          <section id="section4" className="content-section bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100" style={{ scrollMarginTop: '100px' }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mr-4 text-4xl">4.</span>
              Data Security
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We adopt industry-standard practices and technical safeguards to ensure that your personal and financial data remains safe and confidential.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg border border-green-200">
                <span className="text-green-600 text-2xl mb-4 block">🔒</span>
                <h3 className="font-semibold text-gray-800 mb-2">Secure Online Donations</h3>
                <p className="text-gray-600 text-sm">Online donations are processed securely through PCI-DSS compliant payment gateways.</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-sky-100 rounded-lg border border-blue-200">
                <span className="text-blue-600 text-2xl mb-4 block">👥</span>
                <h3 className="font-semibold text-gray-800 mb-2">Restricted Access</h3>
                <p className="text-gray-600 text-sm">Access to donor data is strictly limited to authorized CCRRD personnel.</p>
              </div>
            </div>
          </section>

          {/* Section 5 - Your Rights */}
          <section id="section5" className="content-section bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100" style={{ scrollMarginTop: '100px' }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mr-4 text-4xl">5.</span>
              Your Rights
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">As a donor, you have the right to:</p>
            <div className="space-y-4">
              {userRights.map((item, index) => (
                <div key={index} className={`flex items-center space-x-4 p-4 ${item.bgColor} rounded-lg border-l-4`}>
                  <span className="text-xl">{item.icon}</span>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6 - Policy Updates */}
          <section id="section6" className="content-section bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100" style={{ scrollMarginTop: '100px' }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mr-4 text-4xl">6.</span>
              Policy Updates
            </h2>
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-4">
                <span className="text-blue-500 text-xl mt-1">🔄</span>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    CCRRD may update this Privacy Policy periodically to reflect changes in legal requirements or organizational practices. Any updates will be posted on our official website, and the revised date will be mentioned at the top.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="content-section bg-gradient-to-br from-slate-900 via-blue-900 to-green-900 rounded-xl shadow-lg p-8 text-white" style={{ scrollMarginTop: '100px' }}>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="text-white mr-4 text-4xl">7.</span>
              Contact Us
            </h2>
            <p className="text-gray-200 mb-6 leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or the use of your information, please contact us at:
            </p>
            
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Centre for Community Research and Rural Development (CCRRD)</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span>✉️</span>
                  <a href="mailto:info@ccrrd.org" className="text-gray-200 hover:text-blue-400 transition-colors">info@ccrrd.org</a>
                </div>
                <div className="flex items-center space-x-3">
                  <span>📞</span>
                  <a href="tel:+919447474629" className="text-gray-200 hover:text-green-400 transition-colors">(+91) 9447474629</a>
                </div>
                <div className="flex items-center space-x-3">
                  <span>📞</span>
                  <a href="tel:+918848091303" className="text-gray-200 hover:text-green-400 transition-colors">(+91) 8848091303</a>
                </div>
              </div>
            </div>
          </section>

          {/* Back to Top Button */}
          <div className="text-center mt-12">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <span>⬆️</span>
              <span>Back to Top</span>
            </button>
          </div>
        </main>
      </div>
    </>
  );
}