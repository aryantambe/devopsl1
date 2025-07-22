import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const DownloadFiles = () => {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const response = await fetch(`http://18.221.115.26:5001/files?email=${user.primaryEmailAddress.emailAddress}`);
        const data = await response.json();
        setFiles(data.files);
      } catch (err) {
        console.error("Error fetching files:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUserFiles();
  }, [user]);

  return (
    <div className="bg-black min-h-screen text-white px-6 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Your Uploaded Files</h2>

      {loading ? (
        <p className="text-center">Loading files...</p>
      ) : files.length === 0 ? (
        <p className="text-center text-gray-400">No files uploaded yet.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {files.map((file) => (
            <div
              key={file.id}
              className="border border-gray-700 rounded p-4 flex justify-between items-center bg-gray-800"
            >
              <div>
                <p className="font-bold">{file.original_file_name}</p>
                <p className="text-sm text-gray-400">Uploaded on: {new Date(file.upload_date).toLocaleString()}</p>
              </div>
              <a
                href={file.s3_url}
                download
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 font-semibold"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadFiles;
