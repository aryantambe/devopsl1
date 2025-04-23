import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";


const HomePage = () => {
  return (
    <div className="bg-black text-white font-sans">
      {/* Navbar */}
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 bg-black overflow-hidden">
      {/* Animated Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-6xl font-extrabold text-white leading-tight"
      >
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">
        Your Files,
        </span>
        <br />
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-white"
        >
          Our Storage
        </motion.span>
      </motion.h2>

      {/* Animated Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-4 text-lg text-gray-400 max-w-2xl"
      >
        Connect to CloudKeep and experience seamless, and hassle-free access to your files, anywhere. <br />

      </motion.p>

      {/* Animated Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-6 flex space-x-4"
      >
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:opacity-90 transition" onClick={() => window.location.href = '/sendfiles'}
        >
          Lets Start
        </motion.button>
      </motion.div>
    </section>
    
    </div>
  );
};

export default HomePage;
