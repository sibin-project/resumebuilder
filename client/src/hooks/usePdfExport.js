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
                scale: 3, // Higher scale for ultra-sharp quality
                backgroundColor: "#ffffff",
                useCORS: true,
                logging: false,
                letterRendering: true,
                scrollX: 0,
                scrollY: -window.scrollY,
                windowWidth: 794, // Standard A4 width at 96 DPI
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
