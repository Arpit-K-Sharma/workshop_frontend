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
import classroomVideo from "gallery/images/215475.mp4";
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
      <section className="flex flex-col md:flex-row justify-between items-center p-6 md:p-12 bg-white relative min-h-screen overflow-hidden">
        <div className="w-full md:w-1/2 mb-18 md:mb-0 z-10 p-4 md:p-8 mt-[0%] md:mt-[-10%]">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8">
            <h1 className="text-4xl md:text-5xl lg:text-8xl font-extrabold mb-2  text-zinc-800">
              Where young minds code their{" "}
              <span className="text-red-600">future</span>
            </h1>
          </div>

          <p className="mb-4 md:mb-6 text-base md:text-lg lg:text-2xl mt-2 text-gray-700 mt-2">
            We believe that teaching programming in colleges should be
            personalized, fun, effective, and industry- oriented..
          </p>
          <Button
            size="lg"
            className="bg-buttonColor text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg shadow-lg hover:bg-buttonColor-hover transition duration-300"
          >
            Start Learning
          </Button>
        </div>
        <div className="w-full md:w-1/2 md:absolute md:right-0 md:top-0 md:bottom-0 h-full z-20">
          <img
            src={homepage}
            alt="Student studying"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      {/* Stats Section */}
      {/* <section className="p-8 bg-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Video, title: "100+", description: "Video Courses" },
            { icon: Users, title: "500+", description: "Students" },
            { icon: BookOpen, title: "50+", description: "Subjects" },
            { icon: Award, title: "100%", description: "Satisfaction" },
          ].map((stat, index) => (
            <MotionCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              description={stat.description}
              index={index}
            />
          ))}
        </div>
      </section> */}
      <Offers />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center p-4 md:p-8 bg-white relative overflow-hidden">
        <div className="w-full md:w-[40%] z-10 mb-6 md:mb-0">
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-homeText">
            Most Popular <span className="text-joinButton">Courses</span>
          </h1>
          <p className="text-base lg:text-lg mb-6 font-semibold text-gray-700">
            Discover a world of knowledge at your fingertips. Start your
            learning journey today!
          </p>
          <div className="flex flex-wrap space-x-0 md:space-x-2 lg:space-x-4">
            <Button
              size="lg"
              className="bg-homeText rounded-full border mt-2 border-homeText text-primary-foreground hover:bg-homeText"
            >
              UI/UX Design
            </Button>
            <Button
              size="lg"
              className="bg-white rounded-full border mt-2 border-homeText text-black hover:bg-homeText hover:text-white"
            >
              Python/Django
            </Button>
            <Button
              size="lg"
              className="bg-white rounded-full border mt-2 border-homeText text-black hover:bg-homeText hover:text-white"
            >
              JavaScript/React
            </Button>
          </div>
        </div>
        <div className="w-full md:w-[60%] mt-6 md:mt-0">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <motion.img
              src={Teaching}
              alt="Digital Learning"
              className="w-full md:w-1/2 h-[200px] md:h-[300px] rounded-lg mb-4 md:mb-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <div className="w-full md:w-1/2 flex flex-col space-y-2">
              <motion.img
                src={Image2}
                alt="Digital Learning"
                className="w-full rounded-lg object-cover h-[100px] md:h-[150px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <motion.img
                src={Image3}
                alt="Digital Learning"
                className="w-full rounded-lg object-cover h-[100px] md:h-[150px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <video
          className="w-full h-[400px] object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={classroomVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className="flex flex-col md:flex-row mb-[10px] items-center p-10 mt-[5px] bg-background">
        <div className="w-full md:w-1/2 md:pr-8">
          <img
            src={Image1}
            alt="Classroom"
            className="rounded-lg w-full  h-[350px] object-cover shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8">
          <h2 className="text-[45px] font-extrabold text-homeText">
            Our Commitment to <span className="text-joinButton">Education</span>
          </h2>
          <p className="text-lg font-bold mb-4 mt-4">
            Empowering minds through innovative and accessible learning
            experiences.
          </p>
          <p className="text-base font-semibold">
            We are dedicated to transforming the way education is delivered and
            experienced. Our mission is to create a dynamic and inclusive
            learning environment that empowers students to reach their full
            potential. With a team of passionate educators and innovative
            thinkers, we offer a diverse range of courses and resources designed
            to inspire curiosity and foster lifelong learning.{" "}
          </p>
        </div>
      </section>

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
