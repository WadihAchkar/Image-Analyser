const { createWorker } = require('tesseract.js');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Function to perform OCR on a single image
async function performOCR(imagePath) {
  // Preprocess the image using sharp (resize, rotate, enhance, etc., if needed)
  const preprocessedImage = await sharp(imagePath).toBuffer();

  // Initialize the Tesseract.js worker
  const worker = createWorker();

  // Load the image and perform OCR
  await worker.load();
  await worker.loadLanguage('eng+deu'); // Load English and German language data
  await worker.initialize('eng+deu');
  await worker.setParameters({
    tessedit_pageseg_mode: 'single_word', // Set the OCR segmentation mode
  });
  const { data: { text } } = await worker.recognize(preprocessedImage);

  // Clean up and return the extracted text
  await worker.terminate();
  return text;
}

// Function to extract specific information from the OCR text
function extractInformation(text) {
  // Write your logic here to extract the required information from the OCR text
  // You can use regular expressions, string manipulation, or other techniques

  // Return the extracted information as an object
  return {
    Artikelname: '...',
    Artikelnummer: '...',
    MHD: '...',
    Einfrierdatum: '...',
    Erntejahr: '...',
    LAX: '...',
    Produktionscode: '...',
    Batch: '...',
    Lot: '...',
  };
}

// Function to process all images in a directory
async function processImages(directoryPath) {
  const subdirectories = fs.readdirSync(directoryPath);

  for (const subdirectory of subdirectories) {
    const imageFiles = fs.readdirSync(path.join(directoryPath, subdirectory));
    let output = ''; // Variable to store the output text

    for (const imageFile of imageFiles) {
      const imagePath = path.join(directoryPath, subdirectory, imageFile);
      output += `\n\nProcessing image: ${imageFile}\n`;

      // Perform OCR on the image
      const ocrText = await performOCR(imagePath);

      // Extract information from the OCR text
      const information = extractInformation(ocrText);

      // Append the extracted information to the output
      output += 'German:\n';
      output += `- Artikelname: ${information.Artikelname}\n`;
      output += `- Artikelnummer: ${information.Artikelnummer}\n`;
      output += `- MHD: ${information.MHD}\n`;
      output += `- Einfrierdatum: ${information.Einfrierdatum}\n`;
      output += `- Erntejahr: ${information.Erntejahr}\n`;
      output += `- LAX: ${information.LAX}\n`;
      output += `- Produktionscode: ${information.Produktionscode}\n`;
      output += `- Batch: ${information.Batch}\n`;
      output += `- Lot: ${information.Lot}\n\n`;

      output += 'English:\n';
      output += `- Artikelname: ${information.Artikelname}\n`;
      output += `- Artikelnummer: ${information.Artikelnummer}\n`;
      output += `- MHD: ${information.MHD}\n`;
      output += `- Einfrierdatum: ${information.Einfrierdatum}\n`;
      output += `- Erntejahr: ${information.Erntejahr}\n`;
      output += `- LAX: ${information.LAX}\n`;
      output += `- Produktionscode: ${information.Produktionscode}\n`;
      output += `- Batch: ${information.Batch}\n`;
      output += `- Lot: ${information.Lot}\n\n`;
    }

    // Write the output to a file
    fs.writeFileSync(path.join(directoryPath, subdirectory, 'output.txt'), output);
  }
}

// Call the processImages function with the path to your image directory
processImages('./images');