import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";


export default function DetailSection({ 
  icon, 
  title, 
  iconColor = "text-purple-400",
  children,
  defaultOpen = true,
  collapsible = false
}) {
  if (collapsible) {
    return (
      <details open={defaultOpen} className="group bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl hover:border-purple-500/30 transition-all duration-300 animate-fade-in">
        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className={iconColor}>{icon}</span>
            {title}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-4 pb-4">
          {children}
        </div>
      </details>
    );
  }

  return (
    <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
        <span className={iconColor}>{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}
