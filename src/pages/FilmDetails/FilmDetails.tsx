import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilmById } from "../../services/ghibliApi";
import type { Film } from "../../types/Film";

export const FilmDetails = () => {
  const { id } = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilm = async () => {
      setLoading(true);
      setError(null);
      try {
        if (id) {
          const filmData = await getFilmById(id);
          setFilm(filmData);
        }
      } catch {
        setError("Erro ao buscar detalhes do filme");
      } finally {
        setLoading(false);
      }
    };
    fetchFilm();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-400 border-solid"></div>
      </div>
    );
  }
  if (error) return <p>{error}</p>;
  if (!film) return <p>Filme não encontrado.</p>;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
          <img
            src={film.movie_banner}
            alt={film.title}
            className="w-full h-100 object-cover"
          />
        </div>

        <h1 className="text-4xl font-bold mb-4">{film.title}</h1>

        <p className="text-slate-300 leading-relaxed mb-8">
          {film.description}
        </p>

        <div className="grid sm:grid-cols-2 gap-6 bg-slate-800 p-6 rounded-2xl shadow-lg">
          <div>
            <p className="text-slate-400 text-sm">Director</p>
            <p className="text-lg font-medium">{film.director}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Producer</p>
            <p className="text-lg font-medium">{film.producer}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Release Year</p>
            <p className="text-lg font-medium">{film.release_date}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Rotten Tomatoes</p>
            <p className="text-lg font-medium text-emerald-400">
              {film.rt_score}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
