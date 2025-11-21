
import React, { useState, useEffect } from 'react';
import { generateStatementOfClaim, US_STATES } from '../lib/SmallClaimsTemplate';

// Jurisdiction limits approximation for "Smart Tips"
const LIMITS: Record<string, number> = {
    "California": 10000,
    "Texas": 20000,
    "New York": 5000,
    "Florida": 8000,
    "default": 5000
};

const STEPS = [
    { id: 1, title: "Plaintiff", icon: "👤" },
    { id: 2, title: "Defendant", icon: "🏢" },
    { id: 3, title: "Details", icon: "⚖️" },
    { id: 4, title: "Review", icon: "✅" }
];

const SmallClaimsGenerator: React.FC = () => {
    // 1. State Management
    const [currentStep, setCurrentStep] = useState(1);
    const [generatedText, setGeneratedText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showTooltip, setShowTooltip] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({
        jurisdiction: 'California',
        plaintiffName: '',
        plaintiffAddress: '',
        defendantName: '',
        defendantAddress: '',
        claimAmount: '',
        reasonForClaim: '',
        dateOfIncident: '',
    });

    // 2. Local Storage Persistence
    useEffect(() => {
        const savedData = localStorage.getItem('doodax_form_data');
        if (savedData) {
            try {
                setFormData(JSON.parse(savedData));
            } catch (e) {
                console.error("Failed to load saved data");
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('doodax_form_data', JSON.stringify(formData));
        setGeneratedText(generateStatementOfClaim(formData));
    }, [formData]);

    // 3. Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (currentStep < STEPS.length) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedText);
        // Simple visual feedback could be added here
        const btn = document.getElementById('copy-btn');
        if(btn) {
            const originalText = btn.innerText;
            btn.innerText = "Copied!";
            setTimeout(() => btn.innerText = originalText, 2000);
        }
    };

    const getLimitTip = () => {
        const limit = LIMITS[formData.jurisdiction] || LIMITS['default'];
        return `Tip: The monetary limit for Small Claims in ${formData.jurisdiction} is typically around $${limit.toLocaleString()}.`;
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 relative">
            
            {/* Left Side: Wizard Form */}
            <div className="w-full lg:w-5/12 xl:w-5/12 print:hidden">
                
                {/* Progress Bar */}
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-200 mb-6 sticky top-24 z-20">
                    <div className="flex justify-between mb-2">
                        {STEPS.map((step) => (
                            <div 
                                key={step.id}
                                className={`flex flex-col items-center cursor-pointer ${currentStep >= step.id ? 'text-indigo-600' : 'text-gray-400'}`}
                                onClick={() => setCurrentStep(step.id)}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-all ${
                                    currentStep === step.id ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 
                                    currentStep > step.id ? 'bg-green-500 text-white' : 'bg-gray-100'
                                }`}>
                                    {currentStep > step.id ? '✓' : step.id}
                                </div>
                                <span className="text-xs font-medium">{step.title}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-500 ease-out"
                            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Wizard Card */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 relative overflow-hidden">
                    {/* Decorative background blob */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full opacity-50 pointer-events-none"></div>

                    <form onSubmit={(e) => e.preventDefault()} className="relative z-10 min-h-[400px] flex flex-col justify-between">
                        
                        {/* Step 1: Plaintiff */}
                        {currentStep === 1 && (
                            <div className="space-y-5 animate-fadeIn">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 font-heading">Your Information</h3>
                                    <p className="text-gray-500 text-sm">Please enter your legal name and current address as it should appear on court documents.</p>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Plaintiff Full Name</label>
                                    <input 
                                        type="text" 
                                        name="plaintiffName" 
                                        placeholder="e.g. Jane A. Doe" 
                                        value={formData.plaintiffName} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" 
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                                        Current Address
                                        <span 
                                            className="text-gray-400 cursor-help text-xs border border-gray-300 rounded-full w-4 h-4 flex items-center justify-center"
                                            onMouseEnter={() => setShowTooltip('p_addr')}
                                            onMouseLeave={() => setShowTooltip(null)}
                                        >?</span>
                                    </label>
                                    {showTooltip === 'p_addr' && (
                                        <div className="absolute bg-gray-900 text-white text-xs p-2 rounded shadow-lg max-w-xs z-50 -mt-12">
                                            Use the address where you can receive official court mail.
                                        </div>
                                    )}
                                    <textarea name="plaintiffAddress" placeholder="Street, City, State, Zip" value={formData.plaintiffAddress} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"></textarea>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Defendant */}
                        {currentStep === 2 && (
                            <div className="space-y-5 animate-fadeIn">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 font-heading">Opposing Party</h3>
                                    <p className="text-gray-500 text-sm">Identify the person or business you are suing. Accuracy is critical for serving papers.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Defendant Name</label>
                                    <input type="text" name="defendantName" placeholder="e.g. John Smith OR XYZ Corp LLC" value={formData.defendantName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" autoFocus />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Defendant Address / Place of Service</label>
                                    <textarea name="defendantAddress" placeholder="Where can the sheriff find them?" value={formData.defendantAddress} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"></textarea>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Details */}
                        {currentStep === 3 && (
                            <div className="space-y-5 animate-fadeIn">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 font-heading">Claim Details</h3>
                                    <p className="text-gray-500 text-sm">Be specific. Courts prefer dates, precise amounts, and clear facts.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
                                        <select name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm">
                                            {US_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Amount ($)</label>
                                        <input type="number" name="claimAmount" placeholder="0.00" value={formData.claimAmount} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
                                    </div>
                                </div>
                                
                                {/* Dynamic Tip */}
                                <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-lg flex gap-2 items-start">
                                    <span className="text-lg">💡</span>
                                    <p>{getLimitTip()}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Incident</label>
                                    <input type="date" name="dateOfIncident" value={formData.dateOfIncident} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Reason for Claim <span className="text-red-500">*</span></label>
                                    <textarea name="reasonForClaim" placeholder="I lent the defendant money on [Date]..." value={formData.reasonForClaim} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"></textarea>
                                </div>
                            </div>
                        )}

                         {/* Step 4: Finalize */}
                         {currentStep === 4 && (
                            <div className="space-y-6 animate-fadeIn text-center py-8">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-4">
                                    ✨
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 font-heading">Ready to Generate!</h3>
                                <p className="text-gray-600">Your document is ready to be finalized. Review the preview on the right, then click Print or Copy.</p>
                                
                                <div className="bg-indigo-50 p-4 rounded-xl text-left">
                                    <h4 className="font-bold text-indigo-900 mb-2 text-sm uppercase tracking-wide">What happens next?</h4>
                                    <ol className="list-decimal list-inside text-sm text-indigo-800 space-y-1">
                                        <li>Print 3 copies (Court, Defendant, You).</li>
                                        <li>Go to the courthouse in <strong>{formData.jurisdiction}</strong>.</li>
                                        <li>Pay the filing fee (usually $30-$100).</li>
                                    </ol>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                            {currentStep > 1 && (
                                <button 
                                    type="button" 
                                    onClick={handleBack}
                                    className="px-6 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    Back
                                </button>
                            )}
                            
                            {currentStep < 4 ? (
                                <button 
                                    type="button" 
                                    onClick={handleNext}
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white btn-gradient shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                                >
                                    Next Step &rarr;
                                </button>
                            ) : (
                                <button 
                                    type="button"
                                    onClick={handlePrint}
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-green-500/30 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                    Print Official PDF
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            </div>

            {/* Right Side: Live Preview */}
            <div className="w-full lg:w-7/12 xl:w-7/12 relative print:w-full" id="preview-section">
                <div className="lg:sticky lg:top-24 print:static">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col h-[800px] print:h-auto print:shadow-none print:border-none print:rounded-none">
                        
                        {/* Preview Header (Hidden on Print) */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 print:hidden">
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 rounded-full shadow-sm">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live Draft</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button id="copy-btn" onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-gray-200" title="Copy Text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                    Copy Text
                                </button>
                                <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors shadow-sm" title="Download PDF">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                     Download PDF
                                </button>
                            </div>
                        </div>

                        {/* Document Content */}
                        <div id="document-content" className="flex-grow p-8 md:p-12 overflow-y-auto bg-white font-serif text-gray-900 leading-relaxed print:p-0 print:overflow-visible">
                            {generatedText ? (
                                <div className="max-w-[8.5in] mx-auto print:max-w-none">
                                    <pre className="whitespace-pre-wrap font-serif text-base md:text-lg text-gray-900 print:text-black">{generatedText}</pre>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 print:hidden">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    </div>
                                    <p className="text-center max-w-xs text-sm">Your document will appear here automatically as you type.</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Footer (Hidden on Print) */}
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center print:hidden">
                            <span>Doodax Professional Document Engine</span>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmallClaimsGenerator;
