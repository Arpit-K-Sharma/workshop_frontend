import React from "react";
import {
  UserPlusIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

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
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 font-sans mb-12">
          Working with our System is simple.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <step.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 font-sans mb-2">
                {step.title}
              </h3>
              <p className="text-zinc-900 font-sans">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default System;
