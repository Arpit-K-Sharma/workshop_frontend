import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentSidebar from "./studentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { baseURL } from "@/utils/axiosInstance";
import { NotebookPen } from "lucide-react";

const AssignmentPage = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const studentId = localStorage.getItem("student_id");
      try {
        const response = await axios.get(
          `${baseURL}/assignments/student/${studentId}`
        );
        setAssignments(response.data.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="flex">
      <StudentSidebar />
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Assignments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="shadow-md">
              <CardHeader>
                <CardTitle>{assignment.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Due Date: {assignment.dueDate}</p>
                <p>Course: {assignment.course}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
