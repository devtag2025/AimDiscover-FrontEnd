import { useState } from 'react';
import { 
  exportToPDF, 
  exportToDOCX, 
  exportToMarkdown, 
  printReport 
} from '@/lib/exportUtils';
import { Download, FileText, File, Printer } from 'lucide-react';

export default function ExportButton({ markdownContent, metadata }) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState(null);

  const handleExport = async (type) => {
    setIsExporting(true);
    setExportType(type);

    try {
      const filename = `analysis-${Date.now()}`;

      switch (type) {
        case 'pdf':
          await exportToPDF('markdown-content', `${filename}.pdf`);
          break;
        
        case 'docx':
          await exportToDOCX(markdownContent, `${filename}.docx`, {
            title: 'Market Analysis Report',
            category: metadata.category,
            region: metadata.region,
            date: new Date().toLocaleDateString()
          });
          break;
        
        case 'markdown':
          exportToMarkdown(markdownContent, `${filename}.md`);
          break;
        
        case 'print':
          printReport();
          break;
      }
    } catch (error) {
      console.error(`Export failed:`, error);
      alert(`Export failed: ${error.message}`);
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleExport('pdf')}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg disabled:opacity-50"
      >
        <FileText className="w-4 h-4" />
        {isExporting && exportType === 'pdf' ? 'Exporting...' : 'Export PDF'}
      </button>

      <button
        onClick={() => handleExport('docx')}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50"
      >
        <File className="w-4 h-4" />
        {isExporting && exportType === 'docx' ? 'Exporting...' : 'Export DOCX'}
      </button>

      <button
        onClick={() => handleExport('markdown')}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        {isExporting && exportType === 'markdown' ? 'Exporting...' : 'Export MD'}
      </button>

      <button
        onClick={() => handleExport('print')}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg disabled:opacity-50"
      >
        <Printer className="w-4 h-4" />
        Print
      </button>
    </div>
  );
}