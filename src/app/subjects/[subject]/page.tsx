import Link from 'next/link';
import { notFound } from 'next/navigation';

const SUBJECTS: Record<string, {
  code: string;
  name: string;
  description: string;
  courses: Array<{ number: string; name: string; }>;
}> = {
  'eecs': {
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
  'math': {
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
  'physics': {
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
  'chem': {
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
  'engr': {
    code: "ENGR",
    name: "Engineering",
    description: "General engineering courses and interdisciplinary engineering topics",
    courses: [
      { number: "100", name: "Introduction to Engineering" },
      { number: "101", name: "Introduction to Computers and Programming" },
      { number: "151", name: "Accelerated Introduction to Computers and Programming" },
    ]
  },
  'stats': {
    code: "STATS",
    name: "Statistics",
    description: "Statistical methods, probability, and data analysis",
    courses: [
      { number: "250", name: "Introduction to Statistics and Data Analysis" },
      { number: "306", name: "Introduction to Statistical Methods" },
      { number: "401", name: "Applied Statistical Methods II" },
    ]
  }
};

interface Props {
  params: {
    subject: string;
  };
}

export default function SubjectPage({ params }: Props) {
  const subject = SUBJECTS[params.subject];
  
  if (!subject) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-indigo-950 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href="/subjects"
            className="text-yellow-400 hover:text-yellow-300 underline"
          >
            ← Back to All Subjects
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="font-pixel text-3xl text-yellow-400 mb-4">
            {subject.code} - {subject.name}
          </h1>
          <p className="text-indigo-200 text-lg">
            {subject.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subject.courses.map((course) => (
            <Link
              key={course.number}
              href={`/subjects/${params.subject}/${course.number}`}
              className="group block bg-indigo-900 border-2 border-yellow-400 rounded-lg p-6 hover:bg-yellow-400 hover:text-indigo-900 transition-all"
            >
              <div className="space-y-2">
                <h2 className="font-pixel text-xl text-yellow-400 group-hover:text-indigo-900">
                  {subject.code} {course.number}
                </h2>
                <p className="text-indigo-200 group-hover:text-indigo-800">
                  {course.name}
                </p>
                <p className="text-indigo-300 group-hover:text-indigo-700 text-sm">
                  Click to view cheat sheets
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/upload"
            className="inline-block bg-yellow-400 text-indigo-900 px-6 py-3 rounded font-bold hover:bg-yellow-300 transition-colors"
          >
            Upload a {subject.code} Cheat Sheet
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(SUBJECTS).map((subject) => ({
    subject,
  }));
}