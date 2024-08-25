import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TeacherSidebar from '../teacherSidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Phone, Mail, MapPin, BookOpen, Clock, FileText } from 'lucide-react';

const StudentProfile = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentResponse = await axios.get(`http://127.0.0.1:8000/student/${studentId}`);
                setStudent(studentResponse.data.data);

                const attendanceResponse = await axios.get(`http://127.0.0.1:8000/attendances/student/${studentId}`);
                setAttendance(attendanceResponse.data.data);

                if (studentResponse.data.data.course_id && studentResponse.data.data.course_id.length > 0) {
                    const courseResponse = await axios.get(`http://127.0.0.1:8000/course/${studentResponse.data.data.course_id[0]}`);
                    setCourse(courseResponse.data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [studentId]);

    if (!student) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className='flex'>
            <TeacherSidebar />
            <div className="flex-1 p-8 bg-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card >
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Student Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 ">
                            <div className='flex space-x-4 justify-between items-center'>
                                <div>
                                    <h2 className="text-2xl mb-[20px] ">{student.student_name}</h2>
                                    <div className="flex items-center  space-x-2 mb-2">
                                        <User size={18} />
                                        <span><strong className='font-semibold'>Age:</strong> {student.age}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Phone size={18} />
                                        <span><strong className='font-semibold'>Phone:</strong> {student.phone_num}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Mail size={18} />
                                        <span><strong className='font-semibold'>Email:</strong> {student.student_email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <MapPin size={18} />
                                        <span><strong className='font-semibold'>Address:</strong> {student.address}</span>
                                    </div>
                                </div>
                                <div>
                                    <Avatar className="w-40 h-40">
                                        <AvatarImage src={student.avatar_url} alt={student.student_name} />
                                        <AvatarFallback>{student.student_name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {course && (
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl mb-4">Course Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <BookOpen size={20} className=" flex-shrink-0" />
                                    <div className='flex gap-2'>
                                        <span className="font-semibold">Course Name:</span>
                                        <p className="text-gray-700">{course.course_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FileText size={20} className=" flex-shrink-0" />
                                    <div className='flex gap-2'>
                                        <span className="font-semibold">Content:</span>
                                        <p className="text-gray-700">{course.course_content}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div>
                                    <Clock size={20} className=" flex-shrink-0" />
                                    </div>
                                    <div className='flex gap-2'>
                                        <span className="font-semibold">Duration:</span>
                                        <p className="text-gray-700">{course.course_duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <FileText size={20} className=" flex-shrink-0 mt-1" />
                                    <div className='flex gap-2'>
                                        <span className="font-semibold">Description:</span>
                                        <p className="text-gray-700">{course.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                </div>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendance && attendance.length > 0 ? (
                                    attendance.map((record, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{record.date}</TableCell>
                                            <TableCell>{record.status}</TableCell>
                                            <TableCell>{record.remarks}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center">No attendance records found</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StudentProfile;
