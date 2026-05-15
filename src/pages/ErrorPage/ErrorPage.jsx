import React from "react";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-3xl p-10">
        
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/15 mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </div>

        <h1 className="text-7xl font-extrabold text-center text-red-400">
          404
        </h1>

        <h2 className="text-3xl font-bold text-center mt-4">
          Something went wrong
        </h2>

        <p className="text-gray-400 text-center mt-3">
          The page you’re looking for doesn’t exist.
        </p>

        <div className="flex gap-4 mt-8">
          
          {/* Go Home Button */}
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 rounded-xl"
          >
            <ArrowLeft size={18} />
            Go Home
          </button>

          {/* Reload Button */}
          <button
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 border border-white/15 bg-white/5 py-3 rounded-xl"
          >
            <RefreshCw size={18} />
            Retry
          </button>

        </div>
      </div>
    </div>
  );
}
