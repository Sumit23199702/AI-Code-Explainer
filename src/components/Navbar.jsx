import { FaCode, FaHistory, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 flex h-11 w-11 items-center justify-center rounded-xl">
            <FaCode className="text-xl text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              AI Code Explainer
            </h1>
            <p className="text-sm text-slate-500">Understand code with AI</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/" className="font-medium text-blue-600">
            Home
          </Link>
          <Link
            to="/history"
            className="flex items-center gap-1 font-medium text-slate-600 hover:text-blue-600 transition"
          >
            <FaHistory />
            History
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-1 font-medium text-slate-600 hover:text-blue-600 transition"
          >
            <FaInfoCircle />
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
