"use client";

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Check, 
  Copy, 
  ChevronDown,
  ExternalLink,
  Code,
  Hash,
  Sparkles,
  FileText,
  Lightbulb,
  AlertCircle,
  Info,
  Bookmark,
  Star,
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  BookOpen,
  Maximize2,
  Minimize2
} from 'lucide-react';

// ==================== STORAGE HELPERS ====================
const STORAGE_KEY = 'markdown-renderer-state';

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
};

const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};

// ==================== COPY BUTTON ====================
const CopyButton = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`
        group relative p-2 rounded-lg transition-all duration-200
        ${copied 
          ? 'bg-emerald-500/20 text-emerald-400 scale-95' 
          : 'bg-slate-700/50 hover:bg-slate-600/70 text-slate-400 hover:text-white hover:scale-105'
        }
        ${className}
      `}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      <div className="relative w-4 h-4">
        <Copy className={`absolute inset-0 transition-all duration-300 ${copied ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100 rotate-0'}`} />
        <Check className={`absolute inset-0 transition-all duration-300 ${copied ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-180'}`} />
      </div>
      {copied && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          Copied to clipboard!
        </span>
      )}
    </button>
  );
};

// ==================== COLLAPSIBLE SECTION ====================
const CollapsibleSection = ({ 
  title, 
  children, 
  isOpen: externalIsOpen,
  onToggle,
  icon: Icon = FileText,
  level = 2,
  id 
}) => {
  return (
    <div 
      id={id}
      className="mb-5 rounded-xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:border-slate-600/70 hover:shadow-xl hover:shadow-purple-500/10"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-200 hover:bg-slate-700/20 group"
      >
        <div className={`
          transition-all duration-300 ease-out
          ${externalIsOpen ? 'rotate-0' : '-rotate-90'}
        `}>
          <ChevronDown className={`w-4 h-4 transition-colors duration-200 ${externalIsOpen ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
        </div>
        
        <Icon className={`w-5 h-5 transition-all duration-200 ${externalIsOpen ? 'text-purple-400 scale-110' : 'text-slate-500 group-hover:text-purple-400 group-hover:scale-105'}`} />
        
        <span className="flex-1 text-base font-semibold text-slate-100 transition-colors group-hover:text-white">
          {title}
        </span>
        
        <span className={`
          text-xs px-2.5 py-1 rounded-full transition-all duration-200 font-medium
          ${externalIsOpen 
            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
            : 'bg-slate-700/50 text-slate-400 border border-slate-600/50 group-hover:bg-slate-600/50 group-hover:text-slate-300'
          }
        `}>
          {externalIsOpen ? 'Hide' : 'Show'}
        </span>
      </button>
      
      <div
        className={`
          transition-all duration-500 ease-in-out overflow-hidden
          ${externalIsOpen ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-5 py-5 border-t border-slate-700/30">
          {children}
        </div>
      </div>
    </div>
  );
};

// ==================== INTERACTIVE LIST ITEM ====================
const InteractiveListItem = ({ children, ordered, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li 
      className="group py-2 transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <span className={`
          flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold
          transition-all duration-300 ease-out
          ${ordered 
            ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30' 
            : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
          }
          ${isHovered ? 'scale-110 shadow-lg shadow-purple-500/20 rotate-3' : 'scale-100'}
        `}>
          {ordered ? index : '•'}
        </span>
        <span className={`flex-1 leading-relaxed pt-0.5 transition-colors duration-200 ${isHovered ? 'text-slate-100' : 'text-slate-300'}`}>
          {children}
        </span>
      </div>
    </li>
  );
};

// ==================== ENHANCED PARAGRAPH ====================
const EnhancedParagraph = ({ children, animated }) => {
  return (
    <p className={`text-slate-300 leading-relaxed mb-4 transition-colors duration-200 hover:text-slate-100 ${animated ? 'animate-in fade-in slide-in-from-bottom-1 duration-500' : ''}`}>
      {children}
    </p>
  );
};

// ==================== CODE BLOCK ====================
const CodeBlock = ({ children, className }) => {
  const language = className?.replace('language-', '') || 'text';
  const code = String(children).replace(/\n$/, '');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const lineCount = code.split('\n').length;
  const shouldCollapse = lineCount > 15;
  const maxHeight = isExpanded ? 'none' : shouldCollapse ? '400px' : 'none';

  return (
    <div 
      className="group relative mb-6 rounded-xl overflow-hidden border border-slate-700/50 transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-800/90 to-slate-800/70 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70 transition-all duration-200 group-hover:bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70 transition-all duration-200 group-hover:bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70 transition-all duration-200 group-hover:bg-emerald-500" />
          </div>
          <Code className="w-4 h-4 text-purple-400 transition-transform duration-200 group-hover:scale-110" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{language}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 px-2 py-1 rounded bg-slate-700/30">{lineCount} lines</span>
          {shouldCollapse && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-slate-700/50 hover:bg-slate-600/70 text-slate-300 hover:text-white transition-all duration-200 hover:scale-105"
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="w-3 h-3" />
                  Collapse
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3" />
                  Expand
                </>
              )}
            </button>
          )}
          <CopyButton text={code} className={`transition-all duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
      
      {/* Code Content */}
      <div 
        className="relative overflow-hidden transition-all duration-500"
        style={{ maxHeight }}
      >
        <pre className="bg-slate-900/60 p-5 overflow-x-auto backdrop-blur-sm">
          <code className="text-sm font-mono text-slate-200 leading-relaxed">
            {code.split('\n').map((line, i) => (
              <div key={i} className="flex hover:bg-slate-700/30 -mx-5 px-5 transition-all duration-150 group/line">
                <span className="select-none text-slate-600 w-12 flex-shrink-0 text-right pr-4 text-xs pt-0.5 transition-colors group-hover/line:text-slate-500">
                  {i + 1}
                </span>
                <span className="flex-1">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
        
        {/* Fade overlay for collapsed state */}
        {!isExpanded && shouldCollapse && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
};

// ==================== ANIMATED HEADING ====================
const AnimatedHeading = ({ level, children, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const sizes = {
    1: "text-3xl mt-8 mb-5",
    2: "text-2xl mt-6 mb-4",
    3: "text-xl mt-5 mb-3",
    4: "text-lg mt-4 mb-2",
  };

  const Tag = `h${level}`;

  const handleCopyLink = () => {
    if (id) {
      navigator.clipboard.writeText(`${window.location.href.split('#')[0]}#${id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Tag
      id={id}
      className={`
        font-bold text-slate-100 transition-all duration-200 flex items-center gap-3 group
        ${sizes[level]}
        ${isHovered ? 'text-purple-200' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="flex-1">{children}</span>
      <button 
        onClick={handleCopyLink}
        className={`
          p-1.5 rounded-lg transition-all duration-200
          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          ${copied ? 'bg-emerald-500/20' : 'hover:bg-slate-700/50'}
        `}
        title={copied ? "Link copied!" : "Copy link to section"}
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Hash className="w-4 h-4 text-purple-400" />
        )}
      </button>
    </Tag>
  );
};

// ==================== ICON MAPPING ====================
const getSectionIcon = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes('overview') || lower.includes('summary')) return BookOpen;
  if (lower.includes('insight') || lower.includes('analysis')) return Lightbulb;
  if (lower.includes('warning') || lower.includes('risk') || lower.includes('alert')) return AlertCircle;
  if (lower.includes('info') || lower.includes('note')) return Info;
  if (lower.includes('trend') || lower.includes('growth')) return TrendingUp;
  if (lower.includes('key') || lower.includes('important')) return Star;
  if (lower.includes('action') || lower.includes('step')) return Target;
  if (lower.includes('comment') || lower.includes('feedback')) return MessageSquare;
  if (lower.includes('bookmark') || lower.includes('save')) return Bookmark;
  return FileText;
};

// ==================== MAIN COMPONENT ====================
const MarkdownRenderer = ({ 
  content, 
  title = "Insights",
  className = "",
  showTableOfContents = false,
  animated = true,
  collapsibleSections = true,
  defaultCollapsed = false
}) => {
  const [sectionStates, setSectionStates] = useState({});
  const [allExpanded, setAllExpanded] = useState(!defaultCollapsed);
  const [activeSection, setActiveSection] = useState(null);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadState();
    if (saved?.sectionStates) {
      setSectionStates(saved.sectionStates);
      setAllExpanded(saved.allExpanded ?? !defaultCollapsed);
    }
  }, [defaultCollapsed]);

  // Save state when it changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveState({ sectionStates, allExpanded });
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [sectionStates, allExpanded]);

  // Track paragraph and list indices
  let paragraphIndex = 0;
  let listIndex = 0;

  // Extract headings for TOC
  const headings = useMemo(() => {
    if (!showTableOfContents || !content) return [];
    const regex = /^(#{1,3})\s+(.+)$/gm;
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push({
        level: match[1].length,
        text: match[2],
        id: match[2].toLowerCase().replace(/[^\w]+/g, '-')
      });
    }
    return matches;
  }, [content, showTableOfContents]);

  const toggleSection = useCallback((sectionId) => {
    setSectionStates(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  }, []);

  const toggleAllSections = useCallback(() => {
    const newState = !allExpanded;
    setAllExpanded(newState);
    
    // Update all section states
    const sections = content.match(/^## (.+)$/gm) || [];
    const newSectionStates = {};
    sections.forEach(section => {
      const title = section.replace('## ', '');
      const id = title.toLowerCase().replace(/[^\w]+/g, '-');
      newSectionStates[id] = newState;
    });
    setSectionStates(newSectionStates);
  }, [allExpanded, content]);

  // Parse content into sections
  const renderContent = () => {
    if (!collapsibleSections) {
      return (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      );
    }

    const sections = content.split(/(?=^## )/gm);
    
    return sections.map((section, idx) => {
      const headingMatch = section.match(/^## (.+)$/m);
      
      if (headingMatch) {
        const title = headingMatch[1];
        const sectionContent = section.replace(/^## .+$/m, '').trim();
        const sectionId = title.toLowerCase().replace(/[^\w]+/g, '-');
        const Icon = getSectionIcon(title);
        const isOpen = sectionStates[sectionId] ?? allExpanded;

        return (
          <CollapsibleSection 
            key={idx} 
            title={title} 
            icon={Icon}
            id={sectionId}
            isOpen={isOpen}
            onToggle={() => toggleSection(sectionId)}
            level={2}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {sectionContent}
            </ReactMarkdown>
          </CollapsibleSection>
        );
      }

      if (section.trim()) {
        return (
          <div key={idx} className="mb-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {section}
            </ReactMarkdown>
          </div>
        );
      }
      return null;
    });
  };

  const markdownComponents = {
    h1: ({ children }) => {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return <AnimatedHeading level={1} id={id}>{children}</AnimatedHeading>;
    },
    h2: ({ children }) => {
      if (!collapsibleSections) {
        const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
        return <AnimatedHeading level={2} id={id}>{children}</AnimatedHeading>;
      }
      return null;
    },
    h3: ({ children }) => {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return <AnimatedHeading level={3} id={id}>{children}</AnimatedHeading>;
    },
    h4: ({ children }) => {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return <AnimatedHeading level={4} id={id}>{children}</AnimatedHeading>;
    },
    
    p: ({ children }) => {
      const currentIndex = paragraphIndex++;
      return <EnhancedParagraph animated={animated}>{children}</EnhancedParagraph>;
    },
    
    strong: ({ children }) => (
      <strong className="font-semibold text-white bg-gradient-to-r from-purple-500/15 to-blue-500/15 px-1.5 py-0.5 rounded-md border border-purple-500/20">
        {children}
      </strong>
    ),
    
    em: ({ children }) => (
      <em className="italic text-purple-300 not-italic font-medium">{children}</em>
    ),
    
    ul: ({ children }) => {
      listIndex = 0;
      return (
        <ul className="mb-5 space-y-1 pl-1">
          {children}
        </ul>
      );
    },
    ol: ({ children }) => {
      listIndex = 0;
      return (
        <ol className="mb-5 space-y-1 pl-1">
          {children}
        </ol>
      );
    },
    li: ({ children, ordered }) => {
      listIndex++;
      return (
        <InteractiveListItem ordered={ordered} index={listIndex}>
          {children}
        </InteractiveListItem>
      );
    },
    
    table: (props) => (
      <div className="overflow-x-auto mb-6 rounded-xl border border-slate-700/50 shadow-xl">
        <table className="min-w-full divide-y divide-slate-700" {...props} />
      </div>
    ),
    thead: (props) => (
      <thead className="bg-gradient-to-r from-slate-800/80 to-slate-800/50" {...props} />
    ),
    tbody: (props) => (
      <tbody className="bg-slate-900/30 divide-y divide-slate-700/30" {...props} />
    ),
    tr: (props) => (
      <tr className="hover:bg-purple-500/5 transition-colors duration-150" {...props} />
    ),
    th: (props) => (
      <th className="px-5 py-4 text-left text-sm font-semibold text-slate-200 tracking-wide" {...props} />
    ),
    td: (props) => (
      <td className="px-5 py-4 text-sm text-slate-300" {...props} />
    ),
    
    code: ({ inline, className, children }) => {
      if (inline) {
        return (
          <code className="bg-slate-800/70 text-purple-300 px-2 py-0.5 rounded-lg text-sm font-mono border border-slate-700/50 hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/10 transition-all duration-200">
            {children}
          </code>
        );
      }
      return <CodeBlock className={className}>{children}</CodeBlock>;
    },
    pre: ({ children }) => <>{children}</>,
    
    a: ({ children, href }) => (
      <a 
        href={href}
        className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 underline decoration-purple-500/30 hover:decoration-purple-400 underline-offset-2 transition-all duration-200 group font-medium" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
      </a>
    ),
    
    hr: () => (
      <div className="my-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="flex items-center gap-2 px-4">
          <Star className="w-3 h-3 text-purple-500/50 animate-pulse" />
          <Sparkles className="w-4 h-4 text-purple-400/70" />
          <Star className="w-3 h-3 text-purple-500/50 animate-pulse" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>
    ),
    
    blockquote: ({ children }) => (
      <blockquote className="relative my-6 pl-5 pr-5 py-5 border-l-4 border-purple-500 bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent rounded-r-xl shadow-lg">
        <div className="text-slate-200 leading-relaxed">{children}</div>
      </blockquote>
    ),

    input: ({ checked }) => (
      <span className={`
        inline-flex items-center justify-center w-5 h-5 rounded-md mr-3 border-2
        transition-all duration-200
        ${checked 
          ? 'bg-purple-500 border-purple-500 text-white scale-110' 
          : 'bg-slate-800 border-slate-600 hover:border-purple-500/50'
        }
      `}>
        {checked && <Check className="w-3 h-3" />}
      </span>
    ),
  };

  return (
    <div className={`bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {/* Header */}
      {title && (
        <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/20">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">{title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">AI-powered analysis & insights</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {collapsibleSections && (
                <button
                  onClick={toggleAllSections}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/70 text-slate-300 hover:text-white transition-all duration-200 text-sm font-medium hover:scale-105"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${allExpanded ? 'rotate-0' : '-rotate-90'}`} />
                  {allExpanded ? 'Collapse All' : 'Expand All'}
                </button>
              )}
              <CopyButton text={content} />
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Table of Contents Sidebar */}
        {showTableOfContents && headings.length > 0 && (
          <div className="w-64 border-r border-slate-700/50 p-5 bg-slate-950/50 hidden lg:block sticky top-0 max-h-screen overflow-y-auto">
            <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Contents
            </h3>
            <nav className="space-y-1">
              {headings.map((heading, i) => (
                <a
                  key={i}
                  href={`#${heading.id}`}
                  className={`
                    flex items-center gap-2 py-2 px-3 rounded-lg text-sm transition-all duration-200
                    ${heading.level === 1 ? 'font-semibold' : ''}
                    ${heading.level === 2 ? 'ml-2' : ''}
                    ${heading.level === 3 ? 'ml-4 text-xs' : ''}
                    ${activeSection === heading.id 
                      ? 'bg-purple-500/20 text-purple-300 border-l-2 border-purple-500 shadow-lg shadow-purple-500/10' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }
                  `}
                  onClick={() => setActiveSection(heading.id)}
                >
                  <span className="truncate">{heading.text}</span>
                </a>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 px-6 py-6 overflow-x-hidden">
          <div className="prose prose-invert prose-sm max-w-none">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-slate-700/50 bg-slate-950/50 flex items-center justify-between">
        <span className="text-xs text-slate-500">Powered by Analytics • Interactive Documentation</span>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-yellow-500/50 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default MarkdownRenderer;