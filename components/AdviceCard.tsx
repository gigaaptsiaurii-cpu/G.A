import React from 'react';
import { AdviceItem, SituationType } from '../types';
import { Quote, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface AdviceCardProps {
    advice: AdviceItem;
    onClose: () => void;
}

const AdviceCard: React.FC<AdviceCardProps> = ({ advice, onClose }) => {
    // Determine color scheme based on type
    const getColor = (type: SituationType) => {
        switch (type) {
            case SituationType.IN_TRADE_LOSS:
                return 'border-rose-500 bg-rose-950/30 text-rose-100';
            case SituationType.IN_TRADE_WIN:
                return 'border-emerald-500 bg-emerald-950/30 text-emerald-100';
            case SituationType.FINAL_TRUTH:
                return 'border-amber-500 bg-amber-950/30 text-amber-100';
            case SituationType.PRE_SESSION:
            case SituationType.PHILOSOPHY:
                return 'border-sky-500 bg-sky-950/30 text-sky-100';
            default:
                return 'border-slate-500 bg-slate-800 text-slate-100';
        }
    };

    const colorClasses = getColor(advice.type);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`relative w-full max-w-lg p-6 rounded-2xl border-l-4 shadow-2xl ${colorClasses} transform transition-all scale-100`}>
                
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">{advice.emoji}</span>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{advice.title}</h2>
                            <p className="text-sm opacity-70 uppercase tracking-wider font-semibold mt-1">
                                მენტალური გასწორება
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <XCircle size={28} />
                    </button>
                </div>

                {/* Main Thought */}
                <div className="mb-6 bg-black/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <span className="text-xl">💡</span> სწორი ფიქრი:
                    </h3>
                    <p className="text-lg leading-relaxed font-medium">
                        {advice.mainThought}
                    </p>
                </div>

                {/* Actions */}
                <div className="mb-6 space-y-3">
                    <h3 className="font-semibold text-sm opacity-80 uppercase flex items-center gap-2">
                        <CheckCircle2 size={16} /> ქმედება:
                    </h3>
                    <ul className="space-y-2">
                        {advice.actions.map((action, idx) => (
                            <li key={idx} className="flex items-start gap-2 bg-white/5 p-2 rounded">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                                <span>{action}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Warning / Wrong Thought */}
                {advice.wrongThought && (
                    <div className="mb-6 p-3 border border-red-500/30 bg-red-500/10 rounded-lg text-red-200">
                        <div className="flex items-center gap-2 font-bold text-xs uppercase mb-1 text-red-400">
                            <AlertTriangle size={14} /> ემოციური საფრთხე (არასწორი ფიქრი)
                        </div>
                        <p className="italic">"{advice.wrongThought}"</p>
                    </div>
                )}

                {/* Quote */}
                {advice.quote && (
                    <div className="relative mt-8 pt-6 border-t border-white/10 text-center">
                        <Quote className="absolute top-2 left-1/2 -translate-x-1/2 opacity-20" size={32} />
                        <p className="text-lg font-serif italic opacity-90 relative z-10">
                            "{advice.quote}"
                        </p>
                    </div>
                )}

                <button 
                    onClick={onClose}
                    className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all active:scale-95"
                >
                    გასაგებია, ვასრულებ
                </button>
            </div>
        </div>
    );
};

export default AdviceCard;