import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaDownload, FaFileAlt } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";

const SendFile = () => {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus("");
  };

  const uploadToBackend = async () => {
    if (!file || !user) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", user.fullName || user.username || "Unknown");
    formData.append("uploadDate", new Date().toISOString());
    formData.append("originalFileName", file.name);
    formData.append("fileType", file.type);
    formData.append("userEmail", user.primaryEmailAddress?.emailAddress || "N/A");

    try {
      const response = await fetch("http://13.216.89.171:5001/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadStatus(`✅ File uploaded: ${result.url}`);
        fetchFiles(); // Refresh file list
      } else {
        setUploadStatus(`❌ Upload failed: ${result.error}`);
      }
    } catch (error) {
      setUploadStatus("❌ Error uploading file. Please try again.");
    }

    setLoading(false);
  };

  const fetchFiles = async () => {
    if (!user) return;
    const email = user?.primaryEmailAddress?.emailAddress || "N/A";
    try {
      const res = await fetch(`http://13.216.89.171:5001/files?userEmail=${encodeURIComponent(email)}`);
      const data = await res.json();
      setFiles(data); // No need to reverse if backend sorts it
    } catch (err) {
      console.error("Failed to fetch files", err);
    }
  };

  const downloadFile = async (key) => {
    try {
      const res = await fetch(`http://13.216.89.171:5001/download/${key}`);
      const data = await res.json();
      window.open(data.url, "_blank");
    } catch (err) {
      alert("❌ Failed to generate download link");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [user]);

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen py-10 px-4">
      <div className="text-3xl font-semibold mb-6 text-center">Upload File to Cloud</div>

      <div className="bg-black border border-white rounded-lg p-4 w-full max-w-xl mb-8">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full bg-black text-white border border-white rounded-lg p-2 mb-4"
        />
        <button
          onClick={uploadToBackend}
          disabled={!file || loading}
          className="w-full flex items-center justify-center bg-white text-black font-bold px-4 py-2 rounded hover:bg-gray-200"
        >
          <FaCloudUploadAlt className="mr-2" />
          {loading ? "Uploading..." : "Upload to S3"}
        </button>
        {uploadStatus && <p className="mt-4 text-green-400">{uploadStatus}</p>}
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-xl mb-4 border-b border-white pb-2">Your Uploaded Files</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {files.map((file) => (
            <div
              key={file.key}
              className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex flex-col justify-between"
            >
              <div className="flex items-center mb-3">
                {file.key.match(/\.(png|jpe?g|gif)$/i) ? (
                  <img
                    src={file.url}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                ) : (
                  <FaFileAlt className="text-3xl text-white mr-4" />
                )}
                <div className="flex-1">
                  <p className="font-bold break-all">{file.key}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(file.uploaded_at || file.lastModified).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => downloadFile(file.key)}
                className="mt-2 flex items-center bg-white text-black font-semibold px-3 py-1 rounded hover:bg-gray-200 w-fit"
              >
                <FaDownload className="mr-2" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SendFile;
