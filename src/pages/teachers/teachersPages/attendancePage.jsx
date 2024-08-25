import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Users } from 'lucide-react';
import TeacherSidebar from '../teacherSidebar';
import { Toaster } from "@/components/ui/toaster"
import { format } from 'date-fns';

const AttendanceComponent = () => {
    const { classId } = useParams();
    const [attendanceData, setAttendanceData] = useState([]);
    const [className, setClassName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classResponse = await axios.get(`http://localhost:8000/class/${classId}`);
                const classData = classResponse.data.data;
                setClassName(classData.class_name);

                const attendanceResponse = await axios.get(`http://localhost:8000/attendances/class/${classId}`);
                const attendanceData = attendanceResponse.data.data || [];

                const today = format(new Date(), 'yyyy-MM-dd');
                const todayAttendance = attendanceData.find(item => item.date === today);

                if (todayAttendance) {
                    const mappedAttendance = todayAttendance.students.map(attendance => {
                        const student = classData.students.find(s => s.id === attendance.student_id);
                        return {
                            id: attendance.student_id,
                            name: student ? student.student_name : 'Unknown',
                            status: attendance.status,
                            reason: attendance.remarks
                        };
                    });
                    console.log(mappedAttendance)
                    setAttendanceData(mappedAttendance);
                } else {
                    const initialAttendance = classData.students.map(student => ({
                        id: student.id,
                        name: student.student_name,
                        status: 'Present',
                        reason: ''
                    }));
                    console.log(initialAttendance)
                    setAttendanceData(initialAttendance);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast({
                    title: "Error",
                    description: "Failed to fetch attendance data",
                    variant: "destructive",
                });
            }
        };

        fetchData();
    }, [classId]);

    const handleStatusChange = (studentId, status) => {
        setAttendanceData(prevData =>
            prevData.map(student =>
                student.id === studentId
                    ? { ...student, status, reason: status === "Present" ? "" : student.reason }
                    : student
            )
        );
    };

    const handleReasonChange = (studentId, reason) => {
        setAttendanceData(prevData =>
            prevData.map(student =>
                student.id === studentId ? { ...student, reason } : student
            )
        );
    };

    const submitAttendance = async () => {
        try {
            const today = format(new Date(), 'yyyy-MM-dd');
            const submitData = {
                date: today,
                students: attendanceData.map(student => ({
                    student_id: student.id,
                    status: student.status,
                    remarks: student.reason
                }))
            };

            await axios.post(`http://localhost:8000/attendances/class/${classId}`, submitData);

            const presentCount = attendanceData.filter(student => student.status === "Present").length;
            const absentCount = attendanceData.length - presentCount;

            toast({
                title: "Attendance Submitted",
                description: `Present: ${presentCount}, Absent: ${absentCount}`,
            });
        } catch (error) {
            console.error('Error submitting attendance:', error);
            toast({
                title: "Error",
                description: "Failed to submit attendance",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <TeacherSidebar />
            <div className="p-6 bg-gray-100 w-full flex flex-col overflow-hidden">
                <Card className="w-full max-w-4xl mx-auto flex flex-col" style={{ height: '95vh' }}>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="flex items-center text-2xl">
                                    <Users className="mr-2 h-6 w-6" />
                                    {className} Attendance
                                </CardTitle>
                            </div>
                            <div className="text-lg font-semibold">
                                {format(new Date(), 'MMMM d, yyyy')}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-grow overflow-hidden">
                        <div className="overflow-auto flex-grow">
                            <table className="w-full">
                                <thead className="sticky top-0 bg-white">
                                    <tr>
                                        <th className="p-2 text-left">Name</th>
                                        <th className="text-center p-2">Status</th>
                                        <th className="text-center p-2">Reason (if Informed)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceData.map(student => (
                                        <tr key={student.id} className="border-t">
                                            <td className="p-2">{student.name}</td>
                                            <td className="p-2 flex justify-center items-center">
                                                <Select
                                                    value={student.status}
                                                    onValueChange={(value) => handleStatusChange(student.id, value)}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Present">Present</SelectItem>
                                                        <SelectItem value="Absent (Informed)">Absent (Informed)</SelectItem>
                                                        <SelectItem value="Absent (Uninformed)">Absent (Uninformed)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </td>
                                            <td className="p-2">
                                                {student.status !== "Present" && (
                                                    <Input
                                                        type="text"
                                                        placeholder="Reason for absence"
                                                        value={student.reason}
                                                        onChange={(e) => handleReasonChange(student.id, e.target.value)}
                                                        className="w-full"
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Button
                            className="w-full mt-6"
                            onClick={submitAttendance}
                        >
                            Submit Attendance
                        </Button>
                    </CardContent>
                </Card>
                <Toaster />
            </div>
        </div>
    );
};

export default AttendanceComponent;
