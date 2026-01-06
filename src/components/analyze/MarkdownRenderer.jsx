"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Check, Copy, ChevronDown, ExternalLink, Hash, 
  Sparkles, FileText, Lightbulb, AlertCircle, Info, 
  TrendingUp, Target, BookOpen, Terminal, 
  Maximize2, Minimize2, Menu, X,
  Download, Printer, Share2, Loader2
} from 'lucide-react';
import { 
  exportToPDF, 
  exportToDOCX, 
  exportToMarkdown, 
  printReport, 
  copyShareLink,
  canExport 
} from '@/lib/exportUtils';
import Link from 'next/link';

// ==================== HOOKS ====================

const useScrollSpy = (ids, offset = 100) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `-${offset}px 0px -40% 0px` }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
};

// ==================== SUB-COMPONENTS ====================

const CopyButton = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`
        group relative flex items-center justify-center p-2 rounded-lg border transition-all duration-200
        ${copied 
          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
          : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
        }
        ${className}
      `}
      aria-label="Copy to clipboard"
    >
      <div className="relative w-4 h-4">
        <Copy className={`absolute inset-0 transition-all duration-300 ${copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} />
        <Check className={`absolute inset-0 transition-all duration-300 ${copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
      </div>
    </button>
  );
};

const CodeBlock = ({ children, className }) => {
  const language = className?.replace('language-', '') || 'text';
  const code = String(children).replace(/\n$/, '');
  const [isExpanded, setIsExpanded] = useState(false);
  const lineCount = code.split('\n').length;
  const shouldCollapse = lineCount > 12;
  
  return (
    <div className="group relative my-6 rounded-xl border border-white/10 bg-[#0A0A0E] overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider ml-2">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {shouldCollapse && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded hover:bg-white/10 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
          <CopyButton text={code} className="!p-1.5 !w-7 !h-7 !bg-transparent !border-transparent hover:!bg-white/10" />
        </div>
      </div>
      
      <div 
        className={`relative transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-none' : shouldCollapse ? 'max-h-[320px]' : ''}`}
        style={{ overflow: isExpanded ? 'visible' : 'hidden' }}
      >
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <pre className="p-4 min-w-full float-left">
            <code className="block text-xs sm:text-sm font-mono text-gray-300 leading-relaxed whitespace-pre font-normal">
              {code.split('\n').map((line, i) => (
                <div key={i} className="table-row hover:bg-white/[0.02] transition-colors w-full">
                  <span className="table-cell select-none text-gray-600 w-8 text-right pr-4 text-[10px] py-[1px] align-top opacity-50">
                    {i + 1}
                  </span>
                  <span className="table-cell break-words">{line || ' '}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
        
        {!isExpanded && shouldCollapse && (
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0A0E] to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
};

const CollapsibleSection = ({ title, children, isOpen, onToggle, icon: Icon = FileText, id }) => (
  <div 
    id={id} 
    className={`
      scroll-mt-28 group mb-4 rounded-xl border transition-all duration-300 overflow-hidden
      ${isOpen 
        ? 'bg-white/[0.03] border-purple-500/30 shadow-[0_4px_20px_-10px_rgba(168,85,247,0.1)]' 
        : 'bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10'
      }
    `}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-4 px-4 sm:px-6 py-4 text-left focus:outline-none focus:bg-white/[0.02]"
    >
      <div className={`
        flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-300
        ${isOpen
          ? 'bg-purple-500/20 border-purple-500/30 text-purple-300'
          : 'bg-white/5 border-white/5 text-gray-500 group-hover:text-gray-300'
        }
      `}>
        <Icon className="w-4 h-4" />
      </div>
      
      <span className={`flex-1 text-sm font-semibold tracking-wide transition-colors ${isOpen ? 'text-gray-100' : 'text-gray-400 group-hover:text-gray-200'}`}>
        {title}
      </span>
      
      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : 'rotate-0'}`} />
    </button>
    
    <div 
      className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[8000px] opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div className="px-4 sm:px-6 pb-6 pt-0 border-t border-white/5">
        <div className="pt-4 text-gray-300 space-y-4">
          {children}
        </div>
      </div>
    </div>
  </div>
);

// ==================== EXPORT ACTIONS COMPONENT ====================

const ExportActions = ({ 
  content, 
  title = "Analysis Report",
  metadata = {},
  contentElementId = 'markdown-content'
}) => {
  const [exportingFormat, setExportingFormat] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleExport = async (format) => {
    setExportingFormat(format);
    
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`;
      
      switch (format) {
        case 'pdf':
          await exportToPDF(contentElementId, `${filename}.pdf`);
          break;
          
        case 'docx':
          await exportToDOCX(content, `${filename}.docx`, { 
            title, 
            ...metadata,
            date: new Date().toLocaleDateString()
          });
          break;
          
        case 'markdown':
          exportToMarkdown(content, `${filename}.md`);
          break;
          
        case 'print':
          printReport();
          break;
          
        case 'share':
          await copyShareLink();
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error.message}. Please try again.`);
    } finally {
      setExportingFormat(null);
    }
  };

  const exportOptions = [
    { 
      id: 'pdf', 
      label: 'PDF', 
      icon: FileText, 
      className: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30',
      title: 'Download as PDF'
    },
    { 
      id: 'docx', 
      label: 'DOCX', 
      icon: FileText, 
      className: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30',
      title: 'Download as Word Document'
    },
    { 
      id: 'markdown', 
      label: 'MD', 
      icon: Download, 
      className: 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border-purple-500/30',
      title: 'Download as Markdown'
    },
    { 
      id: 'print', 
      label: 'Print', 
      icon: Printer, 
      className: 'bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 border-gray-500/30',
      title: 'Print Report'
    },
    { 
      id: 'share', 
      label: copied ? 'Copied!' : 'Share', 
      icon: copied ? Check : Share2, 
      className: 'bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/30',
      title: 'Copy Share Link'
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-white/5">
      <div className="flex items-center gap-2 text-xs text-gray-500 mr-auto">
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Export Report:</span>
        <span className="sm:hidden">Export:</span>
      </div>
      
      {exportOptions.map(({ id, label, icon: Icon, className, title: buttonTitle }) => (
        <button
          key={id}
          onClick={() => handleExport(id)}
          disabled={exportingFormat === id}
          title={buttonTitle}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
            border transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
        >
          {exportingFormat === id ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Icon className="w-3.5 h-3.5" />
          )}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

const MarkdownRenderer = ({ 
  content, 
  title = "Analysis Results",
  className = "",
  showTableOfContents = false,
  collapsibleSections = true,
  defaultCollapsed = false,
  enableExport = true,
  exportMetadata = {},
  onReady = null // Callback to pass element ID when ready
}) => {
  const [sectionStates, setSectionStates] = useState({});
  const [allExpanded, setAllExpanded] = useState(!defaultCollapsed);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [exportSupported, setExportSupported] = useState(true);
  
  // Stable unique ID for PDF export
  const contentElementId = useMemo(() => `markdown-content-${Math.random().toString(36).substr(2, 9)}`, []);
  
  // Notify parent when component is ready with the element ID
  useEffect(() => {
    if (onReady && contentElementId) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        onReady(contentElementId);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [onReady, contentElementId]);
  
  // Check export support
  useEffect(() => {
    if (enableExport && !canExport()) {
      console.warn('Export features not fully supported in this browser');
      setExportSupported(false);
    }
  }, [enableExport]);
  
  // Extract headings
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

  const activeSectionId = useScrollSpy(headings.map(h => h.id));

  useEffect(() => {
    const sections = content?.match(/^## (.+)$/gm) || [];
    const initialStates = {};
    sections.forEach(s => {
      const id = s.replace('## ', '').toLowerCase().replace(/[^\w]+/g, '-');
      initialStates[id] = !defaultCollapsed;
    });
    setSectionStates(initialStates);
  }, [content, defaultCollapsed]);

  const toggleSection = (id) => setSectionStates(prev => ({ ...prev, [id]: !prev[id] }));

  const toggleAll = () => {
    const newState = !allExpanded;
    setAllExpanded(newState);
    const newStates = { ...sectionStates };
    Object.keys(newStates).forEach(k => newStates[k] = newState);
    setSectionStates(newStates);
  };

  const getIcon = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('insight') || lower.includes('analysis')) return Sparkles;
    if (lower.includes('risk') || lower.includes('alert')) return AlertCircle;
    if (lower.includes('trend')) return TrendingUp;
    if (lower.includes('action')) return Target;
    if (lower.includes('summary')) return BookOpen;
    return FileText;
  };

  const components = {
    h1: ({ children }) => <h1 id={String(children).toLowerCase().replace(/[^\w]+/g, '-')} className="scroll-mt-32 text-2xl font-bold text-gray-100 mt-8 mb-6 pb-4 border-b border-white/10">{children}</h1>,
    h2: ({ children }) => !collapsibleSections && <h2 id={String(children).toLowerCase().replace(/[^\w]+/g, '-')} className="scroll-mt-32 text-xl font-bold text-gray-100 mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 id={String(children).toLowerCase().replace(/[^\w]+/g, '-')} className="scroll-mt-32 text-lg font-semibold text-gray-200 mt-6 mb-3 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"/>{children}</h3>,
    p: ({ children }) => <p className="text-gray-300 leading-7 mb-4 last:mb-0">{children}</p>,
    strong: ({ children }) => <strong className="font-semibold text-white bg-white/5 px-1 rounded">{children}</strong>,
    em: ({ children }) => <em className="text-purple-300 not-italic">{children}</em>,
    ul: ({ children }) => <ul className="space-y-2 mb-6 ml-1">{children}</ul>,
    ol: ({ children }) => <ol className="space-y-2 mb-6 ml-1 list-decimal list-inside text-gray-400">{children}</ol>,
    li: ({ children }) => (
      <li className="group flex items-start gap-3 text-gray-300 pl-2 border-l-2 border-transparent hover:border-purple-500/50 transition-colors">
        <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors shrink-0" />
        <span className="leading-7">{children}</span>
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative my-6 pl-6 py-1 border-l-2 border-purple-500 bg-gradient-to-r from-purple-500/10 to-transparent rounded-r-lg">
        <div className="text-gray-300 italic">{children}</div>
      </blockquote>
    ),
    code: ({ inline, className, children }) => inline 
      ? <code className="px-1.5 py-0.5 rounded-md bg-white/10 text-purple-200 text-xs font-mono border border-white/10">{children}</code>
      : <CodeBlock className={className}>{children}</CodeBlock>,
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 underline decoration-purple-500/30 underline-offset-4 transition-all inline-flex items-center gap-1">
        {children} <ExternalLink className="w-3 h-3 opacity-50" />
      </a>
    ),
    table: (props) => (
      <div className="w-full overflow-x-auto my-6 rounded-xl border border-white/10 shadow-lg bg-[#0A0A0E]">
        <table className="w-full text-left text-sm whitespace-nowrap" {...props} />
      </div>
    ),
    thead: (props) => <thead className="bg-white/5 text-gray-100 font-medium border-b border-white/5" {...props} />,
    tbody: (props) => <tbody className="divide-y divide-white/5" {...props} />,
    tr: (props) => <tr className="hover:bg-white/5 transition-colors group" {...props} />,
    th: (props) => <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-400" {...props} />,
    td: (props) => <td className="px-6 py-4 text-gray-300 group-hover:text-gray-100" {...props} />,
  };

  const renderContent = () => {
    if (!collapsibleSections) return <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{content}</ReactMarkdown>;

    const parts = content.split(/(?=^## )/gm);
    
    return parts.map((part, i) => {
      const match = part.match(/^## (.+)$/m);
      if (match) {
        const sectionTitle = match[1];
        const sectionBody = part.replace(/^## .+$/m, '').trim();
        const id = sectionTitle.toLowerCase().replace(/[^\w]+/g, '-');
        const isOpen = sectionStates[id] ?? allExpanded;

        return (
          <CollapsibleSection
            key={i}
            id={id}
            title={sectionTitle}
            isOpen={isOpen}
            onToggle={() => toggleSection(id)}
            icon={getIcon(sectionTitle)}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{sectionBody}</ReactMarkdown>
          </CollapsibleSection>
        );
      }
      if (part.trim()) {
        return (
          <div key={i} className="mb-8 prose-intro">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{part}</ReactMarkdown>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-purple-500/30 via-white/10 to-transparent shadow-2xl overflow-hidden w-full">
        
        <div className="absolute inset-0 bg-[#050509] rounded-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.15),rgba(255,255,255,0))] pointer-events-none" />
        
        <div className="relative min-h-[400px] w-full">
          
          {/* Header */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-[#050509]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#050509]/60">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
                <Terminal className="h-4 w-4 text-purple-400" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-gray-100 uppercase tracking-wider truncate">{title}</h2>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE PREVIEW
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {showTableOfContents && headings.length > 0 && (
                <button
                  onClick={() => setMobileTocOpen(!mobileTocOpen)}
                  className="xl:hidden p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white"
                >
                  {mobileTocOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              )}
              
              {collapsibleSections && (
                <button
                  onClick={toggleAll}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${allExpanded ? 'rotate-0' : '-rotate-90'}`} />
                  {allExpanded ? 'Collapse' : 'Expand'}
                </button>
              )}
              
              <CopyButton text={content} />
            </div>
          </div>

          {showTableOfContents && mobileTocOpen && (
            <div className="xl:hidden border-b border-white/10 bg-[#0A0A0E] px-4 py-3 animate-in slide-in-from-top-2">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Jump to section</p>
              <nav className="space-y-1 max-h-48 overflow-y-auto">
                {headings.map((h, i) => (
                  <Link
                    key={i}
                    href={`#${h.id}`}
                    onClick={() => setMobileTocOpen(false)}
                    className="block py-2 px-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors truncate"
                  >
                    {h.text}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          <div className="flex flex-col xl:flex-row">
            {showTableOfContents && headings.length > 0 && (
              <div className="hidden xl:block w-64 flex-shrink-0 border-r border-white/5 bg-black/20">
                <div className="sticky top-20 p-5 max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> Contents
                  </h3>
                  <nav className="space-y-0.5 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5 ml-3" />
                    
                    {headings.map((h, i) => {
                      const isActive = activeSectionId === h.id;
                      return (
                        <Link
                          key={i} 
                          href={`#${h.id}`}
                          className={`
                            group flex items-center gap-3 py-1.5 pr-3 rounded-r-lg text-xs transition-all border-l-[2px]
                            ${h.level > 1 ? 'ml-0 pl-6' : 'pl-3'}
                            ${isActive 
                              ? 'border-purple-500 bg-purple-500/5 text-purple-200 font-medium' 
                              : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-white/20'
                            }
                          `}
                        >
                          <span className="truncate">{h.text}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            )}

            {/* Markdown Content Area */}
            <div className="flex-1 min-w-0">
              {/* Export Actions */}
              {enableExport && exportSupported && (
                <div className="px-4 py-4 sm:px-8 sm:pt-6">
                  <ExportActions 
                    content={content}
                    title={title}
                    metadata={exportMetadata}
                    contentElementId={contentElementId}
                  />
                </div>
              )}
              
              {/* Content with ID for PDF export - THIS IS THE KEY PART */}
              <div 
                id={contentElementId} 
                className="px-4 py-6 sm:px-8 sm:py-8 max-w-full pdf-export-content"
                data-pdf-export="true"
              >
                {renderContent()}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-4 sm:px-6 py-3 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-[10px] text-gray-600 font-mono uppercase tracking-wider">
            <span>Generated via AimDiscover</span>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Encrypted Connection</span>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownRenderer;