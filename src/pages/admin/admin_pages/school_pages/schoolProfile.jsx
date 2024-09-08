import React, { useEffect, useState } from "react";
import SchoolSidebar from "./schoolSidebar";
import { useSchoolContext } from "context/SchoolContext";
import apiClient from "config/apiClient";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Save, Trash2, School, Mail, Home, Key } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SchoolProfile = () => {
  const navigate = useNavigate();
  const { schoolId } = useSchoolContext();
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editedData, setEditedData] = useState({
    school_name: "",
    email: "",
    password: "",
    address: "",
    course_id: [],
  });

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await apiClient.get(`/school/${schoolId}`);
        setSchoolData(response.data.data);
        setEditedData({
          school_name: response.data.data.school_name,
          email: response.data.data.email,
          address: response.data.data.address,
          password: response.data.data.password,
          course_id: response.data.data.course_id,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch school data");
        setLoading(false);
      }
    };

    if (schoolId) {
      fetchSchoolData();
    }
  }, [schoolId]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await apiClient.delete(`/school/${schoolId}`);
      navigate("/admin");
    } catch (err) {
      console.error("Error deleting school:", err);
      setError("Failed to delete school");
    } finally {
      setLoading(false);
      setShowDeleteConfirmation(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const updatedData = Object.entries(editedData).reduce(
        (acc, [key, value]) => {
          if (value !== schoolData[key]) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      if (Object.keys(updatedData).length > 0) {
        const putResponse = await apiClient.put(
          `/school/${schoolId}`,
          updatedData
        );
        setSchoolData((prevData) => ({
          ...prevData,
          ...updatedData,
        }));
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating school data:", err);
      setError("Failed to update school data");
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-red-600 text-xl font-semibold">{error}</div>
      </div>
    );

  const logoImageUrl =
    "https://play-lh.googleusercontent.com/sWzGpfBbJC8ng4_9KEFolRzEnjfIEu5tzx1QuYOK5glSvmfX_i8itW-TUpEhkYiZ1Q";

  return (
    <div className="flex h-screen bg-gray-100">
      <SchoolSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <h1 className="text-4xl font-bold mb-14 text-gray-800 text-center">
            School Profile
          </h1>
          <Card className="w-full max-w-3xl mx-auto mb-8">
            {loading ? (
              <LoadingSpinner />
            ) : schoolData ? (
              <>
                <div className="flex justify-center -mt-12 mb-4">
                  <motion.div
                    className="relative"
                    initial={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="w-44 h-44 mt-8 rounded-full border-4 border-white overflow-hidden shadow-lg"
                      style={{ boxShadow: "0 0 0 2px black" }}
                    >
                      <img
                        src={logoImageUrl}
                        alt="School Logo"
                        className="w-full h-full  object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
                <CardContent className="p-6">
                  <AnimatePresence>
                    <motion.div
                      className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6"
                      initial={{ height: "auto" }}
                      animate={{ height: isEditing ? "auto" : "auto" }}
                      exit={{ height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {["school_name", "email", "address"].map((field) => (
                        <div
                          key={field}
                          className="flex items-center space-x-4"
                        >
                          {field === "school_name"}
                          {field === "email"}
                          {field === "address"}
                          <div className="flex-grow">
                            <p className="font-semibold text-gray-600 capitalize">
                              {field.replace("_", " ")}:
                            </p>
                            <Input
                              type={field === "email" ? "email" : "text"}
                              name={field}
                              value={editedData[field]}
                              onChange={handleChange}
                              className="mt-1"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      ))}
                      {isEditing && (
                        <div className="flex items-center space-x-4">
                          <div className="flex-grow">
                            {/* <p className="font-semibold text-gray-600">
                              Password:
                            </p>
                            <Input
                              type="password"
                              name="password"
                              value={editedData.password}
                              onChange={handleChange}
                              className="mt-1"
                              placeholder="Enter new password"
                            /> */}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex flex-col sm:flex-row gap-4 mt-12 mb-6">
                    <Button
                      onClick={handleEdit}
                      className="w-full sm:w-1/2"
                      disabled={loading}
                    >
                      {loading ? (
                        <LoadingSpinner />
                      ) : isEditing ? (
                        <>
                          <Save className="mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit className="mr-2" />
                          Edit Information
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleDeleteClick}
                      className="bg-red-500 w-full sm:w-1/2 hover:bg-red-600"
                      disabled={loading}
                    >
                      <Trash2 className="mr-2" />
                      Delete School
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No school data available</p>
              </div>
            )}
          </Card>
        </main>
      </div>
      <Dialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="mb-4">
            Are you sure you want to delete this school? This action cannot be
            undone.
          </p>
          <div className="flex justify-end">
            <Button
              onClick={handleDeleteCancel}
              variant="outline"
              className="mr-2"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} variant="destructive">
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchoolProfile;
