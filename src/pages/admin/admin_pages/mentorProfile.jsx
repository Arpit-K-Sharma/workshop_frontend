import React, { useState, useEffect } from "react";
import AdminSidebar from "../adminSidebar";
import apiClient from "config/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
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
  Edit,
} from "lucide-react";
import DisplayProfile from "userDefined_components/profileimage/ProfileImage";
import ProfilePictureAvatar from "pages/mentors/mentorPages/profilePictureAvator";
import { Button } from "@/components/ui/button";

const MentorProfile = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [schoolsData, setSchoolsData] = useState({});
  const [classesData, setClassesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await apiClient.get(`/teacher/${mentorId}`);
        setTeacher(response.data.data);
        await fetchSchoolsAndClassesData(response.data.data.schools);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch teacher data");
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [mentorId]);

  const fetchSchoolsAndClassesData = async (schools) => {
    const schoolPromises = schools.map((school) =>
      getSchoolData(school.school_id)
    );
    const schoolsData = await Promise.all(schoolPromises);

    const classPromises = schools.flatMap((school) =>
      school.classes.map((classId) => getClassData(classId))
    );
    const classesData = await Promise.all(classPromises);

    setSchoolsData(
      Object.fromEntries(schoolsData.map((school) => [school.id, school]))
    );
    setClassesData(
      Object.fromEntries(
        classesData.map((classData) => [classData.id, classData])
      )
    );
  };

  const getSchoolData = async (schoolId) => {
    const response = await apiClient.get(`/school/${schoolId}`);
    return response.data.data;
  };

  const getClassData = async (classId) => {
    const response = await apiClient.get(`/class/${classId}`);
    return response.data.data;
  };

  const handleEdit = () => {
    navigate(`/admin/edit-mentor/${mentorId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6 ml-56">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Mentor Profile</h1>
            <Button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="shadow-lg">
              <CardContent className="flex flex-col items-center">
                <ProfilePictureAvatar
                  profilePicture={teacher?.profile_picture}
                  studentName={teacher?.username}
                />
                <h2 className="text-2xl font-semibold mb-4">{teacher.name}</h2>
                <ul className="w-full">
                  <li className="flex items-center mb-2">
                    <User className="mr-2 w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-semibold">Username</p>
                      <p>{teacher.username}</p>
                    </div>
                  </li>
                  <li className="flex items-center mb-2">
                    <Phone className="mr-2 w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p>{teacher.phone_num}</p>
                    </div>
                  </li>
                  <li className="flex items-center mb-2">
                    <Home className="mr-2 w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p>{teacher.address}</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="col-span-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <School className="mr-2 w-6 h-6 text-blue-600" />
                  Schools and Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teacher.schools.length > 0 ? (
                  teacher.schools.map((school, index) => (
                    <div key={school.school_id} className="mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-4">
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">
                          {schoolsData[school.school_id]?.school_name ||
                            `School ID: ${school.school_id}`}
                        </h3>
                        <div className="flex items-center mb-2">
                          <Mail className="mr-2 w-4 h-4 text-gray-600" />
                          <p>{schoolsData[school.school_id]?.email}</p>
                        </div>
                        <div className="flex items-center mb-4">
                          <MapPin className="mr-2 w-4 h-4 text-gray-600" />
                          <p>{schoolsData[school.school_id]?.address}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h4 className="text-lg font-semibold mb-2 flex items-center">
                          <BookOpen className="mr-2 w-5 h-5 text-gray-600" />{" "}
                          Classes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {school.classes.map((classId) => (
                            <span
                              key={classId}
                              className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                            >
                              {classesData[classId]?.class_name ||
                                `Class ${classId}`}
                            </span>
                          ))}
                        </div>
                      </div>
                      {index < teacher.schools.length - 1 && (
                        <hr className="my-4 border-t-2 border-gray-300" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-lg text-gray-600">
                      No schools and classes were assigned to you.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MentorProfile;
