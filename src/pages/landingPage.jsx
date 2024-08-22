import React from "react";
import MotionCard from "@/components/ui/motionCard";
import { Video, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "gallery/images/logo.png";
import homepage from "gallery/images/homepage.png";
import { motion } from "framer-motion";
import Image2 from "gallery/images/pexels-august-de-richelieu-4260323 2.png";
import Image1 from "gallery/images/pexels-max-fischer-5212340 1.png";
import Image3 from "gallery/images/pexels-julia-m-cameron-4145354 1.png";

import Image4 from "gallery/images/pexels-john-fischer-5212695.png";
import Image5 from "gallery/images/ai-generated-8663328.png";
import Image6 from "gallery/images/abstract-blur-restaurant-interior 1.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  FaVideo,
  FaBook,
  FaUsers,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import Person1 from "gallery/images/person1.png";
import Person2 from "gallery/images/person2.png";
import Person3 from "gallery/images/person3.png";
import Person4 from "gallery/images/person4.png";
import Student from "gallery/images/student.png";
import Teaching from "gallery/images/teaching-810.jpg";
import Blur from "gallery/images/blur.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/navbar";
import Offers from "./section/offers";
import Hero from "./section/hero";
import Videos from "./section/videos";
import System from "./section/system";
import Mentors from "./section/mentors";
import MakeADifference from "./section/makeadifference";
import Testimonials from "./section/testimonials";
import Bars from "./section/bars";
import ImageCarousel from "./section/wedo";
import Footer from "footer/footer";
const Counter = ({ endValue }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / endValue));
    let currentCount = 0;

    const interval = setInterval(() => {
      if (currentCount < endValue) {
        currentCount += 1;
        setCount(currentCount);
      } else {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [endValue]);

  return <motion.p className="font-bold text-2xl">{count}+</motion.p>;
};

const LandingPage = () => {
  const carouselImages = [
    [Image1, Image2, Image3, Teaching, Image5],
    [Image5, Image1, Image2, Image3, Teaching],
  ];

  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate("/admin"); // This will navigate to the admin dashboard
  };

  const CustomPrevArrow = ({ onClick }) => (
    <div
      className="bg-homeText hover:bg-homeText-hover rounded-full p-2 flex items-center justify-center absolute bottom-[-35px] right-[30%] md:right-[13%] lg:right-[10%] transform -translate-x-[-50px] cursor-pointer z-10"
      onClick={onClick}
    >
      <ChevronLeft className="text-white" size={24} />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div
      className="bg-homeText hover:bg-homeText-hover rounded-full p-2 flex items-center justify-center absolute bottom-[-35px] right-[12%] md:right-[5%] lg:right-[5%] transform translate-x-[50px] cursor-pointer z-10"
      onClick={onClick}
    >
      <ChevronRight className="text-white" size={24} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    arrows: true,
  };

  const teamData = [
    {
      id: 1,
      name: "Arpit Sharma",
      position: "UI/UX Designer",
      email: "arpit@gmail.com",
      image: Person1,
    },
    {
      id: 2,
      name: "Sita Sharma",
      position: "Frontend Developer",
      email: "sita@example.com",
      image: Person2,
    },
    {
      id: 3,
      name: "Gita Sharma",
      position: "Backend Developer",
      email: "gita@example.com",
      image: Person3,
    },
    {
      id: 4,
      name: "Alica Sharma",
      position: "Project Manager",
      email: "alica@example.com",
      image: Person4,
    },
  ];
  return (
    <div className="font-sans">
      {/* Header */}
      <Navbar />
      <Hero />

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
