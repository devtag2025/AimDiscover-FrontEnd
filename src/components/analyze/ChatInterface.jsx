import { useState } from "react";
import * as LucideIcons from "lucide-react";

export default function ChatInterface({
  onRefine,
  isRefining,
  conversationHistory,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    onRefine(inputValue.trim());
    setInputValue(""); 
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom duration-500">
      <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-indigo-500/30 via-blue-500/20 to-transparent shadow-2xl">
        <div className="relative bg-[#050509] rounded-xl p-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.1),rgba(255,255,255,0))] rounded-xl" />
          
          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
                  <LucideIcons.MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Refine Your Analysis</h3>
                  <p className="text-xs text-gray-400">
                    Tell us what you&apos;d like to change or focus on
                  </p>
                </div>
              </div>
            </div>

            {/* Conversation History (if exists) */}
            {conversationHistory.length > 1 && (
              <div className="mb-4 space-y-2 max-h-48 overflow-y-auto">
                {conversationHistory.slice(1).map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-xs ${
                      item.type === "user"
                        ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-200"
                        : "bg-white/5 border border-white/10 text-gray-400"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {item.type === "user" ? (
                        <LucideIcons.User className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      ) : (
                        <LucideIcons.Sparkles className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="flex-1">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="space-y-3">
              <textarea
                value={inputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 500) {
                    setInputValue(value);
                  }
                }}
                onKeyPress={handleKeyPress}
                placeholder="Examples:
- Focus more on eco-friendly and sustainable options
- I want products targeting millennial women  
- Show me products under $50 retail price
- Avoid anything seasonal or holiday-related"
                disabled={isRefining}
                className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />

              {/* Character Count */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  {inputValue.length}/500 characters
                </span>
                {inputValue.length > 0 && (
                  <button
                    onClick={() => setInputValue("")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isRefining || !inputValue.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-lg font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/30"
              >
                <div className="flex items-center justify-center gap-2">
                  {isRefining ? (
                    <>
                      <LucideIcons.Loader className="h-4 w-4 animate-spin" />
                      <span>Refining...</span>
                    </>
                  ) : (
                    <>
                      <LucideIcons.Send className="h-4 w-4" />
                      <span>Refine Analysis</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Tips */}
            <div className="mt-4 p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
              <div className="flex items-start gap-2 text-xs text-indigo-300">
                <LucideIcons.Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Pro Tips:</p>
                  <ul className="space-y-1 text-gray-400 list-disc list-inside">
                    <li>Be specific about what you want changed</li>
                    <li>You can refine multiple times</li>
                    <li>Each refinement builds on the previous one</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}