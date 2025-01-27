import React, { useState } from "react";
import { storage, db } from "../firebase"; // Import Firebase services
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const UploadSong = () => {
  const [songFile, setSongFile] = useState(null);
  const [songData, setSongData] = useState({
    name: "",
    artist: "",
    image: "",
    duration: "",
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle input changes for metadata
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSongData({ ...songData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSongFile(e.target.files[0]);
  };

  // Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!songFile) {
      alert("Please select a song file to upload.");
      return;
    }

    // Create a reference in Firebase Storage
    const storageRef = ref(storage, `songs/${songFile.name}`);

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, songFile);

    // Monitor upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      async () => {
        // Get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Save metadata to Firestore
        try {
          await addDoc(collection(db, "songs"), {
            ...songData,
            audio: downloadURL,
          });
          alert("Song uploaded successfully!");
          setSongFile(null);
          setSongData({ name: "", artist: "", image: "", duration: "" });
          setUploadProgress(0);
        } catch (error) {
          console.error("Error saving metadata to Firestore:", error);
        }
      }
    );
  };

  return (
    <div>
      <h2>Upload a Song</h2>
      <form onSubmit={handleUpload}>
        <div>
          <label>Song Name:</label>
          <input
            type="text"
            name="name"
            value={songData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Artist:</label>
          <input
            type="text"
            name="artist"
            value={songData.artist}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={songData.duration}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={songData.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Song File:</label>
          <input type="file" accept="audio/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload Song</button>
        <div>Upload Progress: {uploadProgress.toFixed(2)}%</div>
      </form>
    </div>
  );
};

export default UploadSong;
