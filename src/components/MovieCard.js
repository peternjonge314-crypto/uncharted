import { Link } from 'react-router-dom';

function MovieCard({ movie, index }) {
  return (
    <Link className="movie-card-link" to={`/movies/${movie.id}`} aria-label={`View details for ${movie.title}`}>
      <article className="movie-card">
        <div className="poster-wrap">
          {movie.posterURL && <img
            className="movie-poster"
            src={movie.posterURL}
            alt={`${movie.title} poster`}
            loading="lazy"
            onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
          />}
          <span className="poster-index">NO. {String(index + 1).padStart(2, '0')}</span>
          <span className="rating-badge"><span aria-hidden="true">★</span> {Number(movie.rating).toFixed(1)}</span>
        </div>
        <div className="movie-details">
          <div className="movie-title-row">
            <h3>{movie.title}</h3>
            <span className="title-arrow" aria-hidden="true">↗</span>
          </div>
          <p>{movie.description}</p>
        </div>
      </article>
    </Link>
  );
}

export default MovieCard;