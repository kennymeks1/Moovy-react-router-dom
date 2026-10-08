import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function FilmDetails() {
  const { id } = useParams();

  const [film, setFilm] = useState({});

  useEffect(() => {
    async function fetchFilm() {
      try {
        const response = await fetch(
          `https://api.tvmaze.com/shows/${id}`
        );

        const data = await response.json();

        console.log(data);

        setFilm(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchFilm();
  }, [id]);

  const rating = film.rating?.average
    ? film.rating.average / 2
    : 0;

  return (
    <article className="mx-auto w-full max-w-6xl">
      {/* BACKGROUND HEADER AREA */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#191c1f] sm:rounded-3xl">

        {/* CONTENT */}
        <div className="grid gap-6 p-4 sm:gap-8 sm:p-6 md:grid-cols-[280px_1fr] md:p-8 lg:gap-12 lg:p-10">

          {/* POSTER */}
          <div className="mx-auto w-full max-w-[240px] sm:max-w-[280px] md:mx-0">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={film.image?.original}
                alt={film.name}
                className="aspect-[2/3] h-auto w-full object-cover md:aspect-auto md:h-auto"
              />
            </div>
          </div>

          {/* INFORMATION */}
          <div className="flex min-w-0 flex-col justify-center">

            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#d6a84f] sm:mb-3 sm:text-sm">
              Film Details
            </p>

            <h1 className="break-words text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {film.name}
            </h1>

            {/* GENRES */}
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
              {film.genres?.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/10 bg-[#111315] px-3 py-1.5 text-[11px] text-gray-400 sm:px-4 sm:text-xs"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* RATING */}
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-7 sm:gap-5">
              <div className="flex items-center gap-2">
                <FaStar className="text-lg text-[#d6a84f] sm:text-xl" />

                <span className="text-xl font-bold text-white sm:text-2xl">
                  {film.rating?.average ?? "N/A"}
                </span>

                <span className="text-xs text-gray-500 sm:text-sm">
                  / 10
                </span>
              </div>

              <div className="hidden h-6 w-px bg-white/10 sm:block"></div>

              <div className="flex gap-1 text-[10px] text-[#d6a84f] sm:text-xs">
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
            </div>

            {/* META INFORMATION */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-5 sm:mt-8 sm:gap-5 sm:py-6 md:grid-cols-3">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-gray-600 sm:text-xs">
                  Runtime
                </p>

                <p className="mt-1 text-xs font-semibold text-white sm:text-sm">
                  {film.runtime
                    ? `${film.runtime} mins`
                    : "N/A"}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-gray-600 sm:text-xs">
                  Weight
                </p>

                <p className="mt-1 truncate text-xs font-semibold text-white sm:text-sm">
                  {film.weight ?? "N/A"}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-gray-600 sm:text-xs">
                  Status
                </p>

                <p className="mt-1 text-xs font-semibold text-white sm:text-sm">
                  {film.status ?? "N/A"}
                </p>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="mt-6 sm:mt-7">
              <h2 className="mb-2 text-base font-semibold text-white sm:mb-3 sm:text-lg">
                About the show
              </h2>

              <div
                className="max-w-3xl break-words text-xs leading-6 text-gray-400 sm:text-sm sm:leading-7"
                dangerouslySetInnerHTML={{
                  __html:
                    film.summary ||
                    "<p>No description available.</p>",
                }}
              />
            </div>

            {/* ENDED */}
            <div className="mt-6 sm:mt-7">
              <p className="text-xs text-gray-500 sm:text-sm">
                Ended:{" "}
                <span className="font-medium text-gray-300">
                  {film.ended ?? "Still running"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}