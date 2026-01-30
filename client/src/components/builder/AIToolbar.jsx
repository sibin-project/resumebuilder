import React, { useState } from "react";
import { Loader2, Wand2, CheckCircle, AlertCircle, Type, RotateCcw } from "lucide-react";
import { enhanceExperience, atsOptimize, checkGrammar, formatText } from "../../api/ai";

const AIToolbar = ({ text, onUpdate, loadingField, setAiLoading }) => {
    const [loading, setLoading] = useState(null);

    const handleAction = async (action) => {
        if (!text) return;
        setLoading(action);
        if (setAiLoading) setAiLoading(true);

        try {
            let result = "";
            switch (action) {
                case "enhance":
                    result = await enhanceExperience(text);
                    break;
                case "ats":
                    result = await atsOptimize(text);
                    break;
                case "grammar":
                    result = await checkGrammar(text);
                    break;
                case "format":
                    result = await formatText(text);
                    break;
            }
            if (result) {
                onUpdate(result);
            }
        } catch (err) {
            console.error("AI Action Failed", err);
        } finally {
            setLoading(null);
            if (setAiLoading) setAiLoading(false);
        }
    };

    return (
        <div className="flex flex-wrap gap-2 mt-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center mr-1">
                AI Tools:
            </div>
            <button
                type="button"
                onClick={() => handleAction("enhance")}
                disabled={!!loading}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-purple-600/10 text-purple-400 border border-purple-600/20 hover:bg-purple-600/20 transition-colors disabled:opacity-50"
            >
                {loading === "enhance" ? <Loader2 size={11} className="animate-spin" /> : <Wand2 size={11} />}
                Enhance
            </button>
            <button
                type="button"
                onClick={() => handleAction("ats")}
                disabled={!!loading}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
                <CheckCircle size={11} />
                ATS
            </button>
            <button
                type="button"
                onClick={() => handleAction("grammar")}
                disabled={!!loading}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
                <AlertCircle size={11} />
                Manners
            </button>
        </div>
    );
};

export default AIToolbar;
