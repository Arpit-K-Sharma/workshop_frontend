import React from "react";
import { Button } from "@/components/ui/button";
import { User, BookOpen, Calendar, GraduationCap, LogOut } from "lucide-react";
import logo from "gallery/images/logo.png";
import { useNavigate } from "react-router-dom";

const StudentSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="w-56 h-screen bg-homeText text-white shadow-lg font-archivo">
      <div className="p-4 flex items-center justify-center flex-col">
        <div className="mb-6">
          <img
            src={logo}
            alt="Digital Horizon"
            className="h-full w-full rounded-lg cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <nav className="flex-grow overflow-y-auto w-full">
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Classes
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
          >
            <GraduationCap className="mr-2 h-5 w-5" />
            Courses
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Academic Calendar
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
          >
            <User className="mr-2 h-5 w-5" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>
    </aside>
  );
};

export default StudentSidebar;
