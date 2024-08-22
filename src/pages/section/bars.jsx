import React from "react";
import {
  CheckCircle,
  Users,
  BarChart2,
  Settings,
  Star,
  DollarSign,
  Smile,
  Shield,
} from "lucide-react";

function Bars() {
  return (
    <div className="max-w-7xl mx-auto p-14">
      <hr className=" border-black my-16 "></hr>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Benefits for students
          </h2>
          <div className="space-y-10">
            <div className="flex space-x-4 items-center ">
              <div className="border border-gray-200 p-6 rounded-md">
                <CheckCircle className="w-8 h-8 text-blue-600  " />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Save 50% of teaching time
                </h3>
                <p className="text-gray-500">
                  By using our practitioner, we can give you more time to focus
                  on teaching.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-300 p-6 rounded-md">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Engage your students
                </h3>
                <p className="text-gray-500">
                  Coding theory is explained through an adventure story.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-300 p-6 rounded-md">
                <BarChart2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Make data-driven decisions
                </h3>
                <p className="text-gray-500">
                  Follow your students' progress aligned with the curriculum.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-300 p-6 rounded-md">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Onboard easily
                </h3>
                <p className="text-gray-500">
                  We are committed to supporting you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits for institutions */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Benefits for institutions
          </h2>
          <div className="space-y-10">
            <div className="flex items-center space-x-4">
              <div className="border border-gray-300 p-6 rounded-md">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Make your college the best in the region
                </h3>
                <p className="text-gray-600">
                  Increase the quality of computer science education through our
                  education system.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-300 p-6 rounded-md">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Reduce overhead expenses
                </h3>
                <p className="text-gray-600">
                  Reduce costs related to physical materials, and unnecessary
                  personnel.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-300 p-6 rounded-md">
                <Smile className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Enhance student engagement
                </h3>
                <p className="text-gray-600">
                  Story-based teaching makes learning more enjoyable and
                  effective.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-300 p-6 rounded-md">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Reduce teacher turnover rates
                </h3>
                <p className="text-gray-600">
                  Happy teachers result in lower turnover and less need for
                  hiring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className=" border-black my-16 "></hr>
    </div>
  );
}

export default Bars;
