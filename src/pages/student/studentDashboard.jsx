import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentSidebar from "./studentSidebar";
import ProfilePicture from "../../gallery/Mentor.jpg";
import { baseURL } from "@/utils/axiosInstance";
import Assignments from "assets/Assignments.svg";
import { ArrowUpRight } from "lucide-react";
import Attendance from "assets/Attendance.svg";
import Courses from "assets/Courses.svg";
import FirstTimeLoginDialog from "pages/authentication/FirstTimeLoginDialog";
import { Star } from "lucide-react";
import RoundedProfilePicture from "userDefined_components/profileimage/RoundedProfileImage";
import EnrolledCoursesModal from "./enrolledCoursesModal";
import CourseDetailsDialog from "./DetailModal";
import DetailModal from "./DetailModal";

const StudentDashboard = () => {
  const [classData, setClassData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [showCourseDetails, setShowCourseDetails] = useState(false);

  const [studentData, setStudentData] = useState({
    id: "",
    student_name: "",
    age: "",
    phone_num: "",
    student_email: "",
    address: "",
  });
  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(false);
  const [student_id, setStudent_id] = useState("");

  useEffect(() => {
    const is_password_changed = localStorage.getItem("is_password_changed");
    if (!is_password_changed || is_password_changed === "false") {
      setIsFirstTimeLogin(true);
    }
  }, []);

  const handleFirstTimeLoginClose = () => {
    setIsFirstTimeLogin(false);
    console.log("Password changed and logged in successfully");
  };

  useEffect(() => {
    const fetchData = async () => {
      const studentId = localStorage.getItem("student_id");
      if (!studentId) {
        console.error("Student ID not found in localStorage");
        return;
      }
      setStudent_id(studentId);

      try {
        const studentResponse = await axios.get(
          `${baseURL}/student/${studentId}`
        );
        const studentData = studentResponse.data.data;
        setStudentData(studentData);

        if (studentData?.class_id) {
          const classResponse = await axios.get(
            `${baseURL}/class/${studentData.class_id}`
          );
          setClassData(classResponse.data.data);

          const assignmentsResponse = await axios.get(
            `${baseURL}/assignments/class/${studentData.class_id}`
          );
          setAssignments(assignmentsResponse.data);
        }
        const coursePromises = studentResponse.data.data.course_id.map(
          (courseId) => axios.get(`${baseURL}/course/${courseId}`)
        );
        const courseResponses = await Promise.all(coursePromises);
        setCoursesData(courseResponses.map((response) => response.data.data));
        const feedbackResponse = await axios.get(
          `${baseURL}/feedback/for/${studentId}`
        );
        const feedbacksWithTeachers = await Promise.all(
          feedbackResponse.data.data.map(async (feedback) => {
            const teacherResponse = await axios.get(
              `${baseURL}/teacher/${feedback.feedback_by}`
            );
            return {
              ...feedback,
              teacherName: teacherResponse.data.data.name,
            };
          })
        );
        setFeedbacks(feedbacksWithTeachers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalEnrolledCourses = studentData?.course_id?.length || 0;
  const totalStudents = classData?.students?.length || 0;
  const totalTeachers = classData?.teachers?.length || 0;
  const totalCourses = classData?.courses?.length || 0;

  const presentClasses =
    attendanceData?.attendances.filter((a) => a.status === "present").length ||
    0;
  const totalClasses = attendanceData?.attendances.length || 0;

  return (
    <div className="flex h-screen bg-[#EAEFFB]">
      <StudentSidebar />
      <div className="flex-1 overflow-auto p-10 relative">
        <h1 className="text-3xl font-semibold mb-10 text-gray-900">
          Hello, look through your Dashboard
        </h1>
        <div className="grid grid-cols-4 gap-8 mb-8 ">
          <div className="flex flex-col ">
            <p className="text-heading font-black text-[#34486B] text-center">{`${presentClasses}/${totalClasses}`}</p>
            <h2 className="text-subtitle font-medium mt-1 text-[#6C6C6C] text-center">
              Attendance this month
            </h2>
          </div>

          <div className="flex flex-col">
            <p className="text-heading font-black text-[#34486B] text-center">{`${totalStudents}`}</p>
            <h2 className="text-subtitle font-medium mt-1 text-[#6C6C6C] text-center">
              Total Students in class
            </h2>
          </div>

          <div className="flex flex-col ">
            <p className="text-heading font-bold text-[#34486B] text-center">
              {assignments.length}
            </p>
            <h2 className="text-subtitle font-medium mt-1 text-[#6C6C6C] text-center">
              Assignments
            </h2>
          </div>

          <div className="flex flex-col items-center relative">
            <div className="h-screen w-screen fixed left-3/4 top-0 z-10">
              <div className="h-full bg-gray-300 w-[2px]"></div>
            </div>
            <RoundedProfilePicture
              profilePicture={studentData?.profile_picture}
              studentName={studentData?.student_name}
            />

            <h2 className="text-3xl font-bold  mt-2 text-center">
              {studentData?.student_name}
            </h2>
            <div className="mt-12 absolute top-40 w-full ">
              <h3 className="text-subheading font-semibold text-2xl w-[290px] mb-5 text-center mt-2 text-semibold">
                Assignments Given
              </h3>
              <div className="space-y-4 w-full">
                {assignments.length > 0 ? (
                  assignments.map((assignment, index) => (
                    <React.Fragment key={assignment._id}>
                      {index > 0 && (
                        <hr className="my-4 border-gray-200 w-full" />
                      )}
                      <div className="pb-4">
                        <h4 className="text-md font-bold">
                          {assignment.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {assignment.description}
                        </p>
                        <p className="text-sm text-gray-800 mt-2 font-semibold ">
                          Due:
                          {new Date(assignment.start_date).toLocaleDateString(
                            "en-US",
                            { month: "long", day: "numeric" }
                          )}{" "}
                          -- Assigned:
                          {new Date(assignment.end_date).toLocaleDateString(
                            "en-US",
                            { month: "long", day: "numeric" }
                          )}
                        </p>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <p className="text-gray-600 text-center">
                    <span className="grid mt-20">
                      <span> Assignments</span>{" "}
                      <span className="mt-4">will</span>{" "}
                      <span className="mt-4">be </span>{" "}
                      <span className="mt-4">shown </span>{" "}
                      <span className="mt-4">here</span>
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <h2 className=" text-subheading font-semibold mb-4 text-gray-900 flex flex-row items-center">
              {/* Enrolled Courses */}
              <EnrolledCoursesModal coursesData={coursesData} />
              {/* <ArrowUpRight className="ml-2 h-8 w-8" /> */}
            </h2>
          </div>
          <div className="col-span-1 md:col-span-2">
            <div className="flex overflow-x-auto scrollbar-hide space-x-4 max-h-[400px]">
              {coursesData.length > 0 ? (
                coursesData.map((course, index) => (
                  <div
                    key={course.id}
                    className="border-r-2 mr-4 border-[#77787a]  pr-4 last:border-0 w-[300px] shrink-0"
                  >
                    <h3 className="text-lg font-bold">{course.course_name}</h3>
                    <p className="text-md text-[#9e9fa2] mt-3 mb-3 font-semibold">
                      Duration: {course.course_duration}
                    </p>
                    <p className="text-md text-[#9e9fa2] mt-3 mb-3 font-semibold">
                      Content: {course.course_content}
                    </p>
                    <DetailModal />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No Courses Assigned</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <h2 className="text-subheading font-semibold mb-4 text-gray-900 mt-16">
            Feedbacks from mentors
          </h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 pb-4">
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                  <>
                    <div className="flex">
                      <div
                        key={feedback.id}
                        className=" rounded-lg p-4 w-[440px] flex-shrink-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-lg font-semibold mt-4 mb-4">
                            {feedback.feedback_title}
                          </p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                className={`h-5 w-5 ${
                                  index < feedback.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-md text-[#6c6c6c] font-semibold mb-8">
                          {feedback.feedback_description}
                        </p>
                        <div className="flex justify-between items-center mt-2 mb-1">
                          <p className="text-sm text-gray-600">
                            {new Date(
                              feedback.feedback_date
                            ).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-sm font-semibold">
                            {feedback.teacherName}
                          </p>
                        </div>
                      </div>
                      <div className="h-[90%] w-[1px] bg-black ml-4"></div>
                    </div>
                  </>
                ))
              ) : (
                <p className="text-gray-600">There are no feedbacks</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isFirstTimeLogin && (
        <FirstTimeLoginDialog
          isOpen={isFirstTimeLogin}
          onClose={handleFirstTimeLoginClose}
          studentId={student_id}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
