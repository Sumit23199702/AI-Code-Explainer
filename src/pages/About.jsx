import { FaCode, FaRobot, FaLightbulb, FaHistory } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-[87.8vh] bg-slate-200 px-8 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
          <FaRobot className="text-2xl text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">
          About AI Code Explainer
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-500">
          AI Code Explainer is a tool built for students and developers to
          understand code faster. Paste any code, and ai will explain it in
          simple, beginner-friendly language.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <FaCode className="mb-2 text-xl text-blue-600" />
          <h3 className="font-semibold text-slate-900">Code Explanation</h3>
          <p className="mt-1 text-sm text-slate-500">
            Get a clear, line-by-line breakdown of what your code does.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <FaLightbulb className="mb-2 text-xl text-blue-600" />
          <h3 className="font-semibold text-slate-900">Multiple Languages</h3>
          <p className="mt-1 text-sm text-slate-500">
            Supports Javascript, Python, Java, C and C++
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <FaHistory className="mb-2 text-xl text-blue-600" />
          <h3 className="font-semibold text-slate-900">History</h3>
          <p className="mt-1 text-sm text-slate-500">
            Revisit past Code explanations anytime from the History page.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <FaRobot className="mb-2 text-xl text-blue-600" />
          <h3 className="font-semibold text-slate-900">Powered by Gemini</h3>
          <p className="mt-1 text-sm text-slate-500">
            Uses Google's Gemini AI to generate accurate, simple explanations.
          </p>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center text-sm text-slate-400">
        Built with React, TailwindCSS, and the Gemini API.
      </p>
    </div>
  );
};

export default About;
