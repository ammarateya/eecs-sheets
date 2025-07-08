import Link from 'next/link';

const SUBJECTS = [
  {
    code: "EECS",
    name: "Electrical Engineering & Computer Science",
    description: "Programming, algorithms, computer systems, and electrical engineering fundamentals",
    courses: [
      { number: "183", name: "Elementary Programming Concepts" },
      { number: "203", name: "Discrete Mathematics" },
      { number: "280", name: "Programming and Intro Data Structures" },
      { number: "281", name: "Data Structures and Algorithms" },
      { number: "370", name: "Introduction to Computer Organization" },
      { number: "376", name: "Foundations of Computer Science" },
      { number: "482", name: "Introduction to Operating Systems" },
      { number: "485", name: "Web Systems" },
    ]
  },
  {
    code: "MATH",
    name: "Mathematics",
    description: "Pure and applied mathematics including calculus, linear algebra, and discrete math",
    courses: [
      { number: "115", name: "Calculus I" },
      { number: "116", name: "Calculus II" },
      { number: "214", name: "Applied Calculus" },
      { number: "217", name: "Linear Algebra" },
      { number: "451", name: "Advanced Calculus I" },
      { number: "465", name: "Introduction to Combinatorics" },
    ]
  },
  {
    code: "PHYSICS",
    name: "Physics",
    description: "Classical and modern physics covering mechanics, electricity, magnetism, and more",
    courses: [
      { number: "140", name: "General Physics I" },
      { number: "141", name: "General Physics II" },
      { number: "240", name: "General Physics I (Honors)" },
      { number: "241", name: "General Physics II (Honors)" },
      { number: "340", name: "Waves, Heat, and Light" },
    ]
  },
  {
    code: "CHEM",
    name: "Chemistry",
    description: "General, organic, and physical chemistry courses",
    courses: [
      { number: "130", name: "General Chemistry I" },
      { number: "125", name: "General Chemistry II" },
      { number: "210", name: "Organic Chemistry I" },
      { number: "211", name: "Organic Chemistry II" },
      { number: "215", name: "Physical Chemistry I" },
    ]
  },
  {
    code: "ENGR",
    name: "Engineering",
    description: "General engineering courses and interdisciplinary engineering topics",
    courses: [
      { number: "100", name: "Introduction to Engineering" },
      { number: "101", name: "Introduction to Computers and Programming" },
      { number: "151", name: "Accelerated Introduction to Computers and Programming" },
    ]
  },
  {
    code: "STATS",
    name: "Statistics",
    description: "Statistical methods, probability, and data analysis",
    courses: [
      { number: "250", name: "Introduction to Statistics and Data Analysis" },
      { number: "306", name: "Introduction to Statistical Methods" },
      { number: "401", name: "Applied Statistical Methods II" },
    ]
  }
];

export default function SubjectsPage() {
  return (
    <div className="min-h-screen bg-indigo-950 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-yellow-400 hover:text-yellow-300 underline"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="font-pixel text-3xl text-yellow-400 mb-4">
            Browse All Subjects
          </h1>
          <p className="text-indigo-200 text-lg">
            Explore course cheat sheets across all UMich subjects
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((subject) => (
            <div 
              key={subject.code}
              className="bg-indigo-900 border-2 border-yellow-400 rounded-lg p-6 hover:bg-indigo-800 transition-colors"
            >
              <div className="mb-4">
                <h2 className="font-pixel text-xl text-yellow-400 mb-2">
                  {subject.code}
                </h2>
                <h3 className="text-white font-semibold mb-2">
                  {subject.name}
                </h3>
                <p className="text-indigo-300 text-sm">
                  {subject.description}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Popular Courses:</h4>
                <div className="grid grid-cols-1 gap-1">
                  {subject.courses.slice(0, 4).map((course) => (
                    <Link
                      key={course.number}
                      href={`/subjects/${subject.code.toLowerCase()}/${course.number}`}
                      className="text-indigo-200 hover:text-yellow-400 text-sm transition-colors"
                    >
                      {subject.code} {course.number} - {course.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href={`/subjects/${subject.code.toLowerCase()}`}
                className="inline-block bg-yellow-400 text-indigo-900 px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors"
              >
                View All {subject.code} Courses
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/upload"
            className="inline-block bg-yellow-400 text-indigo-900 px-6 py-3 rounded font-bold hover:bg-yellow-300 transition-colors"
          >
            Upload Your Cheat Sheet
          </Link>
        </div>
      </div>
    </div>
  );
}