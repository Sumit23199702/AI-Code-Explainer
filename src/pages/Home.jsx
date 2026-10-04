import { useState } from "react";
import { FaCode, FaPlay, FaTrash, FaRobot, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import explainCode from "../services/apiService";
import ReactMarkDown from "react-markdown";

const File_Extensions = {
  Javascript: "js",
  Python: "py",
  Java: "java",
  "C++": "cpp",
  C: "c",
};

const Home = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Javascript");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  // Explain Code
  const explainHandler = async () => {
    if (!code.trim()) {
      toast.error("Please Enter Some Code.");
      return;
    }

    try {
      setLoading(true);
      setExplanation("");

      const result = await explainCode(code, language);
      console.log(result);
      setExplanation(result);

      toast.success("Code Explained successfully");

      // Save to History
      const historyItem = {
        id: Date.now().toString(),
        code,
        language,
        explanation: result,
        date: new Date().toLocaleString(),
      };

      const existing = JSON.parse(localStorage.getItem("codeHistory")) || [];
      localStorage.setItem(
        "codeHistory",
        JSON.stringify([historyItem, ...existing]),
      );
    } catch (error) {
      console.log(error);
      toast.error("Unable to explain code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Clear Code
  const clearHandler = () => {
    setCode("");
    setExplanation("");
    toast.info("Editor Cleared");
  };

  // Copy Explanation
  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(explanation);
      toast.success("Explanation Copied!");
    } catch (error) {
      toast.error("Copy Failed...");
    }
  };

  return (
    <div className="min-h-[87.8vh] bg-slate-200">
      <div className="mx-auto max-w-7xl px-8 pb-8 pt-12">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            <FaRobot />
            AI Powered Learning
          </div>
          <h2 className="text-5xl font-bold text-slate-900 text-shadow-2xs text-shadow-fuchsia-600 tracking-tight">
            Turn Complex Code Into
            <span className="text-blue-600"> Simple Ideas</span>
          </h2>
          <p className="mx-auto mt-2 text-lg text-slate-500">
            Understand, learn and improve your programming code with the help of
            AI
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900">
                  <FaCode className="text-sm text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Code Editor</h3>
                  <p className="text-xs text-slate-500">
                    Write or paste your code
                  </p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
              >
                <option>Javascript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C</option>
                <option>C++</option>
              </select>
            </div>

            <div className="bg-slate-900">
              <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                <span className="h-3 w-3 rounded-full bg-green-400"></span>

                <span className="ml-2 text-slate-500 font-medium">
                  main.{File_Extensions[language]}
                </span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Write or Paste your code here..."
                className="h-107.5 w-full resize-none bg-slate-900 p-6 font-mono text-slate-200 text-sm leading-7 outline-none placeholder:text-slate-600"
                spellCheck="false"
              ></textarea>
            </div>

            <div className="flex items-center justify-between px-5 py-4">
              <button
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                onClick={clearHandler}
              >
                <FaTrash />
                Clear
              </button>
              <button
                onClick={explainHandler}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Explaining...
                  </>
                ) : (
                  <>
                    <FaPlay />
                    Explain Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Explanation */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                  <FaRobot className="text-sm text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    AI Explanation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Simple explanation of your code
                  </p>
                </div>
              </div>

              {explanation && (
                <button
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                  onClick={copyHandler}
                >
                  <FaCopy /> Copy
                </button>
              )}
            </div>

            <div className="h-125 overflow-y-auto p-6">
              {!explanation && !loading && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
                    <FaRobot className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Ready to explain your code
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 max-w-sm">
                    Add your code in the editor and click "Explain Code" to get
                    a simple AI-powered explanation
                  </p>
                </div>
              )}

              {loading && (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>
                  <p className="mt-5 font-medium text-slate-700">
                    AI is analyzing your code...
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Please Wait a moment
                  </p>
                </div>
              )}

              {explanation && !loading && (
                <div className="prose prose-sm max-w-none prose-headings:text-slate-900 prose-headings:font-semibold prose-p:text-slate-700 prose-li:text-slate-700 prose-code: text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded">
                  <ReactMarkDown>{explanation}</ReactMarkDown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
