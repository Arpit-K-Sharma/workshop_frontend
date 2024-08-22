import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "gallery/Logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleJoinUsClick = () => {
    navigate("/admin");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        // Mobile breakpoint
        setIsSticky(window.scrollY > 0);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <div className={`shadow-xl font-sans ${isSticky ? "md:relative" : ""}`}>
      <header
        className={`flex px-4 justify-between items-center bg-white font-sans ${
          isSticky ? "fixed top-0 left-0 right-0 z-50 md:relative" : ""
        }`}
      >
        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="none" size="icon" onClick={toggleMenu}>
              <motion.div
                animate={isOpen ? "open" : "closed"}
                className="relative w-6 h-6"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full h-0.5 bg-black"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full h-0.5 bg-black top-2.5"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full h-0.5 bg-black top-5"
                />
              </motion.div>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <AnimatePresence>
              {isOpen && (
                <motion.nav
                  className="flex flex-col space-y-4 mt-8 p-6 "
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                >
                  {["Dashboard", "Courses", "About Us", "Schools"].map(
                    (item, index) => (
                      <motion.a
                        key={item}
                        href="#"
                        className="text-lg font-sans"
                        onClick={
                          item === "Dashboard" ? handleJoinUsClick : undefined
                        }
                        variants={menuItemVariants}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item}
                      </motion.a>
                    )
                  )}
                </motion.nav>
              )}
            </AnimatePresence>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex-1 flex justify-center md:justify-start">
          <img
            src={logo}
            alt="Logo"
            className="h-auto max-w-[182px] md:max-w-[230px]"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block text-black mr-10">
          <ul className="flex space-x-[5rem] text-black text-m">
            <li className="cursor-pointer font-sans">Courses</li>
            <li className="cursor-pointer font-sans">About Us</li>
            <li className="cursor-pointer font-sans">Schools</li>
          </ul>
        </nav>

        {/* Join Us Button */}
        <Button
          className="bg-[#004EFF] hover:bg-joinButton-hover px-4 md:px-8 font-bold py-2 md:py-6 font-sans text-sm md:text-base"
          onClick={handleJoinUsClick}
        >
          Join Us
        </Button>
      </header>
    </div>
  );
}

export default Navbar;
