import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSwipeable } from "react-swipeable";

const images = [
  "https://via.placeholder.com/800x400?text=Image+1",
  "https://via.placeholder.com/800x400?text=Image+2",
  "https://via.placeholder.com/800x400?text=Image+3",
  "https://via.placeholder.com/800x400?text=Image+4",
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden p-14">
      <CardContent className="p-0">
        <div className="relative" {...handlers}>
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    Everything
                  </h2>
                  <p className="text-xl md:text-2xl lg:text-3xl">
                    we do in a single place
                  </p>
                </div> */}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center space-x-2 py-4 bg-gray-100">
          {images.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-3 h-3 rounded-full p-0 ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCarousel;
