import Link from 'next/link';
import { notFound } from 'next/navigation';

const SUBJECTS: Record<string, {
  code: string;
  name: string;
  courses: Array<{ number: string; name: string; }>;
}> = {
  'eecs': {
    code: "EECS",
    name: "Electrical Engineering & Computer Science",
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
    courses: [
      { number: "100", name: "Introduction to Engineering" },
      { number: "101", name: "Introduction to Computers and Programming" },
      { number: "151", name: "Accelerated Introduction to Computers and Programming" },
    ]
  },
  'stats': {
    code: "STATS",
    name: "Statistics",
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
    course: string;
  };
}

export default function CoursePage({ params }: Props) {
  const subject = SUBJECTS[params.subject];
  
  if (!subject) {
    notFound();
  }

  const course = subject.courses.find(c => c.number === params.course);
  
  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-indigo-950 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href={`/subjects/${params.subject}`}
            className="text-yellow-400 hover:text-yellow-300 underline"
          >
            ← Back to {subject.code} Courses
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="font-pixel text-3xl text-yellow-400 mb-4">
            {subject.code} {course.number}
          </h1>
          <h2 className="text-2xl text-white mb-4">
            {course.name}
          </h2>
        </div>

        <div className="bg-indigo-900 border-2 border-yellow-400 rounded-lg p-8 mb-8">
          <h3 className="font-pixel text-xl text-yellow-400 mb-4">
            Course Cheat Sheets
          </h3>
          <div className="text-center py-12">
            <p className="text-indigo-200 text-lg mb-6">
              No cheat sheets have been uploaded for this course yet.
            </p>
            <p className="text-indigo-300 mb-6">
              Be the first to share your knowledge!
            </p>
            <Link
              href="/upload"
              className="inline-block bg-yellow-400 text-indigo-900 px-6 py-3 rounded font-bold hover:bg-yellow-300 transition-colors"
            >
              Upload a Cheat Sheet
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900 border border-yellow-400 rounded-lg p-6">
          <h3 className="font-pixel text-lg text-yellow-400 mb-4">
            Course Information
          </h3>
          <div className="text-indigo-200 space-y-2">
            <p><strong>Subject:</strong> {subject.name}</p>
            <p><strong>Course Code:</strong> {subject.code} {course.number}</p>
            <p><strong>Course Title:</strong> {course.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const params = [];
  
  for (const [subjectKey, subject] of Object.entries(SUBJECTS)) {
    for (const course of subject.courses) {
      params.push({
        subject: subjectKey,
        course: course.number,
      });
    }
  }
  
  return params;
}