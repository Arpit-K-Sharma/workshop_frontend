import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "gallery/images/DHLogo.png";
import { Button } from "@/components/ui/button";

function Navbar() {
  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate("/admin");
  };

  return (
    <div className="shadow-xl">
      <header className="flex px-8 justify-between items-center py-2 bg-white ">
        <div className="flex text-2xl font-bold">
          <img src={logo} alt="Logo" className="h-14 w-full" />
        </div>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:block text-black mr-10">
            <ul className="flex space-x-[5rem] text-black text-m">
              <li className="cursor-pointer">Courses</li>
              <li className="cursor-pointer">About Us</li>
              <li className="cursor-pointer">Schools</li>
            </ul>
          </nav>
          <Button
            className="bg-[#004EFF] hover:bg-joinButton-hover px-8 font-bold py-6"
            onClick={handleJoinUsClick}
          >
            Join Us
          </Button>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
