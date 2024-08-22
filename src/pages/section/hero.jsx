import React from "react";
import { Button } from "@/components/ui/button";
import Circle from "../../gallery/Circle.svg";

function Hero() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen justify-between items-center p-4 sm:p-6 md:p-12 relative  overflow-hidden">
      <div className="absolute inset-0 "></div>
      {/* Text Section */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 z-10 p-4 md:p-8 mt-4 md:mt-[-10%]">
        <div className="flex flex-col space-y-4">
          <h1 className="text-5xl sm:text-8xl md:text-8xl lg:text-6xl xl:text-7xl font-extrabold lg:mb-8 font-sans text-zinc-800">
            Where young minds code their future
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl lg:mb-14 text-gray-700 font-sans max-w-2xl my-7">
            We believe that teaching programming in colleges should be
            personalized, fun, effective, and industry-oriented.
          </p>
          <div className="mt-4">
            <Button className="bg-buttonColor text-white font-semibold w-[140px] lg:mt-9 text-sm py-2 px-4 rounded-lg shadow-lg hover:bg-buttonColor-hover transition duration-300 font-sans hidden sm:block">
              Start Studying
            </Button>
          </div>
        </div>

        {/* Mobile Image */}
        <div className="w-full flex justify-center items-center mt-8 md:hidden">
          <img
            src={Circle}
            alt="Circle"
            className="w-[60%] h-auto object-contain max-sm:w-full"
          />
        </div>
      </div>

      {/* Desktop Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 hidden md:flex">
        <img
          src={Circle}
          alt="Circle"
          className="w-auto h-auto max-w-[80%] xl:max-w-full object-contain"
        />
      </div>
    </section>
  );
}

export default Hero;
