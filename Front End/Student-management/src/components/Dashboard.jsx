import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Heading */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">Student Dashboard</h1>

        <p className="mt-2 text-gray-600">
          Welcome to the Student Management System!
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Total Students */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-lg font-medium">
              Total Students
            </h2>

            <p className="text-3xl font-bold text-blue-600 mt-3">100</p>
          </div>

          {/* Active Students */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-lg font-medium">
              Active Students
            </h2>

            <p className="text-3xl font-bold text-green-600 mt-3">85</p>
          </div>

          {/* Total Courses */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-lg font-medium">Total Courses</h2>

            <p className="text-3xl font-bold text-purple-600 mt-3">10</p>
          </div>

          {/* New Students */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-lg font-medium">New Students</h2>

            <p className="text-3xl font-bold text-orange-600 mt-3">15</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md mt-8 p-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>

          <div className="mt-5 space-y-4">
            <div className="border-b pb-3">
              <p className="font-medium text-gray-700">
                New student registered
              </p>
              <p className="text-sm text-gray-500">
                Rahul Sharma joined the system
              </p>
            </div>

            <div className="border-b pb-3">
              <p className="font-medium text-gray-700">
                Student information updated
              </p>
              <p className="text-sm text-gray-500">
                Priya Singh's details were updated
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-700">New course added</p>
              <p className="text-sm text-gray-500">
                Data Structures course was added
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
