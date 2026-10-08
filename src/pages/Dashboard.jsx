
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

import { BiMoviePlay } from "react-icons/bi";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineFacebook, MdOutlineLiveTv } from "react-icons/md";
import { FaInstagram, FaRegEnvelope } from "react-icons/fa";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

export default function Dashboard() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = (path) =>
    `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive(path)
        ? "bg-[#d6a84f] text-[#17191c]"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <section className="min-h-screen overflow-x-hidden bg-[#111315] text-white">
      {/* Mobile overlay */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-64 max-w-[85vw] flex-col border-r border-white/10 bg-[#17191c] px-6 py-6 transition-transform duration-300 md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <Link to="/" onClick={closeMenu} aria-label="Moovy home">
            <img
              className="h-12 w-auto object-contain"
              src={logo}
              alt="Moovy"
            />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white md:hidden"
          >
            <FiX size={22} />
          </button>
        </div>

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Browse
        </p>

        <nav className="flex flex-col gap-2">
          <Link
            to="/"
            onClick={closeMenu}
            className={navLinkClass("/")}
          >
            <BiMoviePlay className="text-xl" />
            <span>All Films</span>
          </Link>

          <Link
            to="/shorts"
            onClick={closeMenu}
            className={navLinkClass("/shorts")}
          >
            <SiYoutubeshorts className="text-xl" />
            <span>Shorts</span>
          </Link>

          <Link
            to="/tvshows"
            onClick={closeMenu}
            className={navLinkClass("/tvshows")}
          >
            <MdOutlineLiveTv className="text-xl" />
            <span>TV Shows</span>
          </Link>
        </nav>

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

      {/* Main content */}
      <div className="min-h-screen min-w-0 md:ml-64">
        {/* Top navigation */}
        <nav className="fixed left-0 right-0 top-0 z-40 flex h-20 items-center justify-between border-b border-white/10 bg-[#111315]/95 px-4 backdrop-blur-md sm:px-6 md:left-64 md:px-8">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="shrink-0 rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white md:hidden"
          >
            <FiMenu size={23} />
          </button>

          <Link
            to="/"
            aria-label="Moovy home"
            className="shrink-0 md:hidden"
          >
            <img
              src={logo}
              alt="Moovy"
              className="h-8 w-auto object-contain"
            />
          </Link>

          <div className="ml-auto flex min-w-0 flex-1 items-center rounded-xl border border-white/10 bg-[#1a1d20] px-3 sm:ml-0 sm:max-w-xl sm:px-4">
            <FiSearch className="mr-2 shrink-0 text-gray-500" />

            <input
              type="search"
              placeholder="Search movies..."
              aria-label="Search movies"
              className="w-full min-w-0 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-gray-600 sm:py-3"
            />
          </div>

          <div className="ml-3 hidden items-center gap-4 text-gray-500 lg:flex">
            <MdOutlineFacebook className="cursor-pointer text-lg transition hover:text-white" />
            <FaInstagram className="cursor-pointer text-lg transition hover:text-white" />
            <FaRegEnvelope className="cursor-pointer text-lg transition hover:text-white" />
          </div>
        </nav>

        <main className="min-w-0 px-4 pb-6 pt-26 sm:px-6 md:px-8 md:pb-8 md:pt-26">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
