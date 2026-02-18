import { useEffect, useState } from "react";
import type { Film } from "../../types/Film";
import { getFilms } from "../../services/ghibliApi";

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
    <div>
      <h1>Filmes do Studio Ghibli</h1>
      <ul>
        {films.map((film) => (
          <li key={film.id}>
            <h2>{film.title}</h2>
            <p>{film.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
