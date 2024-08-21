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

      <Offers />
      <Videos />

      <section
        className="relative h-[300px] object-cover"
        style={{ backgroundImage: `url(${Image5})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-center max-w-5xl px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-6">
              See Us In Action
            </h2>
            <p className="text-base md:text-lg mb-4 md:mb-6">
              Discover a vibrant collection of moments from our educational
              journey. From interactive workshops and inspiring lectures to
              student achievements and community events, each snapshot captures
              the essence of our learning environment. Browse through and get a
              glimpse of the dynamic and engaging experiences that define our
              platform.
            </p>
            <Button
              size="md"
              className="bg-homeText text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-homeText-hover transition duration-300"
            >
              Explore More
            </Button>
          </div>
        </div>
      </section>

      <section className="p-4 md:p-8 bg-gray-100">
        <div className="relative pb-16">
          <Slider {...settings}>
            {carouselImages.map((imageSet, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row justify-between items-center mb-[30px] space-y-4 md:space-y-0 md:space-x-4">
                  <div className="w-full md:w-1/3 space-y-4">
                    <img
                      src={imageSet[0]}
                      alt={`Image ${index * 5 + 1}`}
                      className="w-full h-[150px] md:h-[200px] object-cover rounded-lg"
                    />
                    <img
                      src={imageSet[1]}
                      alt={`Image ${index * 5 + 2}`}
                      className="w-full h-[150px] md:h-[200px] object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-1/3">
                    <img
                      src={imageSet[2]}
                      alt={`Image ${index * 5 + 3}`}
                      className="w-full h-[250px] md:h-[400px] object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-1/3 space-y-4">
                    <img
                      src={imageSet[3]}
                      alt={`Image ${index * 5 + 4}`}
                      className="w-full h-[150px] md:h-[200px] object-cover rounded-lg"
                    />
                    <img
                      src={imageSet[4]}
                      alt={`Image ${index * 5 + 5}`}
                      className="w-full h-[150px] md:h-[200px] object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="p-8">
        <h2 className="text-5xl font-extrabold text-center text-homeText mb-[70px]">
          Meet Our <span className="text-joinButton">Team</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamData.map((member, index) => (
            <div className="flex flex-col items-center" key={member.id}>
              {" "}
              {/* Centering the card */}
              <div className="w-full max-w-[400px] flex flex-col items-center">
                {" "}
                {/* Centering the content */}
                <p className="flex justify-center items-center text-center mb-[20px] text-2xl font-bold text-homeText">
                  {member.name}
                </p>
                <Avatar className="w-[300px] h-[400px] aspect-square flex items-center justify-center">
                  {" "}
                  {/* Centering the image */}
                  <AvatarImage
                    src={member.image}
                    alt={`Team Member ${member.id}`}
                    className="object-cover h-[400px]"
                  />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
              </div>
              <Card
                className={`h-[450px] border-none w-full max-w-[300px] mt-[-160px] overflow-hidden ${
                  index === 1 ? "bg-homeText" : "bg-[#eeeae4]"
                }`}
              >
                <CardHeader className="p-0"></CardHeader>
                <CardContent
                  className={`text-center mt-[180px] ${
                    index === 1 ? "text-white" : ""
                  }`}
                >
                  <h3 className="font-bold text-2xl">{member.position}</h3>
                  <p className="text-lg mt-[25px]">{member.position}</p>
                  <p className="text-lg underline">{member.email}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-8 bg-gray-100 text-center">
        <p>&copy; 2024 Digital Horizon. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
