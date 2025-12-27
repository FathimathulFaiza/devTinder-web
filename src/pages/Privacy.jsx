import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span>devPartner</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-slate-900 px-8 py-10 text-white">
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-slate-400">
              Last Updated: <span className="text-white">December 25, 2025</span>
            </p>
          </div>

          {/* Policy Text Section */}
          <div className="p-8 md:p-12 space-y-10">
            
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed">
                Welcome to devPartner. We value your privacy and the security of your data. This Privacy Policy 
                explains how we collect, use, and protect your information when you use our platform for 
                connecting with other developers.
              </p>
            </section>

            {/* Information Collection */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">2. Information We Collect</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-2">Personal Data</h3>
                  <p className="text-sm text-slate-600">Name, email address, profile picture, and professional background details you choose to share.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-2">Usage Data</h3>
                  <p className="text-sm text-slate-600">IP addresses, browser type, and interactions with other developers on the platform.</p>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">3. How We Use Your Data</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>To provide and maintain our Service.</li>
                <li>To notify you about changes to our Service.</li>
                <li>To allow you to participate in interactive features (like requests and connections).</li>
                <li>To provide customer support and collect valuable feedback.</li>
              </ul>
            </section>

            {/* Contact Section */}
            <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h2 className="text-xl font-bold text-blue-900 mb-2">4. Contact Us</h2>
              <p className="text-blue-800">
                If you have any questions about this Privacy Policy, please contact our privacy team:
              </p>
              <p className="mt-4 font-mono font-bold text-blue-700">privacy@devpartner.com</p>
            </section>

          </div>
        </div>
        
        {/* Footer info */}
        <p className="text-center text-slate-400 text-sm mt-8">
          &copy; 2025 devPartner. All rights reserved.
        </p>
      </main>
    </div>
  );
};

export default Privacy;