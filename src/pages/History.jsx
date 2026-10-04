import { FaHistory, FaTrash, FaCode, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactMarkDown from "react-markdown";

const History = () => {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("codeHistory")) || [];
    setHistory(saved);
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("codeHistory");
    setSelected(null);
    toast.info("All History Cleared");
  };

  const deleteHandler = (id) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("codeHistory", JSON.stringify(updated));
    toast.info("History Removed");
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="min-h-[87.8vh] bg-slate-200 px-8 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900">
              <FaHistory className="text-lg text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">History</h2>
              <p className="text-sm text-slate-500">
                Your Previously explained code snippets.
              </p>
            </div>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 rounded-lg border birder-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              <FaTrash />
              Clear All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
              <FaHistory className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              No history yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Explanations you generate will show up here
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {history.map((h) => (
              <div
                key={h.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
                      <FaCode className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {h.language}
                      </p>
                      <p className="text-xs text-slate-500">{h.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSelected(selected?.id === h.id ? null : h)
                      }
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                    >
                      {selected?.id === h.id ? "Hide" : "View"}
                    </button>
                    <button
                      onClick={() => deleteHandler(h.id)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-red-100 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100 bg-slate-900 px-5 py-3">
                  <p className="truncate font-mono text-xs text-slate-300">
                    {h.code.split("\n")[0]}{" "}
                    {h.code.split("\n").length > 1 ? "..." : ""}
                  </p>
                </div>

                {selected?.id === h.id && (
                  <div className="border-t border-slate-200 p-5">
                    <div className="mb-4">
                      <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
                        Code
                      </p>
                      <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-sm text-slate-200">
                        {h.code}
                      </pre>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
                        Explanation
                      </p>
                      <div className="prose prose-sm max-w-none rounded-xl bg-slate-50 p-4 prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700">
                        <ReactMarkDown>{h.explanation}</ReactMarkDown>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelected(null)}
                      className="flex mt-3 items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
                    >
                      <FaTimes />
                      Close
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
