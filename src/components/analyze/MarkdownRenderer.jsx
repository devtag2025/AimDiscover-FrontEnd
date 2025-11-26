"use client";

import React, { useState, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronRight, 
  ExternalLink,
  Quote,
  Code,
  Hash,
  Sparkles,
  FileText,
  Lightbulb,
  AlertCircle,
  Info,
  Bookmark,
  ArrowRight,
  Star,
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  BookOpen
} from 'lucide-react';

// Random icon picker for variety
const PARAGRAPH_ICONS = [Lightbulb, Star, Zap, Target, TrendingUp, Bookmark, ArrowRight];
const getRandomIcon = (index) => PARAGRAPH_ICONS[index % PARAGRAPH_ICONS.length];

// Copy Button Component
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
      className={`p-2 rounded-lg bg-neutral-700/50 hover:bg-neutral-600/50 text-neutral-400 hover:text-white transition-all duration-200 ${className}`}
      title={copied ? "Copied!" : "Copy"}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
};

// Collapsible Section Component
const CollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = true, 
  icon: Icon = FileText,
  level = 2,
  id 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const sizeClasses = {
    1: "text-xl font-bold",
    2: "text-lg font-semibold",
    3: "text-base font-medium",
    4: "text-sm font-medium",
  };

  return (
    <div 
      id={id}
      className="border border-neutral-800 rounded-xl mb-5 overflow-hidden bg-neutral-900/50 hover:border-neutral-700 transition-colors duration-200"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-neutral-800/80 to-neutral-800/40 hover:from-neutral-800 hover:to-neutral-800/60 transition-all duration-200 text-left group"
      >
        <span className={`
          p-1.5 rounded-lg transition-all duration-300
          ${isOpen ? 'bg-purple-500/20 rotate-0' : 'bg-neutral-700/50 -rotate-90'}
        `}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-90'} ${isOpen ? 'text-purple-400' : 'text-neutral-400'}`} />
        </span>
        <Icon className={`w-5 h-5 transition-colors duration-200 ${isOpen ? 'text-purple-400' : 'text-neutral-500'}`} />
        <span className={`${sizeClasses[level]} text-white flex-1 group-hover:text-purple-200 transition-colors`}>
          {title}
        </span>
        <span className={`
          text-xs px-2 py-1 rounded-full transition-all duration-200
          ${isOpen ? 'bg-purple-500/20 text-purple-400' : 'bg-neutral-700/50 text-neutral-500'}
        `}>
          {isOpen ? 'Collapse' : 'Expand'}
        </span>
      </button>
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="p-5 pt-3 border-t border-neutral-800/50">{children}</div>
      </div>
    </div>
  );
};

