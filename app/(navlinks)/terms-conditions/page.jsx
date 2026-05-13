'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function TermsAndConditions() {
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
    { id: 'voluntary-donations', title: 'Voluntary Donations', number: '1' },
    { id: 'donor-rights', title: 'Donor Rights', number: '2' },
    { id: 'use-of-donations', title: 'Use of Donations', number: '3' },
    { id: 'our-responsibility', title: 'Our Responsibility', number: '4' },
    { id: 'limitations', title: 'Limitations', number: '5' },
  ];

  const sections = [
    {
      id: 'voluntary-donations',
      number: '1',
      title: 'Voluntary Donations',
      content: 'All contributions to CCRRD are voluntary and non-refundable, except under the refund rules mentioned above.',
      icon: '🤝',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'donor-rights',
      number: '2',
      title: 'Donor Rights',
      content: 'Donors will receive an official receipt for every contribution. If CCRRD holds valid 80G/12A registration, donors may claim income tax benefits as per the Income Tax Act, 1961.',
      icon: '📜',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'use-of-donations',
      number: '3',
      title: 'Use of Donations',
      content: 'Contributions will be utilized for CCRRD’s charitable activities in community development, research, rural welfare, and related programs.',
      icon: '🌍',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'our-responsibility',
      number: '4',
      title: 'Our Responsibility',
      content: 'CCRRD will maintain transparency in fund utilization. CCRRD will protect donor data and comply with all legal obligations.',
      icon: '🛡️',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'limitations',
      number: '5',
      title: 'Limitations',
      content: 'CCRRD will not be liable for any indirect or incidental losses arising from use of its website, payment gateway, or donation services.',
      icon: '⚠️',
      color: 'from-yellow-500 to-red-500'
    }
  ];

  return (
    <>
      <Head>
        <title>Terms & Conditions - CCRRD</title>
        <meta name="description" content="Terms & Conditions for Centre for Community Research and Rural Development (CCRRD). Learn about our policies and donor rights." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-gray-50 text-gray-800 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-4">
              Terms & Conditions
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

          {/* Sections */}
          {sections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className="content-section bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100"
              style={{ scrollMarginTop: '100px' }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span className={`bg-gradient-to-r ${sec.color} bg-clip-text text-transparent mr-4 text-4xl`}>
                  {sec.number}.
                </span>
                {sec.title}
              </h2>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-gray-100">
                  <span className="text-2xl">{sec.icon}</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{sec.content}</p>
              </div>
            </section>
          ))}

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
