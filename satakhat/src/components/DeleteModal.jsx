import { useState } from "react";
import { Trash2, X, AlertTriangle } from "lucide-react";

export default function DeleteModal({ vacancy, onConfirm, onClose }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!code.trim()) {
      setError("Please enter your delete code.");
      return;
    }

    if (code.trim() !== vacancy.delete_code) {
      setError("Incorrect delete code. Please try again.");
      return;
    }

    setLoading(true);
    await onConfirm(vacancy.id, code.trim());
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning icon */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="bg-red-50 rounded-full p-4 mb-3">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Delete Vacancy</h2>
          <p className="text-sm text-gray-400 mt-1 leading-relaxed">
            Enter the 6-digit delete code you received when you posted this
            vacancy.
          </p>
        </div>

        {/* Vacancy mini summary */}
        <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Property:</span> {vacancy.property}
          </p>
          <p>
            <span className="font-semibold">Flat Type:</span>{" "}
            {vacancy.flat_type}
          </p>
          <p>
            <span className="font-semibold">Posted by:</span>{" "}
            {vacancy.poster_name}
          </p>
        </div>

        {/* Code input */}
        <input
          type="text"
          placeholder="Enter delete code"
          value={code}
          maxLength={6}
          onChange={(e) => {
            setCode(e.target.value);
            setError("");
          }}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-red-400 mb-2"
        />

        {/* Error */}
        {error && (
          <p className="text-xs text-red-500 text-center mb-3">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 active:scale-95 transition-all text-white text-sm font-semibold py-2.5 rounded-xl"
          >
            <Trash2 className="w-4 h-4" />
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