// Interactive List Item with icon at END
const InteractiveListItem = ({ children, ordered, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = getRandomIcon(index);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        text-neutral-300 leading-relaxed py-2.5 px-4 -mx-4 rounded-xl
        transition-all duration-300 cursor-default border border-transparent
        ${isHovered ? 'bg-neutral-800/70 text-white border-neutral-700/50 shadow-lg shadow-purple-500/5' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <span className={`
          flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold
          transition-all duration-300
          ${isHovered 
            ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white scale-110 shadow-lg shadow-purple-500/30' 
            : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
          }
        `}>
          {ordered ? index : '•'}
        </span>
        <span className="flex-1 pt-0.5">{children}</span>
        {/* Icon at the END */}
        <Icon className={`
          w-4 h-4 flex-shrink-0 mt-1 transition-all duration-300
          ${isHovered ? 'text-purple-400 opacity-100 translate-x-0' : 'text-neutral-600 opacity-0 -translate-x-2'}
        `} />
      </div>
    </li>
  );
};

// Enhanced Paragraph with icon at END
const EnhancedParagraph = ({ children, index, animated }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = getRandomIcon(index);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative group mb-4 p-4 -mx-4 rounded-xl transition-all duration-300
        ${isHovered ? 'bg-neutral-800/30' : ''}
        ${animated ? 'animate-fade-in' : ''}
      `}
    >
      <p className="text-neutral-300 leading-relaxed pr-8">
        {children}
      </p>
      {/* Icon at the END (top-right) */}
      <Icon className={`
        absolute top-4 right-4 w-4 h-4 transition-all duration-300
        ${isHovered ? 'text-purple-400 opacity-100 scale-110' : 'text-neutral-700 opacity-0 scale-90'}
      `} />
    </div>
  );
};

// Enhanced Code Block
const CodeBlock = ({ children, className }) => {
  const language = className?.replace('language-', '') || 'text';
  const code = String(children).replace(/\n$/, '');
  const [isExpanded, setIsExpanded] = useState(true);

  const lineCount = code.split('\n').length;
  const shouldCollapse = lineCount > 10;

  return (
    <div className="group relative mb-5 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-neutral-800 to-neutral-850 border-b border-neutral-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{language}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">{lineCount} lines</span>
          {shouldCollapse && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs px-2 py-1 rounded bg-neutral-700/50 hover:bg-neutral-600/50 text-neutral-400 hover:text-white transition-colors"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          )}
          <CopyButton text={code} className="opacity-0 group-hover:opacity-100" />
        </div>
      </div>
      {/* Code Content */}
      <div className={`
        transition-all duration-300 overflow-hidden
        ${!isExpanded && shouldCollapse ? 'max-h-48' : 'max-h-[2000px]'}
      `}>
        <pre className="bg-neutral-900 p-4 overflow-x-auto">
          <code className="text-sm font-mono text-neutral-200 leading-relaxed">
            {code.split('\n').map((line, i) => (
              <div key={i} className="flex hover:bg-neutral-800/50 -mx-4 px-4 transition-colors">
                <span className="select-none text-neutral-600 w-8 flex-shrink-0 text-right pr-4 text-xs pt-0.5">
                  {i + 1}
                </span>
                <span className="flex-1">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
      {/* Fade overlay for collapsed state */}
      {!isExpanded && shouldCollapse && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />
      )}
    </div>
  );
};

// Animated Heading (non-collapsible version)
const AnimatedHeading = ({ level, children, id, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const baseClasses = "font-bold text-white transition-all duration-200 flex items-center gap-3 group cursor-default";
  
  const sizes = {
    1: "text-2xl mt-8 mb-4",
    2: "text-xl mt-6 mb-3",
    3: "text-lg mt-5 mb-2",
    4: "text-base mt-4 mb-2",
  };

  const iconColors = {
    1: "text-purple-400",
    2: "text-blue-400",
    3: "text-emerald-400",
    4: "text-amber-400",
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
      className={`${baseClasses} ${sizes[level]} ${isHovered ? 'text-purple-200' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className="flex-1">{children}</span>
      {/* Hash icon at END */}
      <button 
        onClick={handleCopyLink}
        className={`
          p-1 rounded transition-all duration-200
          ${isHovered ? 'opacity-100' : 'opacity-0'}
          ${copied ? 'bg-green-500/20' : 'hover:bg-neutral-800'}
        `}
        title={copied ? "Link copied!" : "Copy link"}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Hash className={`w-4 h-4 ${iconColors[level]}`} />
        )}
      </button>
    </Tag>
  );
};

// Icon mapping for section types
const getSectionIcon = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes('overview') || lower.includes('summary')) return BookOpen;
  if (lower.includes('insight') || lower.includes('analysis')) return Lightbulb;
  if (lower.includes('warning') || lower.includes('risk')) return AlertCircle;
  if (lower.includes('info') || lower.includes('note')) return Info;
  if (lower.includes('trend') || lower.includes('growth')) return TrendingUp;
  if (lower.includes('key') || lower.includes('important')) return Star;
  if (lower.includes('action') || lower.includes('step')) return Target;
  if (lower.includes('comment') || lower.includes('feedback')) return MessageSquare;
  return FileText;
};

