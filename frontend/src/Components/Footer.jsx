import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-gray-400 py-12">
      <div className="container mx-auto px-8">
        {/* Grid Section - Add your footer columns here if needed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Example column */}
          <div>
            <h4 className="text-white font-semibold mb-2">CloudKeep</h4>
            <p>Secure. Reliable. Fast.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Links</h4>
            <ul>
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <p>support@cloudkeep.app</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
          <p>© 2025 CloudKeep. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
