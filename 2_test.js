// const fs = require("fs");
// const { createWorker } = require("node-tesseract-ocr");
// const Jimp = require("jimp");
// const { parse, format } = require("date-fns");
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// const worker = createWorker({
//   lang: ["eng", "deu"], // Specify the languages you want to support (English + German)
// });

// async function preprocessImage(imagePath) {
//   const image = await Jimp.read(imagePath);

//   // Apply image preprocessing operations (e.g., resizing, enhancing, etc.)
//   // Modify the operations based on your specific requirements

//   // Example: Resize the image to a specific width (e.g., 800px)
//   image.resize(800, Jimp.AUTO);

//   // Return the processed image
//   return image;
// }

// async function extractTextFromImage(image) {
//   await worker.load();
//   await worker.loadLanguage();
//   await worker.initialize();

//   // Perform OCR on the image and get the extracted text
//   const {
//     data: { text },
//   } = await worker.recognize(image.bitmap);

//   await worker.terminate();

//   // Return the extracted text
//   return text;
// }

// function extractInformation(text) {
//   // Implement your parsing and extraction logic based on the structure of the text
//   // Use regular expressions, string manipulation, or other techniques to extract the required fields

//   // Extract Artikelname
//   const artikelnameRegex = /Artikelname:\s*(.+)/i;
//   const artikelnameMatch = text.match(artikelnameRegex);
//   const artikelname = artikelnameMatch ? artikelnameMatch[1].trim() : "";

//   // Extract Artikelnummer
//   const artikelnummerRegex = /Artikelnummer:\s*(.+)/i;
//   const artikelnummerMatch = text.match(artikelnummerRegex);
//   const artikelnummer = artikelnummerMatch ? artikelnummerMatch[1].trim() : "";

//   // Extract MHD (Mindesthaltbarkeitsdatum)
//   const mhdRegex = /MHD:\s*(.+)/i;
//   const mhdMatch = text.match(mhdRegex);
//   const mhd = mhdMatch ? mhdMatch[1].trim() : "";

//   // Extract Einfrierdatum
//   const einfrierdatumRegex = /Einfrierdatum:\s*(.+)/i;
//   const einfrierdatumMatch = text.match(einfrierdatumRegex);
//   const einfrierdatum = einfrierdatumMatch ? einfrierdatumMatch[1].trim() : "";

//   // Extract Erntejahr
//   const erntejahrRegex = /Erntejahr:\s*(.+)/i;
//   const erntejahrMatch = text.match(erntejahrRegex);
//   const erntejahr = erntejahrMatch ? erntejahrMatch[1].trim() : "";

//   // Extract LAX
//   const laxRegex = /LAX:\s*(.+)/i;
//   const laxMatch = text.match(laxRegex);
//   const lax = laxMatch ? laxMatch[1].trim() : "";

//   // Extract Produktionscode
//   const produktionscodeRegex = /Produktionscode:\s*(.+)/i;
//   const produktionscodeMatch = text.match(produktionscodeRegex);
//   const produktionscode = produktionscodeMatch
//     ? produktionscodeMatch[1].trim()
//     : "";

//   // Extract Batch
//   const batchRegex = /Batch:\s*(.+)/i;
//   const batchMatch = text.match(batchRegex);
//   const batch = batchMatch ? batchMatch[1].trim() : "";

//   // Extract Lot
//   const lotRegex = /Lot:\s*(.+)/i;
//   const lotMatch = text.match(lotRegex);
//   const lot = lotMatch ? lotMatch[1].trim() : "";

//   // Return the extracted information as an object
//   return {
//     Artikelname: artikelname,
//     Artikelnummer: artikelnummer,
//     "MHD (Mindesthaltbarkeitsdatum)": mhd,
//     Einfrierdatum: einfrierdatum,
//     Erntejahr: erntejahr,
//     LAX: lax,
//     Produktionscode: produktionscode,
//     Batch: batch,
//     Lot: lot,
//   };
// }

// function writeDataToCSV(data, outputPath) {
//   const csvWriter = createCsvWriter({
//     path: outputPath,
//     header: [
//       { id: "Artikelname", title: "Artikelname" },
//       { id: "Artikelnummer", title: "Artikelnummer" },
//       {
//         id: "MHD (Mindesthaltbarkeitsdatum)",
//         title: "MHD (Mindesthaltbarkeitsdatum)",
//       },
//       { id: "Einfrierdatum", title: "Einfrierdatum" },
//       { id: "Erntejahr", title: "Erntejahr" },
//       { id: "LAX", title: "LAX" },
//       { id: "Produktionscode", title: "Produktionscode" },
//       { id: "Batch", title: "Batch" },
//       { id: "Lot", title: "Lot" },
//     ],
//   });

//   const csvData = [data];

//   csvWriter
//     .writeRecords(csvData)
//     .then(() => console.log("Data written to CSV successfully."))
//     .catch((error) => console.error("Error writing data to CSV:", error));
// }

// async function processImages(imageFolderPath, outputCsvPath) {
//   const imageFiles = fs.readdirSync(imageFolderPath);

//   for (const imageFile of imageFiles) {
//     const imagePath = `${imageFolderPath}/${imageFile}`;
//     const processedImage = await preprocessImage(imagePath);
//     const extractedText = await extractTextFromImage(processedImage);
//     const extractedData = extractInformation(extractedText);
//     writeDataToCSV(extractedData, outputCsvPath);
//   }
// }

// async function main() {
//   // Specify the directory containing the images
//   const jpgFolderPath = "./images/jpg"; // Path to the folder containing JPG images
//   const pngFolderPath = "./images/png";

//   // Specify the output CSV file path
//   const outputCsvPath = "./output.csv";

//   try {
//     await processImages(jpgFolderPath, outputCsvPath);
//     await processImages(pngFolderPath, outputCsvPath);
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// main();