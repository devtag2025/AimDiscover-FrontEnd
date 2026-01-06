// // lib/exportUtils.js
// import {
//   Document,
//   Packer,
//   Paragraph,
//   HeadingLevel,
//   TextRun,
//   AlignmentType,
// } from "docx";
// import { saveAs } from "file-saver";

// /* =========================================================
//    PDF EXPORT - FIXED FOR VISIBLE CONTENT
// ========================================================= */

// export const exportToPDF = async (elementId, filename = "report.pdf") => {
//   console.log('🔍 Starting PDF export...');
  
//   const sourceElement = document.getElementById(elementId);
  
//   if (!sourceElement) {
//     throw new Error('Content not found');
//   }

//   const textContent = sourceElement.innerText || sourceElement.textContent;
//   if (!textContent || textContent.trim().length < 50) {
//     throw new Error('No content available to export');
//   }

//   console.log('✅ Content verified:', textContent.length, 'characters');

//   // Try html2canvas + jsPDF first, with proper fallback
//   try {
//     await exportWithHtml2Canvas(sourceElement, filename);
//   } catch (error) {
//     console.warn('⚠️ html2canvas failed, using text-based fallback');
//     await exportWithJsPDFText(textContent, filename);
//   }
// };

// /* =========================================================
//    METHOD 1: HTML2CANVAS APPROACH (VISUAL)
// ========================================================= */

// async function exportWithHtml2Canvas(sourceElement, filename) {
//   console.log('📸 Using html2canvas method...');
  
//   // Import libraries dynamically
//   const html2canvas = (await import('html2canvas')).default;
//   const { jsPDF } = await import('jspdf');

//   // Create a clean clone
//   const clone = sourceElement.cloneNode(true);
  
//   // Create wrapper with print-friendly styles
//   const wrapper = document.createElement('div');
//   wrapper.style.cssText = `
//     position: fixed;
//     left: 0;
//     top: 0;
//     width: 800px;
//     background: white;
//     padding: 40px;
//     font-family: Arial, sans-serif;
//     color: black;
//     z-index: 999999;
//   `;
  
//   // Remove interactive elements from clone
//   clone.querySelectorAll('button, svg, [role="button"], .no-print').forEach(el => el.remove());
  
//   // Apply print styles recursively
//   const applyPrintStyles = (element) => {
//     if (element.nodeType !== 1) return;
    
//     // Remove all classes and inline background/color styles
//     element.removeAttribute('class');
//     const computed = window.getComputedStyle(element);
    
//     element.style.background = 'transparent';
//     element.style.backgroundImage = 'none';
//     element.style.backgroundColor = 'transparent';
//     element.style.color = 'black';
//     element.style.boxShadow = 'none';
//     element.style.textShadow = 'none';
//     element.style.border = 'none';
//     element.style.borderRadius = '0';
//     element.style.transform = 'none';
//     element.style.filter = 'none';
//     element.style.opacity = '1';
    
//     const tag = element.tagName.toLowerCase();
    
//     // Tag-specific styles
//     switch(tag) {
//       case 'h1':
//         element.style.fontSize = '24px';
//         element.style.fontWeight = 'bold';
//         element.style.marginBottom = '16px';
//         element.style.borderBottom = '2px solid black';
//         element.style.paddingBottom = '8px';
//         break;
//       case 'h2':
//         element.style.fontSize = '20px';
//         element.style.fontWeight = 'bold';
//         element.style.marginTop = '20px';
//         element.style.marginBottom = '12px';
//         element.style.borderBottom = '1px solid #666';
//         element.style.paddingBottom = '6px';
//         break;
//       case 'h3':
//         element.style.fontSize = '16px';
//         element.style.fontWeight = 'bold';
//         element.style.marginTop = '16px';
//         element.style.marginBottom = '8px';
//         break;
//       case 'p':
//         element.style.fontSize = '12px';
//         element.style.lineHeight = '1.6';
//         element.style.marginBottom = '10px';
//         break;
//       case 'li':
//         element.style.fontSize = '12px';
//         element.style.marginBottom = '6px';
//         break;
//       case 'code':
//         element.style.fontFamily = 'Courier, monospace';
//         element.style.fontSize = '11px';
//         element.style.backgroundColor = '#f5f5f5';
//         element.style.padding = '2px 4px';
//         element.style.border = '1px solid #ddd';
//         break;
//       case 'pre':
//         element.style.fontFamily = 'Courier, monospace';
//         element.style.fontSize = '11px';
//         element.style.backgroundColor = '#f5f5f5';
//         element.style.padding = '12px';
//         element.style.border = '1px solid #ddd';
//         element.style.whiteSpace = 'pre-wrap';
//         element.style.overflowWrap = 'break-word';
//         break;
//     }
    
