'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function RefundPolicy() {
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
    { id: 'general-policy', title: 'General Policy', number: '1' },
    { id: 'exceptional-cases', title: 'Exceptional Cases for Refunds', number: '2' },
    { id: 'refund-process', title: 'Refund Process', number: '3' },
    { id: 'contact-info', title: 'Contact Information', number: '4' },
  ];

  const exceptionalCases = [
    {
      icon: '🔄',
      title: 'Duplicate Transaction',
      description: 'When the same donation has been processed multiple times accidentally.',
      bgColor: 'bg-blue-50 border-blue-400',
      iconBg: 'bg-blue-100'
    },
    {
      icon: '⚠️',
      title: 'Technical Error in Payment Processing',
      description: 'System errors that result in incorrect transaction processing.',
      bgColor: 'bg-red-50 border-red-400',
      iconBg: 'bg-red-100'
    },
    {
      icon: '💰',
      title: 'Wrong Donation Amount Entered',
      description: 'When an incorrect amount was entered due to user error.',
      bgColor: 'bg-green-50 border-green-400',
      iconBg: 'bg-green-100'
    }
  ];

  const refundSteps = [
    {
      step: '1',
      title: 'Submit Written Request',
      description: 'Send a written request to info@ccrrd.org within 7 working days of the transaction.',
      icon: '✍️',
      color: 'from-blue-500 to-purple-500'
    },
    {
      step: '2',
      title: 'Provide Proof of Payment',
      description: 'Include transaction details, receipt, or payment confirmation as proof.',
      icon: '📋',
      color: 'from-green-500 to-blue-500'
    },
    {
      step: '3',
      title: 'Processing & Approval',
      description: 'Approved refunds will be processed to the original payment method within 15 working days.',
      icon: '⏱️',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <>
      <Head>
        <title>Donation Refund Policy - CCRRD</title>
        <meta name="description" content="Donation Refund Policy for Centre for Community Research and Rural Development (CCRRD). Learn about our refund process and exceptional cases." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-gray-50 text-gray-800 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-4">
              Refund Policy
            </h1>
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

          {/* Section 1 - General Policy */}
          <section id="general-policy" className="content-section bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100" style={{ scrollMarginTop: '100px' }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mr-4 text-4xl">1.</span>
              General Policy
            </h2>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <span className="text-orange-600 text-2xl">🚫</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Non-Refundable Donations</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Donations made to <strong>CCRRD</strong> are generally <strong>non-refundable</strong>, as they are used immediately for charitable purposes.
                  </p>
                  <div className="mt-4 p-4 bg-white/50 rounded-lg">
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="mr-2">💡</span>
                      <em>Your generous contributions directly support our community research and rural development initiatives.</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 - Exceptional Cases */}
          <section id="exceptional-cases" className="content-section bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100" style={{ scrollMarginTop: '100px' }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mr-4 text-4xl">2.</span>
              Exceptional Cases for Refunds
            </h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-blue-600 text-xl mr-3">ℹ️</span>
                <h3 className="font-semibold text-gray-800">Important Notice</h3>
              </div>
              <p className="text-gray-700">
                Refunds may <strong>only</strong> be considered in the following exceptional circumstances:
              </p>
            </div>

            <div className="space-y-6">
              {exceptionalCases.map((item, index) => (
                <div key={index} className={`${item.bgColor} rounded-xl p-6 border-l-4 transform hover:scale-[1.02] transition-transform duration-200`}>
                  <div className="flex items-start space-x-4">
                    <div className={`${item.iconBg} p-3 rounded-full`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 - Refund Process */}
          <section id="refund-process" className="content-section bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100" style={{ scrollMarginTop: '100px' }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mr-4 text-4xl">3.</span>
              Refund Process
            </h2>
            
            <p className="text-gray-600 mb-8 text-lg">
              If your case qualifies for a refund under the exceptional circumstances mentioned above, please follow these steps:
            </p>

            <div className="space-y-8">
              {refundSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < refundSteps.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-transparent"></div>
                  )}
                  
                  <div className="flex items-start space-x-6">
                    {/* Step Number */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {step.step}
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{step.icon}</span>
                        <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{step.description}</p>
                      
                      {/* Special highlighting for email step */}
                      {step.step === '1' && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800 font-medium flex items-center">
                            <span className="mr-2">📧</span>
                            Email: <a href="mailto:info@ccrrd.org" className="ml-1 underline hover:text-blue-600">info@ccrrd.org</a>
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            ⏰ Time Limit: Within 7 working days of transaction
                          </p>
                        </div>
                      )}
                      
                      {/* Special highlighting for processing time */}
                      {step.step === '3' && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-800 font-medium flex items-center">
                            <span className="mr-2">⚡</span>
                            Processing Time: 15 working days maximum
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Notice */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <span className="text-yellow-600 text-xl">⚠️</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Please Note:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• All refund requests are subject to review and approval</li>
                    <li>• Refunds will be processed to the original payment method only</li>
                    <li>• Processing fees may be deducted from the refund amount</li>
                    <li>• CCRRD reserves the right to decline refund requests that don't meet the criteria</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 - Contact Information */}
          <section id="contact-info" className="content-section bg-gradient-to-br from-slate-900 via-blue-900 to-green-900 rounded-xl shadow-lg p-8 text-white" style={{ scrollMarginTop: '100px' }}>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="text-white mr-4 text-4xl">4.</span>
              Contact Information
            </h2>
            <p className="text-gray-200 mb-6 leading-relaxed">
              For any questions regarding our refund policy or to submit a refund request, please contact us:
            </p>
            
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Centre for Community Research and Rural Development (CCRRD)</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span>✉️</span>
                  <div>
                    <span className="text-gray-300 text-sm">Refund Requests:</span>
                    <br />
                    <a href="mailto:info@ccrrd.org" className="text-white hover:text-blue-400 transition-colors font-medium">info@ccrrd.org</a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span>📞</span>
                  <div>
                    <span className="text-gray-300 text-sm">Phone Support:</span>
                    <br />
                    <a href="tel:+919447474629" className="text-white hover:text-green-400 transition-colors font-medium">(+91) 9447474629</a>
                    <span className="text-gray-400 mx-2">|</span>
                    <a href="tel:+918848091303" className="text-white hover:text-green-400 transition-colors font-medium">(+91) 8848091303</a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🕐</span>
                  <div>
                    <span className="text-gray-300 text-sm">Response Time:</span>
                    <br />
                    <span className="text-white font-medium">Within 2-3 business days</span>
                  </div>
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
        </div>
      </div>
    </>
  );
}