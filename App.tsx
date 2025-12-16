import React, { useState } from 'react';
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AdviceItem, SituationType } from './types';
import { DAILY_CHECKLIST, TRADING_PSYCHOLOGY_CONTEXT } from './constants';
import AdviceCard from './components/AdviceCard';
import Checklist from './components/Checklist';
import { BrainCircuit, Loader2, SendHorizontal, Sparkles } from 'lucide-react';

const App: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAdvice, setSelectedAdvice] = useState<AdviceItem | null>(null);

    const handleAnalyze = async () => {
        if (!userInput.trim()) return;
        
        setIsLoading(true);
        setSelectedAdvice(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const schema: Schema = {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING, enum: Object.values(SituationType) },
                    emoji: { type: Type.STRING },
                    title: { type: Type.STRING },
                    mainThought: { type: Type.STRING },
                    actions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    wrongThought: { type: Type.STRING },
                    quote: { type: Type.STRING }
                },
                required: ["type", "emoji", "title", "mainThought", "actions", "wrongThought", "quote"]
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: TRADING_PSYCHOLOGY_CONTEXT,
                    responseMimeType: "application/json",
                    responseSchema: schema,
                    temperature: 0.7, // Slightly creative but grounded in rules
                },
                contents: [
                    { role: 'user', parts: [{ text: `User input: "${userInput}". Analyze this emotional state and provide trading advice based on the rules.` }] }
                ]
            });

            const text = response.text;
            if (text) {
                const data = JSON.parse(text);
                setSelectedAdvice({
                    id: Date.now().toString(),
                    triggerText: userInput,
                    ...data
                });
            }
        } catch (error) {
            console.error("Error analyzing input:", error);
            // Fallback error advice
            setSelectedAdvice({
                id: 'error',
                type: SituationType.PHILOSOPHY,
                triggerText: userInput,
                emoji: '⚠️',
                title: 'სისტემური შეცდომა',
                mainThought: 'ვერ მოხერხდა ანალიზი. შეამოწმეთ ინტერნეტი ან სცადეთ თავიდან.',
                actions: ['ღრმად ჩაისუნთქე', 'სცადე მოგვიანებით'],
                wrongThought: 'აპლიკაცია არ მუშაობს, დღე ჩაიშალა',
                quote: 'სიმშვიდე არის ნორმა'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAnalyze();
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 p-4 md:p-8 selection:bg-sky-500/30 font-sans">
            <div className="max-w-5xl mx-auto">
                
                {/* Header */}
                <header className="mb-10 text-center animate-in fade-in duration-700">
                    <div className="inline-flex items-center justify-center p-3 bg-sky-500/10 rounded-2xl mb-4 border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
                        <BrainCircuit className="text-sky-400 mr-2" size={32} />
                        <h1 className="text-2xl md:text-3xl font-black text-sky-100 tracking-tight">
                            SCALPER'S MINDSET GUARDIAN
                        </h1>
                    </div>
                    <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                        შენი პირადი მენტალური ალგორითმი.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Main Input Area */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        <div className="bg-slate-800/50 border border-slate-700 p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-sm relative overflow-hidden group">
                            
                            {/* Decorative background glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <label className="block text-sky-200 font-bold mb-4 text-lg flex items-center gap-2">
                                <Sparkles size={20} className="text-sky-400" />
                                რა ხდება ახლა შენს გონებაში?
                            </label>
                            
                            <div className="relative">
                                <textarea 
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="მაგ: 'წაგების მერე მინდა ამოღება', 'მეშინია შესვლის', 'ძალიან თავდაჯერებული ვარ'..."
                                    className="w-full h-40 bg-slate-900/80 border border-slate-600 rounded-xl p-5 text-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none shadow-inner"
                                />
                                <div className="absolute bottom-3 right-3 text-xs text-slate-500 font-mono">
                                    {userInput.length > 0 ? "Press Enter to analyze" : ""}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button 
                                    onClick={handleAnalyze}
                                    disabled={isLoading || !userInput.trim()}
                                    className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-sky-500/20 active:scale-95"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            ანალიზი...
                                        </>
                                    ) : (
                                        <>
                                            <SendHorizontal size={20} />
                                            მიიღე პასუხი
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Recent Context / Helper Text */}
                        <div className="text-center text-slate-500 text-sm">
                            <p>სისტემა იყენებს პროფესიონალური სკალპინგის 84 მენტალურ წესს.</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <Checklist />
                        
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
                            <h3 className="font-bold text-sky-200 mb-3 relative z-10">ოქროს წესი #56</h3>
                            <p className="text-slate-300 text-sm italic leading-relaxed relative z-10 border-l-2 border-sky-500/30 pl-3">
                                "თუ გინდა იყო წარმატებული ტრეიდერი, უნდა იყო ემოციურად მოსაწყენი ადამიანი ბაზარზე. არ დრამა, არ ბრძოლა, არ ეიფორია."
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Modal for Advice */}
            {selectedAdvice && (
                <AdviceCard 
                    advice={selectedAdvice} 
                    onClose={() => setSelectedAdvice(null)} 
                />
            )}
        </div>
    );
};

export default App;