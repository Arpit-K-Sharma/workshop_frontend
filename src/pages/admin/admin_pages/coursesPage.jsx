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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Code, Book, Clock, Info, Plus, Edit, Trash2 } from "lucide-react";
import apiClient from "config/apiClient";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";
const CourseCard = ({ course, onEdit, onDelete }) => {
  if (!course) return null;

  return (
    <Card className="overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <Code className="mr-2" size={24} color="#2c5282" />
            {course.course_name}
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              onClick={() => onEdit(course)}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onDelete(course)}
              variant="outline"
              size="icon"
              className="rounded-full text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [currentCourse, setCurrentCourse] = useState({
    id: "",
    course_name: "",
    course_content: "",
    course_duration: "",
    description: "",
    logo: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true); // Start loading
    try {
      const response = await apiClient.get("/course");
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCourse = async () => {
    setLoading(true); // Start loading
    try {
      await apiClient.post("/course", currentCourse);
      setCurrentCourse({
        id: "",
        course_name: "",
        course_content: "",
        course_duration: "",
        description: "",
        logo: "",
      });
      setIsAddDialogOpen(false);
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleEditCourse = async () => {
    setLoading(true); // Start loading
    try {
      await apiClient.put(`/course/${currentCourse.id}`, currentCourse);
      setIsEditDialogOpen(false);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleDeleteCourse = async () => {
    setLoading(true); // Start loading
    try {
      await apiClient.delete(`/course/${currentCourse.id}`);
      setIsDeleteDialogOpen(false);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const openEditDialog = (course) => {
    setCurrentCourse(course);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (course) => {
    setCurrentCourse(course);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-10 ml-[220px] xl:ml-[270px]">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Courses
        </h1>

        {/* Show spinner while loading */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <LoadingSpinner /> {/* Centered loading spinner */}
          </div>
        ) : (
          <>
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
                    <Button onClick={handleAddCourse} disabled={loading}>
                      {loading ? <LoadingSpinner size="small" /> : "Submit"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-20">
              {courses &&
                courses.length > 0 &&
                courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onEdit={openEditDialog}
                    onDelete={openDeleteDialog}
                  />
                ))}
            </div>
          </>
        )}
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
            <Button onClick={handleEditCourse} disabled={loading}>
              {loading ? <LoadingSpinner size="small" /> : "Update Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              course "{currentCourse.course_name}" and remove it from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCourse} disabled={loading}>
              {loading ? <LoadingSpinner size="small" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CoursesPage;