//     // Process children
//     Array.from(element.children).forEach(applyPrintStyles);
//   };
  
//   applyPrintStyles(clone);
//   wrapper.appendChild(clone);
//   document.body.appendChild(wrapper);
  
//   console.log('📄 Wrapper created, waiting for render...');
  
//   // Wait for rendering
//   await new Promise(resolve => setTimeout(resolve, 500));
  
//   try {
//     console.log('📸 Capturing with html2canvas...');
    
//     const canvas = await html2canvas(wrapper, {
//       scale: 2,
//       useCORS: true,
//       allowTaint: false,
//       backgroundColor: '#ffffff',
//       logging: false,
//       width: wrapper.scrollWidth,
//       height: wrapper.scrollHeight,
//       windowWidth: wrapper.scrollWidth,
//       windowHeight: wrapper.scrollHeight,
//     });
    
//     console.log('✅ Canvas created:', canvas.width, 'x', canvas.height);
    
//     // Check if canvas has content
//     const ctx = canvas.getContext('2d');
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const pixels = imageData.data;
//     let hasContent = false;
    
//     // Check if canvas has any non-white pixels
//     for (let i = 0; i < pixels.length; i += 4) {
//       if (pixels[i] < 250 || pixels[i+1] < 250 || pixels[i+2] < 250) {
//         hasContent = true;
//         break;
//       }
//     }
    
//     if (!hasContent) {
//       console.warn('⚠️ Canvas appears empty');
//       throw new Error('Canvas capture failed - no content detected');
//     }
    
//     console.log('✅ Canvas has content');
    
//     // Convert to PDF
//     const imgData = canvas.toDataURL('image/jpeg', 0.98);
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });
    
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();
//     const imgWidth = pdfWidth - 20; // 10mm margins
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
//     let heightLeft = imgHeight;
//     let position = 10;
    
//     // Add first page
//     pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
//     heightLeft -= pdfHeight;
    
//     // Add additional pages if needed
//     while (heightLeft > 0) {
//       position = heightLeft - imgHeight + 10;
//       pdf.addPage();
//       pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
//       heightLeft -= pdfHeight;
//     }
    
//     pdf.save(filename);
//     console.log('✅ PDF saved successfully!');
    
//   } finally {
//     // Cleanup
//     if (wrapper.parentNode) {
//       wrapper.parentNode.removeChild(wrapper);
//     }
//   }
// }

// /* =========================================================
//    METHOD 2: TEXT-BASED FALLBACK (RELIABLE)
// ========================================================= */

// async function exportWithJsPDFText(textContent, filename) {
//   console.log('📝 Using text-based fallback...');
  
//   const { jsPDF } = await import('jspdf');
  
//   const doc = new jsPDF({
//     orientation: 'portrait',
//     unit: 'mm',
//     format: 'a4'
//   });
  
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();
//   const margin = 20;
//   const maxWidth = pageWidth - (margin * 2);
//   let yPosition = margin;
  
//   // Title
//   doc.setFontSize(20);
//   doc.setFont(undefined, 'bold');
//   doc.text('Market Analysis Report', margin, yPosition);
//   yPosition += 10;
  
//   // Date
//   doc.setFontSize(10);
//   doc.setFont(undefined, 'normal');
//   doc.text(`Generated on ${new Date().toLocaleDateString('en-US', { 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
//   })}`, margin, yPosition);
//   yPosition += 5;
  
