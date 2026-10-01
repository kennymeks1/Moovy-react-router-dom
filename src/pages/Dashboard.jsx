import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

import { BiMoviePlay } from "react-icons/bi";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineFacebook, MdOutlineLiveTv } from "react-icons/md";
import { FaInstagram, FaRegEnvelope } from "react-icons/fa";

export default function Dashboard() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <section className="min-h-screen bg-[#111315] text-white">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#17191c] px-6 py-8">
        {/* Logo */}
        <div className="mb-12 flex items-center justify-center">
          <img
            className="h-12 w-auto object-contain"
            src={logo}
            alt="Moovy"
          />
        </div>

        {/* Navigation title */}
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Browse
        </p>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <Link
            to="/"
            className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive("/")
                ? "bg-[#d6a84f] text-[#17191c]"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <BiMoviePlay className="text-xl" />
            <span>All Films</span>
          </Link>

          <Link
            to="/shorts"
            className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive("/shorts")
                ? "bg-[#d6a84f] text-[#17191c]"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <SiYoutubeshorts className="text-xl" />
            <span>Shorts</span>
          </Link>

          <Link
            to="/tvshows"
            className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive("/tvshows")
                ? "bg-[#d6a84f] text-[#17191c]"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <MdOutlineLiveTv className="text-xl" />
            <span>TV Shows</span>
          </Link>
        </nav>

        {/* Bottom section */}
        <div className="mt-auto">
          <div className="mb-5 border-t border-white/10 pt-5">
            <p className="text-xs leading-5 text-gray-500">
              Discover movies and TV shows from around the world.
            </p>
          </div>

          <div className="flex items-center gap-4 px-2 text-gray-500">
            <MdOutlineFacebook className="cursor-pointer text-lg transition hover:text-white" />
            <FaInstagram className="cursor-pointer text-lg transition hover:text-white" />
            <FaRegEnvelope className="cursor-pointer text-lg transition hover:text-white" />
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="ml-64 min-h-screen">
        {/* TOP NAV */}
        <nav className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/10 bg-[#111315]/95 px-8 backdrop-blur-md">
          <div className="w-full max-w-xl">
            <div className="flex items-center rounded-xl border border-white/10 bg-[#1a1d20] px-4">
              <input
                type="text"
                placeholder="Search movies, shows..."
                className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="ml-8 hidden items-center gap-5 text-gray-500 md:flex">
            <MdOutlineFacebook className="cursor-pointer text-lg transition hover:text-white" />
            <FaInstagram className="cursor-pointer text-lg transition hover:text-white" />
            <FaRegEnvelope className="cursor-pointer text-lg transition hover:text-white" />
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="px-6 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </section>
  );
}