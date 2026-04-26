import { CheckCircle2, Copy, Check, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function PostSuccess({ deleteCode, onBack }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(deleteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 z-10 flex flex-col items-center text-center">
        {/* Success icon */}
        <div className="bg-green-50 rounded-full p-5 mb-4">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Vacancy Posted!
        </h2>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          Your vacancy is now live. Save your delete code below — you'll need it
          to remove the listing later.
        </p>

        {/* Delete code box */}
        <div className="w-full bg-gray-50 border border-dashed border-gray-300 rounded-2xl px-4 py-4 mb-2">
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
            Your Delete Code
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-mono font-bold tracking-[0.3em] text-indigo-600">
              {deleteCode}
            </span>
            <button
              onClick={handleCopy}
              className="text-gray-400 hover:text-indigo-500 transition"
              title="Copy code"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Warning */}
        <p className="text-xs text-red-400 mb-6 leading-relaxed">
          ⚠️ This code will not be shown again. Screenshot or copy it now.
        </p>

        {/* Back button */}
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white font-semibold py-3 rounded-xl text-sm shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </button>
      </div>
    </div>
  );
}
