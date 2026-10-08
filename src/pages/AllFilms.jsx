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
    <div className="min-w-0">
      {/* PAGE HEADER */}
      <div className="mb-6 sm:mb-8">
        <div className="mb-5 sm:mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#d6a84f] sm:text-sm">
            Discover
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            All Films
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Explore movies and shows from the TVMaze collection.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0">
          <button className="shrink-0 rounded-full bg-[#d6a84f] px-4 py-2 text-xs font-medium text-[#17191c] sm:px-5 sm:text-sm">
            All Languages
          </button>

          <button className="shrink-0 rounded-full border border-white/10 bg-[#1a1d20] px-4 py-2 text-xs text-gray-400 transition hover:border-white/20 hover:text-white sm:px-5 sm:text-sm">
            All Ratings
          </button>

          <button className="shrink-0 rounded-full border border-white/10 bg-[#1a1d20] px-4 py-2 text-xs text-gray-400 transition hover:border-white/20 hover:text-white sm:px-5 sm:text-sm">
            All Genres
          </button>
        </div>
      </div>

      {/* MOVIE GRID */}
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {allFilms.map((film) => {
          const rating = film.rating?.average
            ? film.rating.average / 2
            : 0;

          return (
            <Link
              to={`film/${film.id}`}
              key={film.id}
              className="group min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#191c1f] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl sm:rounded-2xl"
            >
              {/* IMAGE */}
              <div className="relative aspect-[2/3] overflow-hidden sm:aspect-auto">
                <img
                  src={film.image?.medium}
                  alt={film.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                />

                {/* Rating */}
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-[#111315]/90 px-2 py-1 text-[10px] backdrop-blur-sm sm:right-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-xs">
                  <FaStar className="text-[#d6a84f]" />

                  <span className="font-semibold text-white">
                    {film.rating?.average ?? "N/A"}
                  </span>
                </div>
              </div>

              {/* CARD INFO */}
              <div className="p-3 sm:p-5">
                <h2 className="truncate text-sm font-semibold text-white transition group-hover:text-[#d6a84f] sm:text-lg">
                  {film.name}
                </h2>

                <p className="mt-1 truncate text-[11px] text-gray-500 sm:mt-2 sm:text-sm">
                  {film.genres?.slice(0, 2).join(" • ") ||
                    "Genre unavailable"}
                </p>

                {/* STARS */}
                <div className="mt-3 flex min-w-0 items-center gap-2 sm:mt-4 sm:gap-3">
                  <div className="flex shrink-0 gap-0.5 text-[9px] text-[#d6a84f] sm:gap-1 sm:text-xs">
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

                  <span className="truncate text-[10px] text-gray-500 sm:text-xs">
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