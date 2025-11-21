import React, { useState, ReactNode } from 'react';
import Starfield from './Starfield';

interface LayoutProps {
  children: ReactNode;
}

type ModalType = 'about' | 'contact' | 'guide' | 'privacy' | 'terms' | 'dmca' | null;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setActiveModal(type);
    setIsMobileMenuOpen(false);
  };

  const closeModal = () => setActiveModal(null);

  // Modal Content Component
  const ModalContent = ({ type }: { type: ModalType }) => {
    if (!type) return null;

    const disclaimer = (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Important Disclaimer:</strong> This information is for educational purposes only. Doodax is not a law firm and does not provide legal advice. Use of this tool does not create an attorney-client relationship.
            </p>
          </div>
        </div>
      </div>
    );

    let title = '';
    let content = null;

    switch (type) {
      case 'about':
        title = 'About Doodax';
        content = (
          <>
            <p className="mb-4">Doodax is a cutting-edge, free AI-powered legal tool designed to democratize access to the small claims court system.</p>
            <p className="mb-4">We believe that justice should be accessible to everyone, regardless of their ability to pay for expensive legal counsel. Our platform allows users to generate professional Statements of Claim instantly, privately, and securely within their browser.</p>
            <p>Our mission is to simplify complex legal processes into a user-friendly experience.</p>
          </>
        );
        break;
      case 'contact':
        title = 'Contact Us';
        content = (
          <>
            <p className="mb-4">We value your feedback and are here to help with any technical issues regarding the Doodax platform.</p>
            <p className="mb-2"><strong>Email:</strong> <a href="mailto:hsini.web@gmail.com" className="text-indigo-600 hover:underline">hsini.web@gmail.com</a></p>
            <p className="mb-2"><strong>Website:</strong> <a href="https://doodax.com" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">doodax.com</a></p>
            <p className="mt-4 text-sm text-gray-500">For legal inquiries, please consult a licensed attorney in your jurisdiction.</p>
          </>
        );
        break;
      case 'guide':
        title = 'User Guide';
        content = (
          <>
            <p className="mb-4">Using Doodax is simple:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li><strong>Fill the Form:</strong> Enter the Plaintiff (Your) details and the Defendant's details.</li>
              <li><strong>Describe the Claim:</strong> Be specific about the "Reason for Claim". Include dates and dollar amounts.</li>
              <li><strong>Select Tone:</strong> Choose how formal you want the language to be.</li>
              <li><strong>Generate:</strong> Click the generate button and wait for the AI to draft your document.</li>
              <li><strong>Review & Copy:</strong> Read the generated text carefully. Copy it to a word processor to print and sign.</li>
            </ol>
          </>
        );
        break;
      case 'privacy':
        title = 'Privacy Policy';
        content = (
          <>
            <p className="mb-4">At Doodax, we take your privacy seriously. This Privacy Policy explains how we handle your data.</p>
            <h4 className="font-bold mt-4 mb-2">Data Processing</h4>
            <p className="mb-4">All document generation happens <strong>client-side</strong> within your browser. We do not store, transmit, or save the personal legal details you enter into the forms on our servers.</p>
            <h4 className="font-bold mt-4 mb-2">Cookies</h4>
            <p className="mb-4">We use standard cookies to enhance user experience and analyze site traffic to improve our services.</p>
            <h4 className="font-bold mt-4 mb-2">Third-Party Services</h4>
            <p>We may use third-party analytics tools that comply with GDPR and CCPA regulations.</p>
          </>
        );
        break;
      case 'terms':
        title = 'Terms of Service';
        content = (
          <>
            <p className="mb-4">By accessing Doodax.com, you agree to be bound by these Terms of Service.</p>
            <h4 className="font-bold mt-4 mb-2">Use License</h4>
            <p className="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on Doodax's website for personal, non-commercial transitory viewing only.</p>
            <h4 className="font-bold mt-4 mb-2">Disclaimer</h4>
            <p className="mb-4">The materials on Doodax's website are provided on an 'as is' basis. Doodax makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </>
        );
        break;
      case 'dmca':
        title = 'DMCA Policy';
        content = (
          <>
            <p className="mb-4">Doodax respects the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Service infringes the copyright or other intellectual property infringement of any person.</p>
            <p>If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement that is taking place through the Service, you must submit your notice in writing to <a href="mailto:hsini.web@gmail.com" className="text-indigo-600">hsini.web@gmail.com</a>.</p>
          </>
        );
        break;
    }

    return (
      <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-4 font-heading" id="modal-title">
                    {title}
                  </h3>
                  {disclaimer}
                  <div className="mt-2 text-gray-600 leading-relaxed">
                    {content}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 relative">
      <Starfield />
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => window.location.href='/'}>
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">D</div>
               <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight font-heading">Doodax</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex gap-6">
                 <button onClick={() => openModal('about')} className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">About</button>
                 <button onClick={() => openModal('guide')} className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Guide</button>
                 <button onClick={() => openModal('contact')} className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Contact</button>
              </nav>
              
              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                 <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all shadow-md hover:shadow-lg">
                   <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                   Doodax AI
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 hover:text-gray-900 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 absolute w-full shadow-xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <button onClick={() => openModal('about')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">About</button>
              <button onClick={() => openModal('guide')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Guide</button>
              <button onClick={() => openModal('contact')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Contact</button>
              <div className="border-t border-gray-200 my-2"></div>
              <button onClick={() => openModal('privacy')} className="block w-full text-left px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900">Privacy Policy</button>
              <button onClick={() => openModal('terms')} className="block w-full text-left px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900">Terms of Service</button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow relative z-10">
        {children}
      </main>

      {/* Modal Render */}
      {activeModal && <ModalContent type={activeModal} />}

      <footer className="glass-panel border-t border-white/20 pt-16 pb-8 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">D</div>
                <span className="font-bold text-xl text-gray-900 font-heading">Doodax</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Empowering individuals with accessible, free AI legal tools. Simplify your small claims process today.
              </p>
              <div className="flex space-x-4">
                 <a href="#" aria-label="Twitter" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                 <a href="#" aria-label="GitHub" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg></a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><button onClick={() => openModal('guide')} className="hover:text-indigo-600 transition-colors">How it Works</button></li>
                <li><button onClick={() => openModal('about')} className="hover:text-indigo-600 transition-colors">About Us</button></li>
                <li><button onClick={() => openModal('contact')} className="hover:text-indigo-600 transition-colors">Support</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
               <ul className="space-y-3 text-sm text-gray-600">
                <li><button onClick={() => openModal('privacy')} className="hover:text-indigo-600 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => openModal('terms')} className="hover:text-indigo-600 transition-colors">Terms of Service</button></li>
                <li><button onClick={() => openModal('dmca')} className="hover:text-indigo-600 transition-colors">DMCA</button></li>
              </ul>
            </div>

            <div>
               <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
               <div className="text-sm text-gray-600 space-y-3">
                 <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <a href="mailto:hsini.web@gmail.com" className="hover:text-indigo-600">hsini.web@gmail.com</a>
                 </p>
                 <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                    <a href="https://doodax.com" className="hover:text-indigo-600">doodax.com</a>
                 </p>
               </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Doodax. All Rights Reserved.</p>
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <span>Powered by</span>
              <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors">HSINI MOHAMED</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;