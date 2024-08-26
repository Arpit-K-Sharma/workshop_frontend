import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SchoolSidebar from '../admin_pages/school_pages/schoolSidebar';
import apiClient from 'config/apiClient';
import LoadingSpinner from 'userDefined_components/loading_spinner/loadingSpinner';
import { Users, BookOpen, GraduationCap, UserPlus, BookPlus, UserCheck } from 'lucide-react';

const ClassDetails = () => {
    const { classId } = useParams();
    const [classData, setClassData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCourse, setTotalCourse] = useState(0);
    const [totalTeacher, setTotalTeacher] = useState(0);
    const [totalStudent, setTotalStudent] = useState(0);

    useEffect(() => {
        const fetchClassData = async () => {
            setIsLoading(true);
            try {
                const response = await apiClient.get(`/class/${classId}`);
                setClassData(response.data.data);
                setTotalStudent(response.data.data.students?.length || 0);
                setTotalCourse(response.data.data.courses?.length || 0);
                setTotalTeacher(response.data.data.teachers?.length || 0);
            } catch (error) {
                console.error('Error fetching class data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClassData();
    }, [classId]);

    return (
        <div className="flex h-screen bg-gray-100">
            <SchoolSidebar />
            <div className="flex-1 overflow-auto">
                <main className="p-8">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : classData ? (
                        <>
                            <h1 className="text-3xl font-bold mb-6 text-gray-800">{classData.class_name}</h1>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-center justify-between ">
                                        <h2 className="text-lg font-semibold text-gray-700">Students</h2>
                                        <Users className="text-gray-600" size={28} />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800">{totalStudent}</p>
                                    <p className='text-gray-600'>Total Students studing in the school</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-center justify-between ">
                                        <h2 className="text-lg font-semibold text-gray-700">Teachers</h2>
                                        <GraduationCap className="text-gray-600" size={28} />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800">{totalTeacher}</p>
                                    <p className='text-gray-600'>Total Teachers Teaching in the school</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-center justify-between ">
                                        <h2 className="text-lg font-semibold text-gray-700">Courses</h2>
                                        <BookOpen className="text-gray-600" size={28} />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800">{totalCourse}</p>
                                    <p className='text-gray-600'>Total Courses being studied in the school</p>
                                </div>
                            </div>

                            <div className="flex  gap-4 mb-8">
                                <button className="flex items-center bg-gray-800 text-white px-6 py-3 w-1/3 hover:bg-gray-700 transition-colors duration-300">
                                    <UserCheck className="mr-2" size={20} />
                                    Assign Teacher
                                </button>
                                <button className="flex items-center bg-gray-800 text-white px-6 py-3 w-1/3 hover:bg-gray-700 transition-colors duration-300">
                                    <BookPlus className="mr-2" size={20} />
                                    Assign Course
                                </button>
                                <button className="flex items-center bg-gray-800 text-white px-6 py-3 w-1/3 hover:bg-gray-700 transition-colors duration-300">
                                    <UserPlus className="mr-2" size={20} />
                                    Add Student
                                </button>
                            </div>

                            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                                <h2 className="text-2xl font-bold p-6 border-b border-gray-200">Students</h2>
                                {classData.students.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {classData.students.map((student) => (
                                                    <tr key={student.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 m-6 rounded-md">
                                        <p className="font-bold">No Students Found</p>
                                        <p>Start by adding new students to this class using the 'Add Student' button above.</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="bg-red-50 border-l-4 border-red-400 text-red-800 p-4 rounded-md">
                            <p className="font-bold">No Class Data Found</p>
                            <p>There was an issue retrieving the class data. Please try again later.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ClassDetails;
