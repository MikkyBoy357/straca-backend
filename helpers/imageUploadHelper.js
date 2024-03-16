const { storage } = require("./firebaseConfig");
const { Readable } = require("stream");
const { pipeline } = require("stream/promises");
const fs = require("fs");
const os = require("os");
const path = require("path");
const tempDir = os.tmpdir(); // Get the platform-specific temporary directory path
// import { ref, getDownloadURL } from "firebase-admin/storage";

const imageUploadHelper = async (imageFile) => {
  if (!imageFile) {
    return "";
  }

  // Upload file to Firebase Storage
  const bucket = storage.bucket();
  const timestamp = Date.now().toString();
  const fileName = `${timestamp}_${imageFile.originalname}`;
  const tempFilePath = path.join(tempDir, fileName); // Use path.join to create the correct path

  // Create a ReadableStream from the Buffer
  const readableStream = new Readable();
  readableStream.push(imageFile.buffer);
  readableStream.push(null); // Signals the end of the stream

  // Write the ReadableStream to a temporary file
  await pipeline(readableStream, fs.createWriteStream(tempFilePath));

  // Upload the temporary file to Firebase Storage
  await bucket.upload(tempFilePath, {
    destination: `images/${fileName}`,
  });

  // Get the download URL for the uploaded image
  try {
    imageUrl = await bucket.file(`images/${fileName}`).publicUrl();
    // const downloadUrl = await getDownloadURL(m);
    // console.log(`===>\n\nDowloadURL => ${imageUrl}\n\n`);
  } catch (e) {
    console.log(e);
    console.log("omo");
  }

  // Delete the temporary file
  fs.unlinkSync(tempFilePath);

  return imageUrl;
};

module.exports = imageUploadHelper;
