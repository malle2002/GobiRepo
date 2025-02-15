import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://s3-media0.fl.yelpcdn.com/bphoto/JA__-yK7g6ic3FGMDMqFZg/348s.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-Fa7n0grToZjcEEOYKunUIZyqZZeCNvWgQ&s",
  "https://www.milofoundation.org/wp-content/uploads/2024/09/20240928130759-1024x1024.jpg",
  "https://dbw3zep4prcju.cloudfront.net/animal/cc7dcfe4-cc5e-440a-a42a-7a5568ba3cbb/image/97aa9bdb-9cfa-4364-80ae-d0bbf9244cd8.jpeg?versionId=ZlYpapxqZTbV4ctxr6Gr1_Q4DA.P0IhO&bust=1738457404&width=300",
  "https://www.animalhumanesociety.org/sites/default/files/styles/scale_width_960/public/media/image/2019-03/Nibbles.jpg?itok=O4MWop0f",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_COGKC2zhKQwAy9e7a25HXNO5p4QCkiRLw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtILetOPjdjnXHFx8VXQIj_H6i3dLil-xWVQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEc54kw-adjI4IgOJKkaKKOQS3t6lvkVx5fQ&s",
];

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(8);

  useEffect(() => {
    const updateItemsPerRow = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerRow(8);
      } else if (window.innerWidth >= 768) {
        setItemsPerRow(4);
      } else if (window.innerWidth >= 648) {
        setItemsPerRow(2);
      } else {
        setItemsPerRow(1);
      }
    };

    updateItemsPerRow();
    window.addEventListener("resize", updateItemsPerRow);
    return () => window.removeEventListener("resize", updateItemsPerRow);
  }, []);

  useEffect(() => {
    if (itemsPerRow < 8) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [itemsPerRow]);

  // Use circular index mapping to ensure smooth infinite loop
  const getVisibleImages = () => {
    return Array.from({ length: itemsPerRow }, (_, i) => images[(currentIndex + i) % images.length]);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div
        className={`grid gap-4`}
        style={{
          gridTemplateColumns: `repeat(${itemsPerRow}, minmax(0, 1fr))`,
        }}
      >
        <AnimatePresence mode="popLayout">
          {getVisibleImages().map((src, index) => (
            <motion.div
              key={src} // Key is now stable
              className="rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