//   // Divider
//   doc.setLineWidth(0.5);
//   doc.line(margin, yPosition, pageWidth - margin, yPosition);
//   yPosition += 10;
  
//   // Content
//   doc.setFontSize(11);
//   doc.setFont(undefined, 'normal');
  
//   // Split text into lines and handle pagination
//   const lines = doc.splitTextToSize(textContent, maxWidth);
//   const lineHeight = 7;
  
//   lines.forEach((line) => {
//     if (yPosition + lineHeight > pageHeight - margin) {
//       doc.addPage();
//       yPosition = margin;
//     }
    
//     doc.text(line, margin, yPosition);
//     yPosition += lineHeight;
//   });
  
//   // Footer on last page
//   doc.setFontSize(9);
//   doc.setTextColor(150, 150, 150);
//   doc.text(
//     'Generated via AimDiscover | Confidential Report', 
//     pageWidth / 2, 
//     pageHeight - 10, 
//     { align: 'center' }
//   );
  
//   doc.save(filename);
//   console.log('✅ Text-based PDF saved!');
// }

// /* =========================================================
//    DOCX EXPORT - SAME AS BEFORE
// ========================================================= */

// export const exportToDOCX = async (
//   markdownContent,
//   filename = "report.docx",
//   metadata = {}
// ) => {
//   console.log('📝 DOCX Export - Starting');
  
//   if (!markdownContent || markdownContent.trim().length === 0) {
//     throw new Error("No content to export");
//   }

//   const sections = parseMarkdownToSections(markdownContent);
  
//   if (sections.length === 0) {
//     throw new Error("Could not parse content");
//   }

//   const docSections = [];

//   // Title
//   docSections.push(
//     new Paragraph({
//       text: metadata.title || "Market Analysis Report",
//       heading: HeadingLevel.TITLE,
//       spacing: { after: 400 },
//       alignment: AlignmentType.CENTER,
//     })
//   );

//   // Metadata
//   if (metadata.category || metadata.region || metadata.date) {
//     const metaText = [
//       metadata.category && `Category: ${metadata.category}`,
//       metadata.region && `Region: ${metadata.region}`,
//       metadata.date && `Date: ${metadata.date}`,
//     ]
//       .filter(Boolean)
//       .join(" | ");

//     docSections.push(
//       new Paragraph({
//         children: [
//           new TextRun({
//             text: metaText,
//             size: 20,
//             color: "666666",
//           }),
//         ],
//         spacing: { after: 400 },
//         alignment: AlignmentType.CENTER,
//       })
//     );
//   }

//   docSections.push(
//     new Paragraph({
//       text: "━".repeat(60),
//       spacing: { after: 300 },
//     })
//   );

//   // Process sections
//   sections.forEach((section) => {
//     docSections.push(
//       new Paragraph({
//         text: section.title,
//         heading: HeadingLevel.HEADING_1,
//         spacing: { before: 400, after: 200 },
//       })
//     );

//     section.content.forEach((item) => {
//       if (item.type === "heading") {
//         docSections.push(
//           new Paragraph({
//             text: item.text,
//             heading: HeadingLevel.HEADING_2,
//             spacing: { before: 200, after: 100 },
//           })
//         );
//       } else if (item.type === "list") {
//         docSections.push(
//           new Paragraph({
//             text: item.text,
//             bullet: { level: 0 },
//             spacing: { after: 80 },
//           })
//         );
//       } else if (item.type === "paragraph") {
//         docSections.push(
//           new Paragraph({
//             children: [new TextRun(item.text)],
//             spacing: { after: 120 },
//           })
//         );
//       }
//     });
//   });

//   // Footer
//   docSections.push(
//     new Paragraph({ spacing: { before: 400 } }),
//     new Paragraph({
//       children: [new TextRun({ text: "━".repeat(60) })],
//       spacing: { after: 100 },
//     }),
//     new Paragraph({
//       children: [
//         new TextRun({
//           text: "Generated via AimDiscover",
//           size: 18,
//           color: "999999",
//           italics: true,
//         }),
//       ],
//       alignment: AlignmentType.CENTER,
//     })
//   );

