import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function AllFilms() {
  const [allFilms, setAllFilms] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await fetch("https://api.tvmaze.com/shows");

        const data = await response.json();

        console.log(data);

        setAllFilms(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchFilms();
  }, []);

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="mb-8">
        <div className="mb-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#d6a84f]">
            Discover
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            All Films
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Explore movies and shows from the TVMaze collection.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-[#d6a84f] px-5 py-2 text-sm font-medium text-[#17191c]">
            All Languages
          </button>

          <button className="rounded-full border border-white/10 bg-[#1a1d20] px-5 py-2 text-sm text-gray-400 transition hover:border-white/20 hover:text-white">
            All Ratings
          </button>

          <button className="rounded-full border border-white/10 bg-[#1a1d20] px-5 py-2 text-sm text-gray-400 transition hover:border-white/20 hover:text-white">
            All Genres
          </button>
        </div>
      </div>

      {/* MOVIE GRID */}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allFilms.map((film) => {
          const rating = film.rating?.average
            ? film.rating.average / 2
            : 0;

          return (
            <Link
              to={`film/${film.id}`}
              key={film.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#191c1f] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={film.image?.medium}
                  alt={film.name}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Rating */}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#111315]/90 px-3 py-1.5 text-xs backdrop-blur-sm">
                  <FaStar className="text-[#d6a84f]" />
                  <span className="font-semibold text-white">
                    {film.rating?.average ?? "N/A"}
                  </span>
                </div>
              </div>

              {/* CARD INFO */}
              <div className="p-5">
                <h2 className="truncate text-lg font-semibold text-white transition group-hover:text-[#d6a84f]">
                  {film.name}
                </h2>

                <p className="mt-2 truncate text-sm text-gray-500">
                  {film.genres?.slice(0, 2).join(" • ") || "Genre unavailable"}
                </p>

                {/* STARS */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex gap-1 text-xs text-[#d6a84f]">
                    {Array.from({ length: 5 }, (_, index) => {
                      if (index < Math.floor(rating)) {
                        return <FaStar key={index} />;
                      }

                      return (
                        <FaStar
                          key={index}
                          className="text-gray-700"
                        />
                      );
                    })}
                  </div>

                  <span className="text-xs text-gray-500">
                    {film.rating?.average ?? "N/A"} / 10
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}