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
    <div className="border border-gray-50 p-4 mb-4 transition-transform duration-300 bg-white rounded-xl">
      <div className="flex justify-between items-center mb-2 rounded-lg">
        <h2 className="text-2xl font-bold">{course.course_name}</h2>
        <div>
          <button
            onClick={() => onEdit(course)}
            className="mr-2 px-2 py-1 font-semibold   transition-colors duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(course)}
            className="px-2 text-red-400 py-1 border font-semibold  transition-colors duration-300 rounded-lg hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-lg font-semibold mb-2">{course.course_content}</p>
      <div className="mb-2">
        <span className="font-medium">Duration: </span>
        <span className="font-bold">{course.course_duration}</span>
      </div>
      <button
        onClick={() => alert(course.description)}
        className="w-full bg-zinc-800 text-white py-2 border border-gray-100 hover:bg-zinc-900 hover:text-white transition-colors duration-300 rounded-lg"
      >
        View Details
      </button>
    </div>
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
    <div className="flex bg-[#EAEFFB] min-h-screen">
      <AdminSidebar />
      <div className="ml-56 p-6 flex-1">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Courses</h1>

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
