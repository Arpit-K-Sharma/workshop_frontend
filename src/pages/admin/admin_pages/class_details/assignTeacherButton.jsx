import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/toaster";
import apiClient from "config/apiClient";

const TeacherCard = ({ teacher, isAssigned, onToggle }) => {
  return (
    <div
      className={`p-4 border rounded-lg mb-4 cursor-pointer ${
        isAssigned ? "bg-blue-100" : ""
      }`}
      onClick={() => onToggle(teacher.id)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{teacher.name}</h3>
        <Checkbox checked={isAssigned} onClick={(e) => e.stopPropagation()} />
      </div>
      <p className="text-sm text-gray-600">{teacher.username}</p>
      <p className="text-sm text-gray-600">{teacher.address}</p>
      <p className="text-sm text-gray-600">{teacher.phone_num}</p>
    </div>
  );
};

const AssignTeacherButton = ({ onAssignTeacher, class_data }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allTeachers, setAllTeachers] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const { toast } = useToast();

  const fetchAllTeachers = useCallback(async () => {
    try {
      const teacherData = await apiClient.get("/teacher");
      setAllTeachers(teacherData.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch teachers. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const updateTeacherLists = useCallback(() => {
    const assignedTeachers =
      class_data.teachers?.map((teacher) => teacher.id) || [];
    setTeacherList(assignedTeachers);
    setSelectedTeachers(assignedTeachers);
  }, [class_data]);

  useEffect(() => {
    fetchAllTeachers();
    updateTeacherLists();
  }, [fetchAllTeachers, updateTeacherLists]);

  const toggleTeacher = (teacherId) => {
    setSelectedTeachers((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const handleSave = () => {
    onAssignTeacher(selectedTeachers);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white px-4 py-2 font-bold rounded hover:bg-blue-600 w-1/3">
          Assign Teachers
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-zinc-600">
            Assign New Teachers
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 max-h-96 overflow-y-auto">
          {allTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              isAssigned={selectedTeachers.includes(teacher.id)}
              onToggle={toggleTeacher}
            />
          ))}
        </div>
        <DialogFooter className="mt-6">
          <Button
            onClick={handleSave}
            className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTeacherButton;
