import React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DetailModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer group">
          <p className="underline text-md text-[#3e70c2] ">Details</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto max-sm:text-sm">
        <DialogHeader>
          <DialogTitle>Course Details</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="html_css">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="html_css">HTML/CSS</TabsTrigger>
            <TabsTrigger value="cybersecurity">Cybersecurity</TabsTrigger>
            <TabsTrigger value="scratch">Scratch</TabsTrigger>
          </TabsList>

          {/* HTML/CSS Content */}
          <TabsContent value="html_css">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-xl font-bold mb-2">HTML/CSS</h3>
              <p className="mb-2">
                HTML is the standard language for creating the structure and
                content of web pages, while CSS is used to style and design the
                appearance. AI enhances web development through automation,
                personalization, and intelligent features like chatbots and
                content recommendations.
              </p>
              <h4 className="font-semibold mt-4 mb-2">Key Topics:</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>HTML Basics: Structure and syntax</li>
                <li>CSS Fundamentals: Selectors and styling</li>
                <li>Responsive Design: Media queries</li>
                <li>
                  AI in Web Development: Introduction to prompting and
                  automation
                </li>
              </ul>
              <h4 className="text-lg font-semibold mt-4 mb-2">
                Learning Outcomes:
              </h4>
              <ul className="list-disc pl-5 mb-4">
                <li>Understand HTML/CSS fundamentals</li>
                <li>Develop problem-solving skills in web development</li>
                <li>Learn basic AI applications in web development</li>
                <li>Build creative web projects using AI</li>
              </ul>
            </motion.div>
          </TabsContent>

          {/* Cybersecurity Content */}
          <TabsContent value="cybersecurity">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-xl font-bold mb-2">Cybersecurity</h3>
              <p className="mb-2">
                Cybersecurity is the practice of protecting systems, networks,
                and data from digital attacks. This module introduces students
                to cybersecurity and how AI can assist in this field. Students
                will gain practical skills to protect digital assets and
                understand cyber threats.
              </p>
              <h4 className="font-semibold mt-4 mb-2">Key Topics:</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>Threat Analysis: Identifying cyber threats</li>
                <li>Network Security: Firewalls and VPNs</li>
                <li>Encryption: Symmetric and asymmetric encryption</li>
                <li>Incident Response: Mitigation strategies</li>
                <li>
                  Cloud and IoT Security: Securing cloud infrastructure and IoT
                  devices
                </li>
              </ul>
              <h4 className="text-lg font-semibold mt-4 mb-2">
                Learning Outcomes:
              </h4>
              <ul className="list-disc pl-5 mb-4">
                <li>Understand cybersecurity fundamentals</li>
                <li>
                  Implement security measures such as strong passwords and 2FA
                </li>
                <li>Navigate the internet safely and responsibly</li>
                <li>Use AI to identify and mitigate security threats</li>
              </ul>
            </motion.div>
          </TabsContent>

          {/* Scratch Content */}
          <TabsContent value="scratch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-xl font-bold mb-2">Scratch</h3>
              <p className="mb-2">
                Scratch is a visual programming language designed to introduce
                children and beginners to coding. This module teaches basic
                programming concepts, creativity, and logical thinking through
                interactive projects.
              </p>
              <h4 className="font-semibold mt-4 mb-2">Key Topics:</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>Basic Programming: Sequences, loops, and conditionals</li>
                <li>Game Design: Developing interactive games</li>
                <li>AI Integration: Using AI to assist with Scratch coding</li>
              </ul>
              <h4 className="text-lg font-semibold mt-4 mb-2">
                Learning Outcomes:
              </h4>
              <ul className="list-disc pl-5 mb-4">
                <li>Understand basic programming concepts using Scratch</li>
                <li>
                  Develop problem-solving skills in game and animation design
                </li>
                <li>
                  Build and share interactive stories, games, and animations
                </li>
              </ul>
            </motion.div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
