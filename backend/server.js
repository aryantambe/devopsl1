const express = require("express");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// AWS S3 Configuration
const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const bucketName = "cloudkeepstorage";

// Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const { username, uploadDate, originalFileName, fileType, userEmail } = req.body;
  const fileName = req.file.originalname;
  const s3Key = `${Date.now()}_${fileName}`;

  const s3Params = {
    Bucket: bucketName,
    Key: s3Key,
    Body: req.file.buffer,
    ContentType: "application/octet-stream",
  };

  try {
    const command = new PutObjectCommand(s3Params);
    await s3.send(command);

    const s3Url = `https://${bucketName}.s3.us-east-2.amazonaws.com/${s3Key}`;

    const insertQuery = `
      INSERT INTO files (username, uploadDate, originalFileName, fileType, userEmail, fileKey, fileUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [username, uploadDate, originalFileName, fileType, userEmail, s3Key, s3Url];

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({ error: "File uploaded but metadata failed to save" });
      }

      res.status(200).json({
        message: "✅ File uploaded and metadata saved!",
        url: s3Url,
        fileKey: s3Key,
      });
    });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    res.status(500).json({ error: "❌ Error uploading file to S3" });
  }
});

// Get files uploaded by a user
app.get("/files", async (req, res) => {
  const { userEmail } = req.query;
  if (!userEmail) {
    return res.status(400).json({ error: "userEmail is required" });
  }

  const fetchQuery = `
    SELECT fileKey AS \`key\`, fileUrl AS url, uploadDate AS uploaded_at
    FROM files
    WHERE userEmail = ?
    ORDER BY uploadDate DESC
  `;

  db.query(fetchQuery, [userEmail], (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({ error: "Failed to fetch files from database" });
    }

    res.status(200).json(results);
  });
});

// Generate download link
app.get("/download/:filename", async (req, res) => {
  const { filename } = req.params;

  try {
    const url = `https://${bucketName}.s3.us-east-2.amazonaws.com/${filename}`;
    res.json({ url });
  } catch (err) {
    console.error("Error generating public link:", err);
    res.status(500).json({ error: "Failed to generate public link" });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
