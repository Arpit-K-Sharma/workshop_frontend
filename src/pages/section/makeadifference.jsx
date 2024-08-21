import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

function MakeADifference() {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Make a difference with
        </h2>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-6">
          teaching from Digital Horizons.
        </h2>
        <p className="text-xl sm:text-2xl text-gray-600 mb-8">
          The future of your education is safe with us.
        </p>
        <Button className="bg-blue-600 text-white text-lg py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300">
          Get Started
        </Button>
      </div>
    </section>
  );
}

export default MakeADifference;
