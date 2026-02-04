import { useRef, useState } from 'react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export const usePdfExport = () => {
    const [isExporting, setIsExporting] = useState(false);
    const printRef = useRef(null);

    const exportToPdf = async (resumeName = "resume") => {
        const element = printRef.current;
        if (!element) {
            console.error("Print reference not found");
            return;
        }

        try {
            setIsExporting(true);

            // Wait a bit for any images or fonts to settle
            await new Promise(resolve => setTimeout(resolve, 1000));

            const canvas = await html2canvas(element, {
                scale: 2.5, // Balanced for quality and performance
                backgroundColor: "#ffffff",
                useCORS: true,
                logging: false,
                allowTaint: true,
                width: 794, // Exact A4 width in px at 96 DPI
                windowWidth: 1200, // Larger window width to avoid mobile-style responsive folding
                onclone: (clonedDoc) => {
                    const clonedElement = clonedDoc.getElementById('resume-preview-id');
                    if (clonedElement) {
                        clonedElement.style.transform = 'none';
                        clonedElement.style.width = '794px';
                        clonedElement.style.margin = '0';
                        clonedElement.style.padding = '0';
                    }
                }
            });

            // Using PNG for perfect text clarity (JPEG can make text look 'low' or blurry)
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
                compress: true
            });

            const imgWidth = 210; // A4 Width in mm
            const pageHeight = 297; // A4 Height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            // Add first page
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pageHeight;

            // Add additional pages if content is longer
            while (heightLeft > 0.5) { // Small margin to avoid empty pages
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, 'FAST');
                heightLeft -= pageHeight;
            }

            pdf.save(`${resumeName.replace(/\s+/g, '_')}_Resume.pdf`);
        } catch (error) {
            console.error("PDF Export failed:", error);
        } finally {
            setIsExporting(false);
        }
    };

    return { exportToPdf, isExporting, printRef };
};
