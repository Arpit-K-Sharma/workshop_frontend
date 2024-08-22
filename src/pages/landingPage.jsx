import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "./navbar/navbar";
import Hero from "./section/hero";
import Videos from "./section/videos";
import System from "./section/system";
import Mentors from "./section/mentors";
import MakeADifference from "./section/makeadifference";
import Testimonials from "./section/testimonials";
import Bars from "./section/bars";
import ImageCarousel from "./section/wedo";
import Footer from "footer/footer";
import TestimonialSection from "./section/testimonial1";

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <Navbar />
      <Hero />
      <TestimonialSection />

      <Videos />
      <Bars />

      <System />
      <Mentors />
      <ImageCarousel />
      <MakeADifference />
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