//   const doc = new Document({
//     sections: [{ children: docSections }],
//   });

//   const blob = await Packer.toBlob(doc);
//   saveAs(blob, filename);
//   console.log('✅ DOCX saved!');
// };

// function parseMarkdownToSections(markdown) {
//   const sections = [];
//   const lines = markdown.split("\n");
//   let currentSection = null;

//   lines.forEach((line) => {
//     const trimmed = line.trim();

//     if (trimmed.startsWith("## ")) {
//       if (currentSection) sections.push(currentSection);
//       currentSection = {
//         title: trimmed.replace("## ", ""),
//         content: [],
//       };
//     } else if (trimmed.startsWith("### ") && currentSection) {
//       currentSection.content.push({
//         type: "heading",
//         text: trimmed.replace("### ", ""),
//       });
//     } else if (trimmed.match(/^[-*+]\s+/) && currentSection) {
//       const cleanText = trimmed
//         .replace(/^[-*+]\s+/, "")
//         .replace(/\*\*(.+?)\*\*/g, "$1")
//         .replace(/\*(.+?)\*/g, "$1")
//         .replace(/`(.+?)`/g, "$1")
//         .replace(/\[(.+?)\]\(.+?\)/g, "$1");

//       if (cleanText) {
//         currentSection.content.push({
//           type: "list",
//           text: cleanText,
//         });
//       }
//     } else if (trimmed && currentSection && !trimmed.startsWith("#")) {
//       const cleanText = trimmed
//         .replace(/\*\*(.+?)\*\*/g, "$1")
//         .replace(/\*(.+?)\*/g, "$1")
//         .replace(/`(.+?)`/g, "$1")
//         .replace(/\[(.+?)\]\(.+?\)/g, "$1");

//       if (cleanText) {
//         currentSection.content.push({
//           type: "paragraph",
//           text: cleanText,
//         });
//       }
//     }
//   });

//   if (currentSection) sections.push(currentSection);
//   return sections;
// }

// export const exportToMarkdown = (content, filename = "report.md") => {
//   const blob = new Blob([content], {
//     type: "text/markdown;charset=utf-8",
//   });
//   saveAs(blob, filename);
// };

// export const printReport = () => {
//   window.print();
// };

// export const copyShareLink = async () => {
//   const url = window.location.href;
//   await navigator.clipboard.writeText(url);
//   return url;
// };

// export const canExport = () => {
//   if (typeof window === 'undefined') return false;
  
//   const checks = {
//     canvas: !!document.createElement("canvas").getContext,
//     blob: typeof Blob !== "undefined",
//     download: "download" in document.createElement("a"),
//     clipboard: !!navigator.clipboard,
//   };

//   return Object.values(checks).every(Boolean);
// }






// lib/exportUtils.js
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

/* =========================================================
   PDF EXPORT
========================================================= */

export const exportToPDF = async (elementId, filename = "report.pdf") => {
  const sourceElement = document.getElementById(elementId);
  
  if (!sourceElement) {
    throw new Error('Content not found');
  }

  const textContent = sourceElement.innerText || sourceElement.textContent;
  if (!textContent || textContent.trim().length < 50) {
    throw new Error('No content available to export');
  }

  try {
    await exportWithHtml2Canvas(sourceElement, filename);
  } catch (error) {
    await exportWithJsPDFText(textContent, filename);
  }
};

/* =========================================================
   HTML2CANVAS APPROACH
========================================================= */

