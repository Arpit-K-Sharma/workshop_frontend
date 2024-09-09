import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "@/utils/axiosInstance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "config/apiClient";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import StudentSidebar from "./studentSidebar";
import { Check, X } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { baseURL } from "@/utils/axiosInstance";

const StudentAttendance = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [course, setCourse] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedRemarks, setSelectedRemarks] = useState("");

  const [studentData, setStudentData] = useState({
    id: "",
    student_name: "",
    age: "",
    phone_num: "",
    student_email: "",
    address: "",
    studentId: "",
    profile_picture: "",
  });

  const fetchStudentData = async () => {
    const student_id = localStorage.getItem("student_id");
    try {
      const response = await axios.get(`${baseURL}/student/${student_id}`);
      const { data } = response.data;
      setStudentData({
        student_name: data.student_name,
        age: data.age,
        phone_num: data.phone_num,
        student_email: data.student_email,
        address: data.address,
        school_id: data.school_id,
        course_id: data.course_id,
        class_id: data.class_id,
        studentId: data.studentId,
        profile_picture: data.profile_picture,
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const studentResponse = await apiClient.get(`/student/${studentId}`);
          setStudent(studentResponse.data.data);
          let classid = studentResponse.data.data.class_id;

          if (classid && classid.length > 0) {
            const attendanceResponse = await apiClient.get(
              `/attendances/student/${studentId}/class/${classid}/month/${selectedYear}/${selectedMonth
                .toString()
                .padStart(2, "0")}`
            );
            setAttendance(attendanceResponse.data.data.attendances);
          }

          if (
            studentResponse.data.data.course_id &&
            studentResponse.data.data.course_id.length > 0
          ) {
            const courseResponse = await apiClient.get(
              `/course/${studentResponse.data.data.course_id[0]}`
            );
            setCourse(courseResponse.data.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    },
    [studentId, selectedMonth, selectedYear],
    fetchStudentData()
  );

  if (!student) {
    return <LoadingSpinner />;
  }

  const generateMonthDates = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month - 1, i + 1);
      return date.toISOString().split("T")[0];
    });
  };

  const monthDates = generateMonthDates(selectedYear, selectedMonth);

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const years = Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i);

  return (
    <div className="flex h-screen">
      <StudentSidebar />
      <div className="flex-1 p-8 bg-[#EAEFFB] flex flex-col">
        <div className="flex justify-between items-center pl-8 pr-16">
          <div>
            <h1 className="font-bold text-sm text-[#303030]">Coding 10A</h1>
            <h1 className="text-3xl font-bold mb-4 mt-2">
              {" "}
              {studentData.student_name}
            </h1>
          </div>
          <div>
            <h1 className="text-[#7189B2]">Attendance History</h1>
          </div>
        </div>
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader className="flex-shrink-0">
            <div className="flex space-x-4 mt-4">
              <div>
                <Select
                  value={selectedMonth.toString()}
                  onValueChange={(value) => setSelectedMonth(parseInt(value))}
                >
                  <SelectTrigger className="w-[150px] bg-[#EAEFFB] border-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem
                        key={month.value}
                        value={month.value.toString()}
                      >
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="w-[90%] ml-2 h-[2px] bg-[#B9B9B9]"></div>
              </div>
              <div>
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                  className="border border-black"
                >
                  <SelectTrigger className="w-[150px] bg-[#EAEFFB] border-none ">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="w-[90%] ml-2 h-[2px] bg-[#B9B9B9]"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="">
                      <TableHead className=" w-1/4">Date</TableHead>
                      <TableHead className="text-center w-1/4">
                        <span className="pr-6"> Attendance</span>
                      </TableHead>
                      <TableHead className="text-center w-1/4">
                        Remarks
                      </TableHead>
                      <TableHead className="text-center w-1/4">
                        Laptop Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
              </div>
              <div className="overflow-y-auto flex-1">
                <Table>
                  <TableBody>
                    {monthDates.map((date) => {
                      const attendanceRecord = attendance.find(
                        (record) => record.date === date
                      );
                      return (
                        <TableRow key={date}>
                          <TableCell className=" w-1/4 p-6 pl-4 ">
                            {date}
                          </TableCell>
                          <TableCell className="text-center w-1/4 ${}">
                            {attendanceRecord ? attendanceRecord.status : "N/A"}
                          </TableCell>
                          <TableCell className="text-center w-1/4">
                            <div className="w-[300px] mx-auto truncate">
                              {(attendanceRecord?.remarks && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <button
                                      className="hover:underline focus:outline-none truncate w-full text-left"
                                      onClick={() =>
                                        setSelectedRemarks(
                                          attendanceRecord.remarks
                                        )
                                      }
                                    >
                                      {attendanceRecord.remarks}
                                      <div className="w-full h-[1px] bg-black"></div>
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogTitle>Full Remarks</DialogTitle>
                                    <p>{selectedRemarks}</p>
                                    <DialogClose />
                                  </DialogContent>
                                </Dialog>
                              )) || (
                                <>
                                  {"N/A"}
                                  <div className="w-full h-[1px] bg-black"></div>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center w-1/4">
                            {attendanceRecord ? (
                              attendanceRecord.laptop ? (
                                <Check className="text-[#34486b]" />
                              ) : (
                                <X className="text-[#740000]" />
                              )
                            ) : (
                              "---"
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentAttendance;
