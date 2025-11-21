
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import SmallClaimsGenerator from './components/SmallClaimsGenerator';
import LandingSections from './components/LandingSections';
import SeoArticle from './utils/SeoArticle';
import SEOHead from './components/SEOHead';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Layout>
        <SEOHead />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10">
          {/* Semantic Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-8 hidden md:block">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <a href="/" className="hover:text-white cursor-pointer transition-colors">Home</a>
                <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li className="flex items-center">
                <span>Legal Tools</span>
                <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li>
                <span className="text-white font-medium" aria-current="page">Small Claims Generator</span>
              </li>
            </ol>
          </nav>

          <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading tracking-tight drop-shadow-lg">
                  AI Small Claims Statement Generator
              </h1>
              <p className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
                  Quickly generate a professional Statement of Claim for Small Claims Court. <span className="text-white font-semibold">Free to use</span>, no signup required.
              </p>
          </div>

          <SmallClaimsGenerator />
        </div>

        <LandingSections />
        
        <div className="py-16 border-t border-white/10 bg-white/5 backdrop-blur-sm">
           <SeoArticle />
        </div>
      </Layout>
    </HelmetProvider>
  );
};

export default App;
