import { useEffect, useState } from "react";
import type { Film } from "../../types/Film";
import { getFilms } from "../../services/ghibliApi";
import { Link } from "react-router-dom";

export const Home = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      setError(null);
      try {
        const filmsData = await getFilms();
        const sortedFilms = filmsData.sort((a, b) =>
          a.title.localeCompare(b.title),
        );
        setFilms(sortedFilms);
      } catch (erro) {
        setError("Erro ao buscar filmes");
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, []);

  if (loading) {
    return <p>Carregando filmes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Studio Ghibli Films
      </h1>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {films.map((film) => (
          <Link
            to={`/films/${film.id}`}
            key={film.id}
            className="group bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <li>
              <div className="relative">
                <img
                  src={film.movie_banner}
                  alt={film.title}
                  className="h-48 w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold group-hover:text-emerald-400 transition-colors">
                  {film.title}
                </h2>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
