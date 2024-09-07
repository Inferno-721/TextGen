require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Gemini SDK

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to convert image files to generative parts
const fileToGenerativePart = (filePath, mimeType) => {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType,
    },
  };
};

// Function to generate testing instructions using Gemini API
const generateTestInstructions = async (prompt, images) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare the image parts
    const imageParts = images.map(image => 
      fileToGenerativePart(path.join(__dirname, '../uploads', image.filename), `image/${image.mimetype.split('/')[1]}`)
    );

    // Combine prompt with image parts
    const result = await model.generateContent([prompt, ...imageParts]);
    return result.response.text();
  } catch (error) {
    console.error('Error generating instructions from Gemini API:', error.message);
    throw error;
  }
};

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Endpoint to handle file and text input, and send the request to the Gemini API
app.post('/api/generate-instructions', upload.array('images', 5), async (req, res) => {
  const context = req.body.context || '';
  const images = req.files; 

  if (!images.length) {
    return res.status(400).json({ message: 'No images uploaded' });
  }

  try {
    // Generate prompt by combining context and images
    let prompt = context;
    prompt += "\nPlease describe step-by-step testing instructions for the features shown in the following images:";

    // Call Gemini API to generate the test instructions
    const instructions = await generateTestInstructions(prompt, images);

    res.json({ instructions });
  } catch (error) {
    console.error('Error communicating with Gemini API:', error.message);
    res.status(500).json({ message: 'Failed to generate instructions. Try again later.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
