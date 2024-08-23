import Footer from "footer/footer";
import Navbar from "pages/navbar/navbar";
import MakeADifference from "pages/section/makeadifference";
import Offers from "pages/section/offers";
import React from "react";

function UnlockingOpportunities() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="w-full md:w-1/2 relative">
        <img
          src="https://via.placeholder.com/800x600"
          alt="Educational moment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      </div>

      {/* Text Section */}
      <div
        className="w-full md:w-1/2 text-white p-8 md:p-12 flex flex-col justify-center text-center"
        style={{
          background: "linear-gradient(90deg, #22A7F0 10%, #1E4491 100%)",
        }}
      >
        <h2 className="text-2xl md:text-3xl font-light mb-4">
          UNLOCKING OPPORTUNITIES
        </h2>
        <h3 className="text-xl md:text-3xl font-semibold mb-6">
          WITH OUR PRACTICIONERS
        </h3>
        <p className="text-sm md:text-base mb-4 mt-11">
          Discover a vibrant collection of moments from our educational journey.
        </p>
        <p className="text-sm md:text-base">
          From interactive workshops and inspiring lectures to student
          achievement.
        </p>
      </div>
    </div>
  );
}

function Courses() {
  return (
    <div>
      <Navbar />
      <div className="">
        {/* <h1 className="text-3xl font-bold text-center mb-8">Courses</h1> */}
        <UnlockingOpportunities />
        <Offers />
        <MakeADifference />
        <Footer />
      </div>
    </div>
  );
}

export default Courses;
