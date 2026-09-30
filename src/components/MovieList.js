import MovieCard from './MovieCard';

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <span aria-hidden="true">✳</span>
        <h3>No stories found</h3>
        <p>Try another title or soften your rating filter.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie, index) => <MovieCard key={movie.id} movie={movie} index={index} />)}
    </div>
  );
}

export default MovieList;