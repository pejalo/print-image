import "https://unpkg.com/jspdf@3.0.0/dist/jspdf.umd.min.js"
const { jsPDF } = window.jspdf

const MARGIN = 10 // mm
const SPACING = 4 // mm

const generateBtn = document.getElementById('generateBtn');
const imageInput = document.getElementById('imageInput');
const paperSizeSelect = document.getElementById('paperSize');

generateBtn.addEventListener('click', () => {
    const file = imageInput.files[0];
    const format = paperSizeSelect.value;

    if (!file) {
        alert("Please select an image first.");
        return;
    }

    const reader = new FileReader();

    // This runs once the file is fully read
    reader.onload = (event) => {
        const imgData = event.target.result;
        generateGridPDF(imgData, format);
    };

    reader.readAsDataURL(file);
});

/**
 * Generates a grid-based PDF layout
 * @param {string} imgData - Base64 image string
 * @param {string} format - 'letter' or 'a4'
 */
function generateGridPDF(imgData, format) {
    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: format });
    const safeWidth = pdf.internal.pageSize.getWidth() - 2*MARGIN;
    const safeHeight = pdf.internal.pageSize.getHeight() - 2*MARGIN;

    // Define the count of images per row
    const rowCounts = [2, 3, 4, 5];
    let currentY = MARGIN;

    rowCounts.forEach(n => {
        // Calculate the side length for this specific row using the solved gutter
        const side = (safeWidth - (SPACING * (n - 1))) / n;

        for (let i = 0; i < n; i++) {
            const x = MARGIN + (i * side) + (i * SPACING);
            pdf.addImage(imgData, 'JPEG', x, currentY, side, side);
        }

        // Move to the next row
        currentY += side + SPACING;
    });

    pdf.save("image.pdf");
}
