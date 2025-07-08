"use client";

import Link from "next/link";

const SUBJECTS = [
  {
    code: "EECS",
    name: "Electrical Engineering & Computer Science",
    courses: [
      { number: "183", name: "Elementary Programming Concepts" },
      { number: "203", name: "Discrete Mathematics" },
      { number: "280", name: "Programming and Intro Data Structures" },
      { number: "281", name: "Data Structures and Algorithms" },
      { number: "370", name: "Introduction to Computer Organization" },
      { number: "376", name: "Foundations of Computer Science" },
    ]
  },
  {
    code: "MATH",
    name: "Mathematics",
    courses: [
      { number: "115", name: "Calculus I" },
      { number: "116", name: "Calculus II" },
      { number: "214", name: "Applied Calculus" },
      { number: "217", name: "Linear Algebra" },
      { number: "451", name: "Advanced Calculus I" },
    ]
  },
  {
    code: "PHYSICS",
    name: "Physics",
    courses: [
      { number: "140", name: "General Physics I" },
      { number: "141", name: "General Physics II" },
      { number: "240", name: "General Physics I (Honors)" },
      { number: "241", name: "General Physics II (Honors)" },
    ]
  },
  {
    code: "CHEM",
    name: "Chemistry",
    courses: [
      { number: "130", name: "General Chemistry I" },
      { number: "210", name: "Organic Chemistry I" },
      { number: "211", name: "Organic Chemistry II" },
    ]
  }
];

export default function Hero() {
  return (
    <div className="bg-indigo-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column: Title and Description */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="font-pixel text-4xl font-bold text-yellow-400 md:text-5xl lg:text-6xl">
              UMich SHEETS
            </h1>
            <p className="text-lg text-indigo-200 md:text-xl">
              Your one-stop destination for UMich course cheat sheets.
              <br />
              Share knowledge across all subjects and level up your studies.
            </p>
          </div>

          {/* Right Column: Subject Sections */}
          <div className="space-y-6">
            {SUBJECTS.map((subject) => (
              <div key={subject.code} className="space-y-3">
                <h2 className="font-pixel text-lg text-yellow-400 border-b border-yellow-400 pb-2">
                  {subject.code} - {subject.name}
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {subject.courses.map((course) => (
                    <Link
                      key={course.number}
                      href={`/subjects/${subject.code.toLowerCase()}/${course.number}`}
                      className="group relative overflow-hidden rounded border border-yellow-400 bg-indigo-900 p-3 text-sm transition-all hover:bg-yellow-400 hover:text-indigo-900"
                    >
                      <div className="relative z-10">
                        <h3 className="font-pixel text-xs font-bold">
                          {subject.code} {course.number}
                        </h3>
                        <p className="mt-1 text-xs opacity-80 leading-tight">{course.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            
            <Link
              href="/subjects"
              className="block w-full group relative overflow-hidden rounded border-2 border-yellow-400 bg-indigo-900 p-4 transition-all hover:bg-yellow-400 hover:text-indigo-900"
            >
              <div className="relative z-10 flex flex-col items-center justify-center">
                <h3 className="font-pixel text-lg font-bold">Browse All Subjects</h3>
                <p className="mt-1 text-sm opacity-80">Explore more courses and subjects</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
