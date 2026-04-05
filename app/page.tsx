import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import MovieRow from "@/components/rows/MovieRow";
import { endpoints } from "@/services/api";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MovieRow title="Because You Watched" fetchUrl={endpoints.popular} />
      <MovieRow title="Trending Now" fetchUrl={endpoints.trending} />
      <MovieRow title="Popular" fetchUrl={endpoints.popular} />
      <MovieRow title="Top Rated" fetchUrl={endpoints.topRated} />
      <MovieRow title="Upcoming" fetchUrl={endpoints.upcoming} />
    </main>
  );
}
