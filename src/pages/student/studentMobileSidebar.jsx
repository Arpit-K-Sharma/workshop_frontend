import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  User,
  Calendar,
  NotebookPen,
  LogOut,
  Home,
  Menu,
  ChevronRight,
  History,
} from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "gallery/Logo.png";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/student" },
  { icon: Calendar, label: "Academic Calendar", path: "/student/calendar" },
  { icon: History, label: "Attendance History", path: "/student/attendances" },
  { icon: NotebookPen, label: "Assignments", path: "/student/assignment" },
  { icon: User, label: "Profile", path: "/student/profile" },
];

const MobileSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access_token");
    localStorage.removeItem("student_id");
    localStorage.removeItem("is_password_changed");
    navigate("/");
  };

  const MenuItem = ({ item, onClick }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: menuItems.indexOf(item) * 0.1 }}
      className="mb-4" // Add margin bottom for gap between items
    >
      <Button
        variant="ghost"
        className={`w-full justify-between p-4 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out rounded-lg ${
          window.location.pathname === item.path
            ? "bg-[#EAEFFB] text-[#34486B] hover:bg-[#EAEFFB] hover:text-[#34486B]"
            : ""
        }`}
        onClick={() => onClick(item.path)}
      >
        <div className="flex items-center">
          <item.icon className="mr-3 h-5 w-5" />
          {item.label}
        </div>
      </Button>
    </motion.div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed top-4 left-4 z-50"
        >
          <Menu className="h-6 w-6 text-[#34486B]" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[280px] bg-white font-semibold text-zinc-800 p-0 overflow-y-auto"
      >
        <motion.nav
          className="flex flex-col h-full"
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-6 flex justify-center items-center">
            <img
              src={logo}
              alt="Digital Horizon"
              className="h-32 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="flex-1 py-6 px-4">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                item={item}
                onClick={(path) => navigate(path)}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4"
          >
            <Button
              variant="ghost"
              className="w-full justify-between p-4 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out rounded-lg"
              onClick={handleLogout}
            >
              <div className="flex items-center">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
