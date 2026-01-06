"use client";

import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import * as LucideIcons from "lucide-react";
import { 
  exportToPDF, 
  exportToDOCX, 
  exportToMarkdown, 
  printReport 
} from "@/lib/exportUtils";

export default function InsightsCard({
  insights,
  isAnalyzing,
  onGenerate3D,
  onRefine,
  conversationHistory,
  exportMetadata = {}, 
}) {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportingType, setExportingType] = useState(null);
  const [exportTargetId, setExportTargetId] = useState(null);

  const handleExport = async (type) => {
    console.log('🚀 Export started:', type);
    console.log('📍 Export target ID:', exportTargetId);
    console.log('📄 Insights length:', insights?.length);
    
    setIsExporting(true);
    setExportingType(type);
    setIsExportMenuOpen(false);

    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const category = exportMetadata.category || "analysis";
      const filename = `${category.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`;

      switch (type) {
        case 'pdf':
          if (!exportTargetId) {
            throw new Error("Content not ready for export. Please wait a moment and try again.");
          }
          
          // Verify element exists before exporting
          const element = document.getElementById(exportTargetId);
          if (!element) {
            console.error('❌ Element not found:', exportTargetId);
            throw new Error(`Cannot find content element. Please refresh and try again.`);
          }
          
          console.log('✅ Element verified, starting PDF export');
          await exportToPDF(exportTargetId, `${filename}.pdf`);
          break;
        
        case 'docx':
          if (!insights || insights.trim().length === 0) {
            throw new Error("No insights content available to export.");
          }
          
          console.log('✅ Insights verified, starting DOCX export');
          await exportToDOCX(insights, `${filename}.docx`, {
            title: 'Market Analysis Report',
            ...exportMetadata,
            date: new Date().toLocaleDateString()
          });
          break;
        
        case 'markdown':
          if (!insights || insights.trim().length === 0) {
            throw new Error("No insights content available to export.");
          }
          
          exportToMarkdown(insights, `${filename}.md`);
          break;
        
        case 'print':
          printReport();
          break;
      }
      
      console.log(`✅ ${type.toUpperCase()} export successful`);
      
      // Show success notification
      const successMsg = document.createElement('div');
      successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      `;
      successMsg.textContent = `✅ ${type.toUpperCase()} exported successfully!`;
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
      
    } catch (error) {
      console.error('❌ Export failed:', error);
      console.error('Error stack:', error.stack);
      
      // Show detailed error to user
      alert(`Export failed: ${error.message}\n\nPlease check the browser console for more details.`);
    } finally {
      setIsExporting(false);
      setExportingType(null);
    }
  };

  // Log when component mounts
  console.log('📊 InsightsCard mounted');
  console.log('  - Insights available:', !!insights);
  console.log('  - Insights length:', insights?.length || 0);
  console.log('  - Export target ID:', exportTargetId || 'Not set yet');

  return (
    <div className="animate-in fade-in slide-in-from-bottom duration-700">
      <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-purple-500/30 via-indigo-500/20 to-transparent shadow-2xl">
        <div className="relative bg-[#050509] rounded-xl p-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.1),rgba(255,255,255,0))] rounded-xl" />
          
          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-purple-500/20">
                  <LucideIcons.FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Market Analysis & Insights
                  </h2>
                  <p className="text-xs text-gray-400">
                    {conversationHistory.length > 1
                      ? `Refined ${Math.floor((conversationHistory.length - 1) / 2)} time(s)`
                      : "Initial analysis"}
                  </p>
                </div>
              </div>

              {/* Export Menu */}
              <div className="flex items-center gap-3">
                <span className="hidden sm:flex px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                  ✓ Complete
                </span>

                <div className="relative">
                  <button
                    onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                    disabled={isExporting}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExporting ? (
                      <>
                        <LucideIcons.Loader2 className="w-4 h-4 animate-spin" />
                        <span className="hidden sm:inline">
                          {exportingType === 'pdf' && 'Generating PDF...'}
                          {exportingType === 'docx' && 'Generating DOCX...'}
                          {exportingType === 'markdown' && 'Exporting...'}
                          {exportingType === 'print' && 'Printing...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <LucideIcons.Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Export</span>
                        <LucideIcons.ChevronDown className={`w-3 h-3 transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </button>

                  {isExportMenuOpen && !isExporting && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsExportMenuOpen(false)}
                      />
                      
                      <div className="absolute right-0 mt-2 w-52 bg-[#0A0A0E] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                        <div className="py-1">
                          <button
                            onClick={() => handleExport('pdf')}
                            disabled={!exportTargetId}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={!exportTargetId ? 'Loading content...' : 'Download as PDF'}
                          >
                            <LucideIcons.FileText className="w-4 h-4 text-red-400" />
                            <span>Export as PDF</span>
                            {!exportTargetId && (
                              <LucideIcons.Loader2 className="w-3 h-3 animate-spin ml-auto" />
                            )}
                          </button>

                          <button
                            onClick={() => handleExport('docx')}
                            disabled={!insights}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={!insights ? 'No content available' : 'Download as DOCX'}
                          >
                            <LucideIcons.FileType className="w-4 h-4 text-blue-400" />
                            <span>Export as DOCX</span>
                          </button>

                          <button
                            onClick={() => handleExport('markdown')}
                            disabled={!insights}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <LucideIcons.FileCode className="w-4 h-4 text-purple-400" />
                            <span>Export as Markdown</span>
                          </button>

                          <div className="my-1 border-t border-white/10" />

                          <button
                            onClick={() => handleExport('print')}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white text-sm transition-colors"
                          >
                            <LucideIcons.Printer className="w-4 h-4 text-gray-400" />
                            <span>Print Report</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

       

            {/* Insights Content */}
            <div className="prose prose-invert max-w-none mb-6">
              <MarkdownRenderer
                content={insights}
                title="Market Analysis Report"
                showTableOfContents={false}
                collapsibleSections={true}
                defaultCollapsed={false}
                enableExport={false}
                onReady={(id) => {
                  setExportTargetId(id);
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGenerate3D}
                  disabled={isAnalyzing}
                  className="flex-1 group relative px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30 border border-purple-500/30"
                >
                  <div className="flex items-center justify-center gap-3">
                    <LucideIcons.Box className="h-5 w-5" />
                    <span>Generate 3D Model</span>
                    <LucideIcons.Sparkles className="h-4 w-4 text-yellow-300" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                  onClick={onRefine}
                  disabled={isAnalyzing}
                  className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center gap-3">
                    <LucideIcons.MessageSquare className="h-5 w-5" />
                    <span>Refine Insights</span>
                  </div>
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Satisfied? Generate a 3D model • Want changes? Refine insights
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}