// Main Component
const MarkdownRenderer = ({ 
  content, 
  title = "Insights",
  className = "",
  showTableOfContents = false,
  animated = true,
  collapsibleSections = true,
  defaultCollapsed = false
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const [allExpanded, setAllExpanded] = useState(!defaultCollapsed);

  // Track paragraph index for variety
  let paragraphIndex = 0;
  let listIndex = 0;

  // Extract headings for table of contents
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

  // Parse content into sections for collapsible behavior
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

    // Split content by h2 headings for collapsible sections
    const sections = content.split(/(?=^## )/gm);
    
    return sections.map((section, idx) => {
      const headingMatch = section.match(/^## (.+)$/m);
      
      if (headingMatch) {
        const title = headingMatch[1];
        const sectionContent = section.replace(/^## .+$/m, '').trim();
        const sectionId = title.toLowerCase().replace(/[^\w]+/g, '-');
        const Icon = getSectionIcon(title);

        return (
          <CollapsibleSection 
            key={idx} 
            title={title} 
            icon={Icon}
            id={sectionId}
            defaultOpen={allExpanded}
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

      // Content before first h2 (intro)
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
    // Headings (h3, h4 are inline, h1, h2 handled by sections)
    h1: ({ node, children, ...props }) => {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return <AnimatedHeading level={1} id={id} {...props}>{children}</AnimatedHeading>;
    },
    h2: ({ node, children, ...props }) => {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      // Only render if not using collapsible sections
      if (!collapsibleSections) {
        return <AnimatedHeading level={2} id={id} {...props}>{children}</AnimatedHeading>;
      }
      return null;
    },
    h3: ({ node, children, ...props }) => {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return <AnimatedHeading level={3} id={id} {...props}>{children}</AnimatedHeading>;
    },
    h4: ({ node, children, ...props }) => {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return <AnimatedHeading level={4} id={id} {...props}>{children}</AnimatedHeading>;
    },
    
    // Enhanced Paragraphs with icon at END
    p: ({ node, children, ...props }) => {
      const currentIndex = paragraphIndex++;
      return (
        <EnhancedParagraph index={currentIndex} animated={animated}>
          {children}
        </EnhancedParagraph>
      );
    },
    
    strong: ({ node, children, ...props }) => (
      <strong className="font-semibold text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-1.5 py-0.5 rounded-md border border-purple-500/20" {...props}>
        {children}
      </strong>
    ),
    
    em: ({ node, ...props }) => (
      <em className="italic text-purple-300 not-italic font-medium" {...props} />
    ),
    
    // Interactive Lists with icon at END
    ul: ({ node, children, ...props }) => {
      listIndex = 0;
      return (
        <ul className="mb-5 space-y-1 bg-neutral-800/20 rounded-xl p-3 border border-neutral-800/50" {...props}>
          {children}
        </ul>
      );
    },
    ol: ({ node, children, ...props }) => {
      listIndex = 0;
      return (
        <ol className="mb-5 space-y-1 bg-neutral-800/20 rounded-xl p-3 border border-neutral-800/50" {...props}>
          {children}
        </ol>
      );
    },
    li: ({ node, children, ordered, ...props }) => {
      listIndex++;
      return (
        <InteractiveListItem ordered={ordered} index={listIndex}>
          {children}
        </InteractiveListItem>
      );
    },
    
    // Enhanced Tables
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto mb-6 rounded-xl border border-neutral-800 shadow-xl">
        <table className="min-w-full divide-y divide-neutral-700" {...props} />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead className="bg-gradient-to-r from-purple-900/30 to-blue-900/30" {...props} />
    ),
    tbody: ({ node, ...props }) => (
      <tbody className="bg-neutral-900 divide-y divide-neutral-800" {...props} />
    ),
    tr: ({ node, ...props }) => (
      <tr className="hover:bg-purple-500/10 transition-colors duration-200" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th className="px-5 py-4 text-left text-sm font-semibold text-white tracking-wide" {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className="px-5 py-4 text-sm text-neutral-300" {...props} />
    ),
    
    // Code with copy functionality
    code: ({ node, inline, className, children, ...props }) => {
      if (inline) {
        return (
          <code 
            className="bg-gradient-to-r from-neutral-800 to-neutral-850 text-purple-400 px-2 py-1 rounded-lg text-sm font-mono border border-neutral-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-200 cursor-default" 
            {...props}
          >
            {children}
          </code>
        );
      }
      return <CodeBlock className={className}>{children}</CodeBlock>;
    },
    pre: ({ node, children, ...props }) => <>{children}</>,
    
    // Enhanced Links with icon at END
    a: ({ node, children, href, ...props }) => (
      <a 
        href={href}
        className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 underline decoration-purple-500/30 hover:decoration-purple-400 underline-offset-4 transition-all duration-200 group font-medium" 
        target="_blank" 
        rel="noopener noreferrer" 
        {...props}
      >
        {children}
        <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </a>
    ),
    
    // Decorative Horizontal rule
    hr: ({ node, ...props }) => (
      <div className="my-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="flex items-center gap-2 px-4">
          <Star className="w-3 h-3 text-purple-500/50" />
          <Sparkles className="w-4 h-4 text-purple-400/70" />
          <Star className="w-3 h-3 text-purple-500/50" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>
    ),
    
    // Enhanced Blockquote
    blockquote: ({ node, children, ...props }) => (
      <blockquote 
        className="relative my-6 pl-6 pr-6 py-5 border-l-4 border-purple-500 bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent rounded-r-xl shadow-lg" 
        {...props}
      >
        <Quote className="absolute top-4 right-4 w-10 h-10 text-purple-500/15" />
        <div className="text-neutral-200 italic leading-relaxed">{children}</div>
        <MessageSquare className="absolute bottom-4 right-4 w-4 h-4 text-purple-500/30" />
      </blockquote>
    ),

    // Task lists (GFM)
    input: ({ node, checked, ...props }) => (
      <span className={`
        inline-flex items-center justify-center w-5 h-5 rounded-md border-2 mr-3
        transition-all duration-200
        ${checked 
          ? 'bg-purple-500 border-purple-500 text-white' 
          : 'bg-neutral-800 border-neutral-600 hover:border-purple-500/50'
        }
      `}>
        {checked && <Check className="w-3 h-3" />}
      </span>
    ),
  };

  return (
    <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {/* Header */}
      {title && (
        <div className="px-6 py-5 border-b border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <p className="text-xs text-neutral-500 mt-0.5">AI-powered analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {collapsibleSections && (
                <button
                  onClick={() => setAllExpanded(!allExpanded)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all text-sm"
                >
                  {allExpanded ? (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Collapse All
                    </>
                  ) : (
                    <>
                      <ChevronRight className="w-4 h-4" />
                      Expand All
                    </>
                  )}
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
          <div className="w-64 border-r border-neutral-800 p-5 bg-neutral-950/50 hidden lg:block sticky top-0 max-h-screen overflow-y-auto">
            <h3 className="text-xs font-bold text-neutral-500 mb-4 uppercase tracking-widest flex items-center gap-2">
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
                      ? 'bg-purple-500/20 text-purple-300 border-l-2 border-purple-500' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/70'
                    }
                  `}
                  onClick={() => setActiveSection(heading.id)}
                >
                  <ArrowRight className={`w-3 h-3 transition-transform ${activeSection === heading.id ? 'translate-x-1' : ''}`} />
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
      <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950/50 flex items-center justify-between">
        <span className="text-xs text-neutral-600">Rendered with AI insights</span>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-yellow-500/50" />
        </div>
      </div>
    </div>
  );
};

export default MarkdownRenderer;