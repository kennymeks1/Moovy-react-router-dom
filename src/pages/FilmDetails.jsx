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
    <article className="mx-auto max-w-6xl">
      {/* BACKGROUND HEADER AREA */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#191c1f]">
        {/* CONTENT */}
        <div className="grid gap-8 p-6 md:grid-cols-[280px_1fr] md:p-8 lg:gap-12 lg:p-10">
          {/* POSTER */}
          <div>
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={film.image?.original}
                alt={film.name}
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* INFORMATION */}
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#d6a84f]">
              Film Details
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              {film.name}
            </h1>

            {/* GENRES */}
            <div className="mt-5 flex flex-wrap gap-2">
              {film.genres?.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/10 bg-[#111315] px-4 py-1.5 text-xs text-gray-400"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* RATING */}
            <div className="mt-7 flex items-center gap-5">
              <div className="flex items-center gap-2">
                <FaStar className="text-xl text-[#d6a84f]" />

                <span className="text-2xl font-bold text-white">
                  {film.rating?.average ?? "N/A"}
                </span>

                <span className="text-sm text-gray-500">
                  / 10
                </span>
              </div>

              <div className="h-6 w-px bg-white/10"></div>

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
            </div>

            {/* META INFORMATION */}
            <div className="mt-8 grid grid-cols-2 gap-5 border-y border-white/10 py-6 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Runtime
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {film.runtime
                    ? `${film.runtime} mins`
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Weight
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {film.weight ?? "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Status
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {film.status ?? "N/A"}
                </p>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="mt-7">
              <h2 className="mb-3 text-lg font-semibold text-white">
                About the show
              </h2>

              <div
                className="max-w-3xl text-sm leading-7 text-gray-400"
                dangerouslySetInnerHTML={{
                  __html:
                    film.summary ||
                    "<p>No description available.</p>",
                }}
              />
            </div>

            {/* ENDED */}
            <div className="mt-7">
              <p className="text-sm text-gray-500">
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