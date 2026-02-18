import type { Film } from "../types/Film";

export async function getFilms(): Promise<Film[]> {
  const response = await fetch("https://ghibliapi.vercel.app/films?limit=10");

  if (!response.ok) {
    throw new Error(
      `Erro ao buscar filmes: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}
