import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      {/* Main Container */}
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>

          <p className="mt-4 text-lg text-gray-600">
            Learn more about our Student Management System
          </p>
        </div>

        {/* About Section */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            Student Management System
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Welcome to our Student Management System. This application helps
            educational institutions manage student information in an easy and
            organized way.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Our system allows users to manage student records, view student
            details, and keep important information organized in one place.
          </p>
        </div>

        {/* Features */}
        <div className="mt-10">
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
            Our Features
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Student Records
              </h3>

              <p className="mt-3 text-gray-600">
                Easily manage and organize student information.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Easy Management
              </h3>

              <p className="mt-3 text-gray-600">
                Manage student data through a simple and user-friendly
                interface.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Organized Data
              </h3>

              <p className="mt-3 text-gray-600">
                Keep all student information organized and accessible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