async function exportWithHtml2Canvas(sourceElement, filename) {
  const html2canvas = (await import('html2canvas')).default;
  const { jsPDF } = await import('jspdf');

  const clone = sourceElement.cloneNode(true);
  
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    width: 800px;
    background: white;
    padding: 40px;
    font-family: Arial, sans-serif;
    color: black;
    z-index: 999999;
  `;
  
  clone.querySelectorAll('button, svg, [role="button"], .no-print').forEach(el => el.remove());
  
  const applyPrintStyles = (element) => {
    if (element.nodeType !== 1) return;
    
    element.removeAttribute('class');
    
    element.style.background = 'transparent';
    element.style.backgroundImage = 'none';
    element.style.backgroundColor = 'transparent';
    element.style.color = 'black';
    element.style.boxShadow = 'none';
    element.style.textShadow = 'none';
    element.style.border = 'none';
    element.style.borderRadius = '0';
    element.style.transform = 'none';
    element.style.filter = 'none';
    element.style.opacity = '1';
    
    const tag = element.tagName.toLowerCase();
    
    switch(tag) {
      case 'h1':
        element.style.fontSize = '24px';
        element.style.fontWeight = 'bold';
        element.style.marginBottom = '16px';
        element.style.borderBottom = '2px solid black';
        element.style.paddingBottom = '8px';
        break;
      case 'h2':
        element.style.fontSize = '20px';
        element.style.fontWeight = 'bold';
        element.style.marginTop = '20px';
        element.style.marginBottom = '12px';
        element.style.borderBottom = '1px solid #666';
        element.style.paddingBottom = '6px';
        break;
      case 'h3':
        element.style.fontSize = '16px';
        element.style.fontWeight = 'bold';
        element.style.marginTop = '16px';
        element.style.marginBottom = '8px';
        break;
      case 'p':
        element.style.fontSize = '12px';
        element.style.lineHeight = '1.6';
        element.style.marginBottom = '10px';
        break;
      case 'li':
        element.style.fontSize = '12px';
        element.style.marginBottom = '6px';
        break;
      case 'code':
        element.style.fontFamily = 'Courier, monospace';
        element.style.fontSize = '11px';
        element.style.backgroundColor = '#f5f5f5';
        element.style.padding = '2px 4px';
        element.style.border = '1px solid #ddd';
        break;
      case 'pre':
        element.style.fontFamily = 'Courier, monospace';
        element.style.fontSize = '11px';
        element.style.backgroundColor = '#f5f5f5';
        element.style.padding = '12px';
        element.style.border = '1px solid #ddd';
        element.style.whiteSpace = 'pre-wrap';
        element.style.overflowWrap = 'break-word';
        break;
    }
    
    Array.from(element.children).forEach(applyPrintStyles);
  };
  
  applyPrintStyles(clone);
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const canvas = await html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      width: wrapper.scrollWidth,
      height: wrapper.scrollHeight,
      windowWidth: wrapper.scrollWidth,
      windowHeight: wrapper.scrollHeight,
    });
    
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let hasContent = false;
    
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i] < 250 || pixels[i+1] < 250 || pixels[i+2] < 250) {
        hasContent = true;
        break;
      }
    }
    
    if (!hasContent) {
      throw new Error('Canvas capture failed - no content detected');
    }
    
    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 10;
    
    pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
    
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    
    pdf.save(filename);
    
  } finally {
    if (wrapper.parentNode) {
      wrapper.parentNode.removeChild(wrapper);
    }
  }
}

/* =========================================================
   TEXT-BASED FALLBACK
========================================================= */

async function exportWithJsPDFText(textContent, filename) {
  const { jsPDF } = await import('jspdf');
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;
  
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.text('Market Analysis Report', margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Generated on ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, margin, yPosition);
  yPosition += 5;
  
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  
  const lines = doc.splitTextToSize(textContent, maxWidth);
  const lineHeight = 7;
  
  lines.forEach((line) => {
    if (yPosition + lineHeight > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.text(line, margin, yPosition);
    yPosition += lineHeight;
  });
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(
    'Generated via AimDiscover | Confidential Report', 
    pageWidth / 2, 
    pageHeight - 10, 
    { align: 'center' }
  );
  
  doc.save(filename);
}

/* =========================================================
   DOCX EXPORT
========================================================= */

export const exportToDOCX = async (
  markdownContent,
  filename = "report.docx",
  metadata = {}
) => {
  if (!markdownContent || markdownContent.trim().length === 0) {
    throw new Error("No content to export");
  }

  const sections = parseMarkdownToSections(markdownContent);
  
  if (sections.length === 0) {
    throw new Error("Could not parse content");
  }

  const docSections = [];

  docSections.push(
    new Paragraph({
      text: metadata.title || "Market Analysis Report",
      heading: HeadingLevel.TITLE,
      spacing: { after: 400 },
      alignment: AlignmentType.CENTER,
    })
  );

  if (metadata.category || metadata.region || metadata.date) {
    const metaText = [
      metadata.category && `Category: ${metadata.category}`,
      metadata.region && `Region: ${metadata.region}`,
      metadata.date && `Date: ${metadata.date}`,
    ]
      .filter(Boolean)
      .join(" | ");

    docSections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: metaText,
            size: 20,
            color: "666666",
          }),
        ],
        spacing: { after: 400 },
        alignment: AlignmentType.CENTER,
      })
    );
  }

  docSections.push(
    new Paragraph({
      text: "━".repeat(60),
      spacing: { after: 300 },
    })
  );

  sections.forEach((section) => {
    docSections.push(
      new Paragraph({
        text: section.title,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    section.content.forEach((item) => {
      if (item.type === "heading") {
        docSections.push(
          new Paragraph({
            text: item.text,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          })
        );
      } else if (item.type === "list") {
        docSections.push(
          new Paragraph({
            text: item.text,
            bullet: { level: 0 },
            spacing: { after: 80 },
          })
        );
      } else if (item.type === "paragraph") {
        docSections.push(
          new Paragraph({
            children: [new TextRun(item.text)],
            spacing: { after: 120 },
          })
        );
      }
    });
  });

  docSections.push(
    new Paragraph({ spacing: { before: 400 } }),
    new Paragraph({
      children: [new TextRun({ text: "━".repeat(60) })],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Generated via AimDiscover",
          size: 18,
          color: "999999",
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
    })
  );

  const doc = new Document({
    sections: [{ children: docSections }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
};

/* =========================================================
   MARKDOWN PARSER
========================================================= */

function parseMarkdownToSections(markdown) {
  const sections = [];
  const lines = markdown.split("\n");
  let currentSection = null;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        title: trimmed.replace("## ", ""),
        content: [],
      };
    } else if (trimmed.startsWith("### ") && currentSection) {
      currentSection.content.push({
        type: "heading",
        text: trimmed.replace("### ", ""),
      });
    } else if (trimmed.match(/^[-*+]\s+/) && currentSection) {
      const cleanText = trimmed
        .replace(/^[-*+]\s+/, "")
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/`(.+?)`/g, "$1")
        .replace(/\[(.+?)\]\(.+?\)/g, "$1");

      if (cleanText) {
        currentSection.content.push({
          type: "list",
          text: cleanText,
        });
      }
    } else if (trimmed && currentSection && !trimmed.startsWith("#")) {
      const cleanText = trimmed
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/`(.+?)`/g, "$1")
        .replace(/\[(.+?)\]\(.+?\)/g, "$1");

      if (cleanText) {
        currentSection.content.push({
          type: "paragraph",
          text: cleanText,
        });
      }
    }
  });

  if (currentSection) sections.push(currentSection);
  return sections;
}

/* =========================================================
   OTHER EXPORTS
========================================================= */

export const exportToMarkdown = (content, filename = "report.md") => {
  const blob = new Blob([content], {
    type: "text/markdown;charset=utf-8",
  });
  saveAs(blob, filename);
};

export const printReport = () => {
  window.print();
};

export const copyShareLink = async () => {
  const url = window.location.href;
  await navigator.clipboard.writeText(url);
  return url;
};

export const canExport = () => {
  if (typeof window === 'undefined') return false;
  
  const checks = {
    canvas: !!document.createElement("canvas").getContext,
    blob: typeof Blob !== "undefined",
    download: "download" in document.createElement("a"),
    clipboard: !!navigator.clipboard,
  };

  return Object.values(checks).every(Boolean);
};