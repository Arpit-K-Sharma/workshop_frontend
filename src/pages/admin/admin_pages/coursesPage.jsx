import React, { useState, useEffect } from "react";
import AdminSidebar from "../adminSidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Code, Book, Clock, Info, Plus, Edit } from "lucide-react";
import apiClient from "config/apiClient";

const CourseCard = ({ course, onEdit }) => {
  if (!course) return null; // Add this check to prevent rendering if course is undefined

  return (
    <Card className="overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <Code className="mr-2" size={24} color="#2c5282" />
            {course.course_name}
          </CardTitle>
          <Button
            onClick={() => onEdit(course)}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription className="text-lg font-semibold text-gray-600 flex items-center">
          <Book className="mr-2" size={20} color="#4299e1" />
          {course.course_content}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-start items-center mt-4">
          <span className="text-sm font-medium text-gray-800 flex items-center">
            <Clock className="mr-2" color="#2c5282" size={20} />
            Duration:{" "}
            <span className="text-blue-600 ml-1 font-bold">
              {course.course_duration}
            </span>
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="secondary">
              <Info className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{course.course_name}</DialogTitle>
              <DialogDescription>{course.description}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({
    id: "",
    course_name: "",
    course_content: "",
    course_duration: "",
    description: "",
    logo: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.get("/course");
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCourse = async () => {
    try {
      const response = await apiClient.post("/course", currentCourse);
      setCourses([...courses, response.data.data]);
      setCurrentCourse({
        id: "",
        course_name: "",
        course_content: "",
        course_duration: "",
        description: "",
        logo: "",
      });
      setIsAddDialogOpen(false);
      const fetchCourses = async () => {
        try {
          const response = await apiClient.get("/course");
          setCourses(response.data.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleEditCourse = async () => {
    try {
      const response = await apiClient.put(
        `/course/${currentCourse.id}`,
        currentCourse
      );
      const updatedCourses = courses.map((course) =>
        course.id === currentCourse.id ? response.data.data : course
      );
      setCourses(updatedCourses);
      setIsEditDialogOpen(false);
      const fetchCourses = async () => {
        try {
          const response = await apiClient.get("/course");
          setCourses(response.data.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const openEditDialog = (course) => {
    setCurrentCourse(course);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-10 ml-[220px] xl:ml-[270px]">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Courses
        </h1>
        <div className="mb-8 flex justify-end">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a New Course</DialogTitle>
                <DialogDescription>
                  Fill out the details of the new course below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Course Name"
                  name="course_name"
                  value={currentCourse.course_name}
                  onChange={handleInputChange}
                />
                <Input
                  placeholder="Course Content"
                  name="course_content"
                  value={currentCourse.course_content}
                  onChange={handleInputChange}
                />
                <Input
                  placeholder="Course Duration"
                  name="course_duration"
                  value={currentCourse.course_duration}
                  onChange={handleInputChange}
                />
                <Input
                  placeholder="Description"
                  name="description"
                  value={currentCourse.description}
                  onChange={handleInputChange}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleAddCourse}>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-20">
          {courses &&
            courses.length > 0 &&
            courses.map((course, index) => (
              <CourseCard key={index} course={course} onEdit={openEditDialog} />
            ))}
        </div>
      </div>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update the details of the course below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Course Name"
              name="course_name"
              value={currentCourse.course_name}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Course Content"
              name="course_content"
              value={currentCourse.course_content}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Course Duration"
              name="course_duration"
              value={currentCourse.course_duration}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Description"
              name="description"
              value={currentCourse.description}
              onChange={handleInputChange}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleEditCourse}>Update Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesPage;
