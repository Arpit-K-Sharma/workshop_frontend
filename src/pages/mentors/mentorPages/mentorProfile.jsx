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
import ProfilePictureAvatar from "../../../userDefined_components/profileimage/ProfileImage";

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
    <div className="flex h-screen bg-[#EAEFFB]">
      <MentorSidebar />
      <main className="flex-1 overflow-auto p-6 ml-56">
        <div className="flex">
          <Card className="bg-transparent w-2/3 mr-6">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-12 text-[#34486B]">
                Mentor Profile
              </h1>
              <div className="flex justify-between items-start">
                <div>
                  <ProfilePictureAvatar
                    profilePicture={teacher.profile_picture}
                    studentName={teacher.name}
                    className="w-24 h-24 mb-10"
                  />
                  <h2 className="text-heading font-bold text-[#34486B] mt-5 mb-2">
                    {teacher.name}
                  </h2>
                  <p className="text-[#6C6C6C] mb-4">{teacher.username}</p>
                  <div className="space-y-2">
                    <p className="flex items-center text-[#6C6C6C]">
                      {teacher.email}
                    </p>
                    <hr className="border-t border-gray-300 my-2" />

                    <p className="flex items-center text-[#6C6C6C]">
                      {teacher.phone_num}
                    </p>
                    <hr className="border-t border-gray-300 my-2" />

                    <p className="flex items-center text-[#6C6C6C]">
                      {teacher.address}
                    </p>
                    <hr className="border-t border-gray-300 my-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="w-1/3 space-y-6">
            <Card className="bg-transparent ">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#34486B]">
                  Schools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-[#6C6C6C]">
                    <School className="mr-2 h-5 w-5" /> Siddhartha Vanasthali
                    Institute
                  </li>
                  <li className="flex items-center text-[#6C6C6C]">
                    <School className="mr-2 h-5 w-5" /> Saurdeep Boarding School
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#34486B]">
                  Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-[#6C6C6C]">
                    <BookOpen className="mr-2 h-5 w-5" /> Coding 10A
                  </li>
                  <li className="flex items-center text-[#6C6C6C]">
                    <BookOpen className="mr-2 h-5 w-5" /> Scratch 10A
                  </li>
                  <li className="flex items-center text-[#6C6C6C]">
                    <BookOpen className="mr-2 h-5 w-5" /> Cyber security 10A
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndividualMentor;
