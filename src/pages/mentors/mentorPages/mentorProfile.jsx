import React, { useState, useEffect } from "react";
import apiClient from "config/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";
import {
  User,
  Phone,
  Home,
  School,
  BookOpen,
  Mail,
  MapPin,
  AlertCircle,
} from "lucide-react";
import MentorSidebar from "../mentorSidebar";
import ProfilePictureAvatar from "../../../userDefined_components/profileimage/ProfileImage"

const IndividualMentor = () => {
  const mentorId = localStorage.getItem("teacher_id");
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await apiClient.get(`/teacher/${mentorId}`);
        setTeacher(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch teacher data");
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [mentorId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl font-semibold mb-8">Error</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <MentorSidebar />
      <main className="flex-1 overflow-auto p-6 ml-56">

        <Card className=" bg-gray-100 border-none shadow-none mx-auto w-full md:w-96 lg:w-1/2 ">
          <CardContent className="p-6">
            
            <CardHeader className="text-[#353535]">
              <div className="flex mx-auto items-center space-x-4 ">
                <div>
                  <CardTitle className="text-7xl mt-5 ">
                    {teacher.name}
                  </CardTitle>
                </div>
              </div>
              <div className="flex mx-auto items-center space-x-4  mt-[15px]">
                <div>
                  <CardTitle className="text-xl mt-1 text-[#607496]">
                    {teacher.username}
                  </CardTitle>
                </div>
              </div>
              <div className="flex mx-auto items-center space-x-4 ">
                <div>
                  <CardTitle className="text-xl  text-[#8B8C8E]">
                  {teacher.phone_num}
                  </CardTitle>
                </div>
              </div>
              <div className="flex mx-auto items-center space-x-4 ">
                <div>
                  <CardTitle className="text-xl text-[#8B8C8E]">
                  {teacher.address}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <div className="flex justify-center ">
            <ProfilePictureAvatar
              profilePicture={teacher.profile_picture}
              studentName={teacher.name}
            />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IndividualMentor;
   