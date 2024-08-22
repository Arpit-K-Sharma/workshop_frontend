import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "gallery/images/DHLogo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleJoinUsClick = () => {
    navigate("/admin");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      x: "100%",
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
    <div className="shadow-xl font-sans">
      <header className="flex px-8 justify-between items-center py-2 bg-white font-sans">
        <div className="flex text-2xl font-bold">
          <img src={logo} alt="Logo" className="w-full" />
        </div>

        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:block text-black mr-10">
            <ul className="flex space-x-[5rem] text-black text-m">
              <li className="cursor-pointer font-sans">Courses</li>
              <li className="cursor-pointer font-sans">About Us</li>
              <li className="cursor-pointer font-sans">Schools</li>
            </ul>
          </nav>

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
            <SheetContent side="right" className="p-0">
              <AnimatePresence>
                {isOpen && (
                  <motion.nav
                    className="flex flex-col space-y-4 mt-8 p-6"
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

          <Button
            className="bg-[#004EFF] hover:bg-joinButton-hover px-8 font-bold py-6 font-sans max-sm:hidden"
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
