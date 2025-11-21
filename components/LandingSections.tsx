
import React, { useState } from 'react';

const LandingSections: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "Is Doodax really free?", a: "Yes! Doodax is 100% free to use. We believe access to the legal system should be a right, not a privilege. We do not charge for document generation." },
    { q: "Is my data private?", a: "Absolutely. We use 'Client-Side Processing', which means your data never leaves your browser. It is not stored on our servers. It stays on your device." },
    { q: "Can I use this in any state?", a: "Our templates are designed to be generally applicable across the US, but specific county courts may have unique forms. We always recommend checking with your specific court clerk." },
    { q: "Do I need a lawyer for Small Claims?", a: "Generally, no. Small Claims Court is designed for self-representation. In some states (like California and Michigan), lawyers are actually not allowed in Small Claims Court." }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
        }
    }))
  };

  return (
    <div className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Why Choose Section */}
      <section className="py-20 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Platform Features</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-4 font-heading">Professional Legal Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We've built a powerful engine to simplify the complexity of small claims court into a few clicks.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Smart Wizard", desc: "Our step-by-step interface guides you through the legal requirements, preventing common errors.", icon: "🧙‍♂️" },
              { title: "Auto-Save Protection", desc: "Never lose your progress. We securely save your draft locally in your browser so you can return later.", icon: "💾" },
              { title: "Court-Ready PDF", desc: "Generate perfectly formatted, printable PDFs that meet court standards with a single click.", icon: "🖨️" }
            ].map((item, i) => (
              <div key={i} className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform" aria-hidden="true">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ */}
      <section className="py-20 bg-indigo-50/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 font-heading">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <button 
                        onClick={() => toggleFaq(i)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-answer-${i}`}
                    >
                        <h3 className="font-bold text-gray-800 text-base md:text-lg">{faq.q}</h3>
                        <span className={`transform transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} aria-hidden="true">
                            ▼
                        </span>
                    </button>
                    <div 
                        id={`faq-answer-${i}`}
                        className={`px-6 text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 py-4 border-t border-gray-100' : 'max-h-0'}`}
                    >
                        {faq.a}
                    </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white/95 backdrop-blur-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16 font-heading">Practical Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-200 transition-colors group">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="p-3 bg-green-100 text-green-600 rounded-xl group-hover:scale-110 transition-transform" aria-hidden="true">💸</span> 
                    Unpaid Debts
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">Perfect for situations where you lent money to a friend, family member, or acquaintance and they have failed to repay you according to your agreement.</p>
               </div>

               <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-200 transition-colors group">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform" aria-hidden="true">🏠</span> 
                    Security Deposits
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">Tenants can use this tool to draft a claim against landlords who wrongfully withhold security deposits after a lease has ended.</p>
               </div>
               
               <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-200 transition-colors group">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:scale-110 transition-transform" aria-hidden="true">🔨</span> 
                    Service Disputes
                  </h3>
                  <p className="text-gray-600 mb-4 text-lg">For cases where a contractor or service provider was paid but failed to complete the work or did a poor job.</p>
               </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-200 transition-colors group">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="p-3 bg-purple-100 text-purple-600 rounded-xl group-hover:scale-110 transition-transform" aria-hidden="true">🚗</span> 
                    Property Damage
                  </h3>
                  <p className="text-gray-600 mb-4 text-lg">Recover costs for repairs to your car, fence, or other property caused by someone else's negligence.</p>
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700"></div>
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
             <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(0,0,0,0)_50%)] animate-spin-slow"></div>
         </div>
         
         <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
           <h2 className="text-4xl md:text-6xl font-bold mb-8 font-heading text-white">Make the Law Work For You</h2>
           <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">Join over 50,000+ users who use Doodax to assert their rights and resolve disputes without expensive legal fees.</p>
           <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-white text-indigo-600 font-bold py-4 px-12 rounded-full text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/20 hover:scale-105">
             Start Your Statement
           </button>
         </div>
      </section>
    </div>
  );
};

export default LandingSections;
