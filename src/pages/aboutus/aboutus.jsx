import Navbar from "pages/navbar/navbar";
import React from "react";

function ChangeGameStory() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-14 max-sm:p-14">
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        {/* Image Section */}
        <div className="md:w-1/2 mb-6 md:mb-0 relative">
          <img
            src="https://via.placeholder.com/400x400"
            alt="Placeholder"
            className="rounded-lg shadow-lg object-cover w-full max-w-md mx-auto"
          />
        </div>
        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue">
            Change the game through a story
          </h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum
          </p>
          <p className="text-gray-600">
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum
          </p>
        </div>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mt-12">
        <h1 className="text-4xl font-sans font-semibold">About Us</h1>
      </div>
      <div className="flex justify-center items-center mt-4">
        <p className="text-lg font-sans mt-2 max-w-2xl text-center">
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
          Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
          Lorem Ipsum
        </p>
      </div>
      <ChangeGameStory />
    </div>
  );
}

export default AboutUs;
