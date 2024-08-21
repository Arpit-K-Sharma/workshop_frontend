import React from "react";
import { Button } from "@/components/ui/button";
import Background from "../../gallery/images/Background.jpg";

function Hero() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center p-6 md:p-12 relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-white opacity-60"></div>
      <div className="w-full md:w-1/2 mb-18 md:mb-0 z-10 p-4 md:p-8 mt-[0%] md:mt-[-10%]">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-8">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold mb-2 font-sans text-zinc-800 max-sm:text-5xl">
            Where young minds code their future
          </h1>
        </div>

        <p className="mb-4 md:mb-6 text-base md:text-lg lg:text-2xl mt-2 text-gray-700 font-sans">
          We believe that teaching programming in colleges should be
          personalized, fun, effective, and industry- oriented..
        </p>
        <Button
          size="lg"
          className="bg-buttonColor text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg shadow-lg hover:bg-buttonColor-hover transition duration-300 font-sans"
        >
          Start Studying
        </Button>
      </div>
    </section>
  );
}

export default Hero;
