import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-6 h-72">
      {/* Loader Container with Glow Effect */}
      <div className="relative">
        {/* Ambient Glow Background */}
        <div className="absolute inset-0 blur-2xl opacity-40 bg-purple-600 rounded-full scale-150 animate-pulse"></div>
        
        {/* Main Loader */}
        <div className="loader relative z-10"></div>
      </div>

      {/* Text with Animation */}
      {text && (
        <div className="text-center space-y-1">
          <p className="text-xl tracking-wider text-[#A78BFA] font-pacifico italic animate-fade-in">
            {text}
          </p>
          {/* Loading Dots Animation */}
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce-dot" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce-dot" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce-dot" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      )}

      <style>{`
        .loader {
          width: 60px;
          aspect-ratio: 1.154;
          position: relative;
          background: conic-gradient(
            from 120deg at 50% 64%, 
            #00000000, 
            #7C3AED 0.5deg 119.5deg, 
            #00000000 120deg
          );
          filter: 
            drop-shadow(0 0 1px rgba(0, 0, 0, 0.9))
            drop-shadow(0 0 1.5px rgba(0, 0, 0, 0.8))
            drop-shadow(0 0 2px #C4B5FD)
            drop-shadow(0 0 8px #8B5CF6)
            drop-shadow(0 0 15px rgba(124, 58, 237, 0.6))
            drop-shadow(0 0 25px rgba(76, 29, 149, 0.3));
          animation: l27-0 2s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }

        .loader:before,
        .loader:after {
          content: '';
          position: absolute;
          inset: 0;
          background: inherit;
          transform-origin: 50% 66%;
          animation: l27-1 2s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }

        .loader:after {
          --s: -1;
        }

        @keyframes l27-0 {
          0%, 25% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(120deg);
          }
          75.01%, 100% {
            transform: rotate(360deg);
          }
        }

        @keyframes l27-1 {
          0% {
            transform: rotate(calc(var(--s, 1) * 120deg)) translate(0);
          }
          25%, 75% {
            transform: rotate(calc(var(--s, 1) * 120deg)) 
                       translate(calc(var(--s, 1) * -6px), 11px);
          }
          100% {
            transform: rotate(calc(var(--s, 1) * 120deg)) translate(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-dot {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          40% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-bounce-dot {
          animation: bounce-dot 1.4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Loader;