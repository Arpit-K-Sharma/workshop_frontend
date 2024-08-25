import React from "react";
import {
  UserPlusIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import Component from "../../gallery/Component.svg";

function System() {
  const steps = [
    {
      title: "Invite students",
      description:
        "Register at DigitalHorizons, create a digital classroom, and invite students.",
      icon: UserPlusIcon,
    },
    {
      title: "Monitor",
      description:
        "Follow your students' progress aligned with your curriculum.",
      icon: ChartBarIcon,
    },
    {
      title: "Assess",
      description:
        "Grade students based on their progress throughout the study course.",
      icon: ClipboardDocumentCheckIcon,
    },
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-6xl font-bold text-center text-gray-900 font-sans mb-12">
          Working with our System is simple.
        </h2>
        <img
          src={Component}
          alt="Classroom"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default System;
