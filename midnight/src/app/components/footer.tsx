import React from 'react';  // js bibl priekš lietotāju interfeisa

// React FC fukcionālais komponents(tipa definīcija, piem auto piev. children)
// Footer komponente
const Footer: React.FC = () => {
  return (
    // Footer sadaļa ar stilu un satura centru py=top,bot padding; bordertopwidth
    <footer className="py-4 bg-gray-100 text-center border-t border-gray-200">
      {/* Saites uz Facebook un Instagram */}
      <div className="mb-4">
        <a
          href="https://www.facebook.com/midnightrunnerslatvija"
          target="_blank" // Atver jaunu logu
          rel="noopener noreferrer" // Drošības iestatījumi
          className="mx-2 text-gray-700 hover:underline" // mx-sanu margin
        >
          Facebook
        </a>
        <a
          href="https://instagram.com/midnightrunnerslatvija"
          target="_blank" // Atver jaunu logu
          rel="noopener noreferrer" // Drošības iestatījumi
          className="mx-2 text-gray-700 hover:underline" // mx-sanu margin
        >
          Instagram
        </a>
      </div>
      <div className="text-sm text-gray-600">
        <p>Developer: Baalais</p> {/* Izstrādātāja informācija */}
      </div>
    </footer>
  );
};

export default Footer;