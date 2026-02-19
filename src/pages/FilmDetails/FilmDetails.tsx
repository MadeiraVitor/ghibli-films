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

  if (loading) return <p>Carregando detalhes do filme...</p>;
  if (error) return <p>{error}</p>;
  if (!film) return <p>Filme não encontrado.</p>;

  return (
    <div>
      <h1>{film.title}</h1>
      <p>
        <strong>Descrição:</strong> {film.description}
      </p>
      <p>
        <strong>Diretor:</strong> {film.director}
      </p>
      <p>
        <strong>Produtor:</strong> {film.producer}
      </p>
      <p>
        <strong>Ano de lançamento:</strong> {film.release_date}
      </p>
      <p>
        <strong>Pontuação Rotten Tomatoes:</strong> {film.rt_score}
      </p>
    </div>
  );
};
