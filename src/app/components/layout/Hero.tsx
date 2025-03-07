"use client";

import Link from "next/link";

const FEATURED_COURSES = [
  { number: "183", name: "Elementary Programming Concepts" },
  { number: "203", name: "Discrete Mathematics" },
  { number: "280", name: "Programming and Intro Data Structures" },
  { number: "281", name: "Data Structures and Algorithms" },
  { number: "370", name: "Introduction to Computer Organization" },
  { number: "376", name: "Foundations of Computer Science" },
];

export default function Hero() {
  return (
    <div className="bg-indigo-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column: Title and Description */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="font-pixel text-4xl font-bold text-yellow-400 md:text-5xl lg:text-6xl">
              EECS SHEETS
            </h1>
            <p className="text-lg text-indigo-200 md:text-xl">
              Your one-stop destination for UMich EECS course cheat sheets.
              <br />
              Share knowledge, discover resources, and level up your studies.
            </p>
          </div>

          {/* Right Column: Course Buttons */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURED_COURSES.map((course) => (
              <Link
                key={course.number}
                href={`/courses/${course.number}`}
                className="group relative overflow-hidden rounded border-2 border-yellow-400 bg-indigo-900 p-4 transition-all hover:bg-yellow-400 hover:text-indigo-900"
              >
                <div className="relative z-10">
                  <h3 className="font-pixel text-lg font-bold">
                    EECS {course.number}
                  </h3>
                  <p className="mt-1 text-sm opacity-80">{course.name}</p>
                </div>
              </Link>
            ))}
            <Link
              href="/courses"
              className="col-span-2 sm:col-span-3 group relative overflow-hidden rounded border-2 border-yellow-400 bg-indigo-900 p-4 transition-all hover:bg-yellow-400 hover:text-indigo-900"
            >
              <div className="relative z-10 flex flex-col items-center justify-center">
                <h3 className="font-pixel text-lg font-bold">See More</h3>
                <p className="mt-1 text-sm opacity-80">Browse All Courses</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
// Updated on Tue May  6 23:04:02 EDT 2025
// Updated on Tue May  6 23:04:02 EDT 2025
// Updated on Tue May  6 23:04:02 EDT 2025
// Updated on Tue May  6 23:04:02 EDT 2025
// Updated on Tue May  6 23:04:03 EDT 2025
// Updated on Tue May  6 23:04:03 EDT 2025
// Updated on Tue May  6 23:04:03 EDT 2025
// Updated on Tue May  6 23:04:03 EDT 2025
// Updated on Tue May  6 23:04:03 EDT 2025
// Updated on Tue May  6 23:04:03 EDT 2025
// Updated on Tue May  6 23:04:03 EDT 2025
// Updated on Tue May  6 23:04:04 EDT 2025
// Updated on Tue May  6 23:04:04 EDT 2025
// Updated on Tue May  6 23:04:05 EDT 2025
// Updated on Tue May  6 23:04:05 EDT 2025
// Updated on Tue May  6 23:04:06 EDT 2025
// Updated on Tue May  6 23:04:06 EDT 2025
// Updated on Tue May  6 23:04:06 EDT 2025
// Updated on Tue May  6 23:04:06 EDT 2025
// Updated on Tue May  6 23:04:07 EDT 2025
// Updated on Tue May  6 23:04:07 EDT 2025
// Updated on Tue May  6 23:04:07 EDT 2025
// Updated on Tue May  6 23:04:07 EDT 2025
// Updated on Tue May  6 23:04:08 EDT 2025
// Updated on Tue May  6 23:04:08 EDT 2025
// Updated on Tue May  6 23:04:08 EDT 2025
// Updated on Tue May  6 23:04:08 EDT 2025
// Updated on Tue May  6 23:04:09 EDT 2025
// Updated on Tue May  6 23:04:09 EDT 2025
// Updated on Tue May  6 23:04:09 EDT 2025
// Updated on Tue May  6 23:04:09 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:11 EDT 2025
// Updated on Tue May  6 23:04:11 EDT 2025
// Updated on Tue May  6 23:04:11 EDT 2025
// Updated on Tue May  6 23:04:11 EDT 2025
// Updated on Tue May  6 23:04:11 EDT 2025
// Updated on Tue May  6 23:04:11 EDT 2025
// Updated on Tue May  6 23:04:12 EDT 2025
// Updated on Tue May  6 23:04:12 EDT 2025
// Updated on Tue May  6 23:04:12 EDT 2025
// Updated on Tue May  6 23:04:13 EDT 2025
// Updated on Tue May  6 23:04:13 EDT 2025
// Updated on Tue May  6 23:04:13 EDT 2025
// Updated on Tue May  6 23:04:13 EDT 2025
// Updated on Tue May  6 23:04:13 EDT 2025
// Updated on Tue May  6 23:08:11 EDT 2025
// Updated on Tue May  6 23:08:11 EDT 2025
// Updated on Tue May  6 23:08:11 EDT 2025
// Updated on Tue May  6 23:08:12 EDT 2025
// Updated on Tue May  6 23:08:12 EDT 2025
// Updated on Tue May  6 23:08:12 EDT 2025
// Updated on Tue May  6 23:08:12 EDT 2025
// Updated on Tue May  6 23:08:12 EDT 2025
// Updated on Tue May  6 23:08:13 EDT 2025
// Updated on Tue May  6 23:08:13 EDT 2025
// Updated on Tue May  6 23:08:13 EDT 2025
// Updated on Tue May  6 23:08:13 EDT 2025
// Updated on Tue May  6 23:08:13 EDT 2025
// Updated on Tue May  6 23:08:13 EDT 2025
// Updated on Tue May  6 23:08:14 EDT 2025
// Updated on Tue May  6 23:08:14 EDT 2025
// Updated on Tue May  6 23:08:14 EDT 2025
// Updated on Tue May  6 23:08:14 EDT 2025
// Updated on Tue May  6 23:08:14 EDT 2025
// Updated on Tue May  6 23:08:15 EDT 2025
// Updated on Tue May  6 23:08:15 EDT 2025
// Updated on Tue May  6 23:08:15 EDT 2025
// Updated on Tue May  6 23:08:15 EDT 2025
// Updated on Tue May  6 23:08:15 EDT 2025
// Updated on Tue May  6 23:08:15 EDT 2025
// Updated on Tue May  6 23:08:16 EDT 2025
// Updated on Tue May  6 23:08:16 EDT 2025
// Updated on Tue May  6 23:08:16 EDT 2025
// Updated on Tue May  6 23:08:16 EDT 2025
// Updated on Tue May  6 23:08:16 EDT 2025
// Updated on Tue May  6 23:08:16 EDT 2025
// Updated on Tue May  6 23:08:16 EDT 2025
