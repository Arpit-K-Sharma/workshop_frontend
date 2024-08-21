import React from "react";
import classroomVideo from "../../gallery/images/215475.mp4";

function Videos() {
  return (
    <section className="w-full relative">
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
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center font-sans z-10">
          Our Commitment to Education
        </h2>
      </div>
    </section>
  );
}

export default Videos;
