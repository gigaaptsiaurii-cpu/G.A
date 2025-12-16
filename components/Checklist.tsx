import React, { useState } from 'react';
import { DAILY_CHECKLIST } from '../constants';
import { CheckSquare, Square } from 'lucide-react';

const Checklist: React.FC = () => {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(i => i !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };

    const allChecked = checkedItems.length === DAILY_CHECKLIST.length;

    return (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-sky-400">
                <CheckSquare size={20} />
                სესიის წინ
            </h3>
            <div className="space-y-3">
                {DAILY_CHECKLIST.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => toggleItem(idx)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                            checkedItems.includes(idx) 
                            ? 'bg-emerald-900/20 text-emerald-400 line-through decoration-emerald-500/50' 
                            : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                        }`}
                    >
                        {checkedItems.includes(idx) ? (
                            <CheckSquare className="flex-shrink-0 text-emerald-500" size={20} />
                        ) : (
                            <Square className="flex-shrink-0 opacity-50" size={20} />
                        )}
                        <span>{item}</span>
                    </button>
                ))}
            </div>
            
            <div className={`mt-4 text-center p-2 rounded-lg font-bold transition-all duration-500 ${
                allChecked ? 'bg-emerald-500/20 text-emerald-400 opacity-100' : 'opacity-0 h-0 overflow-hidden py-0'
            }`}>
                სისტემა მზადაა. შეგიძლია დაიწყო.
            </div>
        </div>
    );
};

export default Checklist;