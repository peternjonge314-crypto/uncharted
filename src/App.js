import { useMemo, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import './App.css';
import Filter from './components/name';
import MovieList from './components/MovieList';

const initialMovies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    description: 'Paul Atreides unites with Chani and the Fremen on a journey of revenge and destiny.',
    posterURL: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=85',
    trailerURL: 'https://www.youtube.com/embed/Way9Dexny3w',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'The Grand Budapest Hotel',
    description: 'A legendary concierge and his protégé get swept up in a caper across Europe.',
    posterURL: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85',
    trailerURL: 'https://www.youtube.com/embed/1Fg5iWmQjwk',
    rating: 4.6,
  },
  {
    id: 3,
    title: 'Spider-Man: Into the Spider-Verse',
    description: 'Miles Morales discovers what it means to be a hero across a universe of possibilities.',
    posterURL: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=85',
    trailerURL: 'https://www.youtube.com/embed/g4Hbz2jLxvQ',
    rating: 4.9,
  },
];

function MovieApp() {
  const [movies, setMovies] = useState(initialMovies);
  const [titleFilter, setTitleFilter] = useState('');
  const [minimumRating, setMinimumRating] = useState('0');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formValues, setFormValues] = useState({ title: '', description: '', posterURL: '', trailerURL: '', rating: '' });
  const [formError, setFormError] = useState('');
  const location = useLocation();

  const filteredMovies = useMemo(() => movies.filter((movie) => (
    movie.title.toLowerCase().includes(titleFilter.trim().toLowerCase())
      && movie.rating >= Number(minimumRating)
  )), [movies, titleFilter, minimumRating]);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const addMovie = (event) => {
    event.preventDefault();
    const rating = Number(formValues.rating);
    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      setFormError('Rating must be between 0 and 5.');
      return;
    }

    setMovies((current) => [{ ...formValues, id: Date.now(), rating }, ...current]);
    setFormValues({ title: '', description: '', posterURL: '', trailerURL: '', rating: '' });
    setFormError('');
    setIsFormOpen(false);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Frame home">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span>frame<span className="brand-period">.</span></span>
        </Link>
        <nav className="top-nav" aria-label="Main navigation">
          <Link className={`nav-link${location.pathname === '/' ? ' active' : ''}`} to="/">Discover</Link>
          <Link className="nav-link" to="/">My collection</Link>
        </nav>
        {location.pathname === '/' && (
          <button className="add-button top-add" type="button" onClick={() => setIsFormOpen((open) => !open)}>
            <span aria-hidden="true">＋</span> Add a title
          </button>
        )}
      </header>

      <Routes>
        <Route path="/" element={<main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> YOUR PERSONAL SCREENING ROOM</p>
            <h1 id="hero-title">Stories worth<br />staying in for.</h1>
            <a className="hero-cta" href="#collection">Explore the collection <span aria-hidden="true">↘</span></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-sun" />
            <div className="hero-horizon" />
            <span className="hero-caption">A WORLD<br />BETWEEN FRAMES</span>
          </div>
          <div className="hero-index"><span>01</span><span className="index-rule" /><span>06</span></div>
        </section>

        {isFormOpen && (
          <section className="add-panel" aria-labelledby="add-heading">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">MAKE IT A DOUBLE FEATURE</p>
                <h2 id="add-heading">Add to your collection</h2>
              </div>
              <button className="close-button" type="button" onClick={() => setIsFormOpen(false)} aria-label="Close form">×</button>
            </div>
            <form className="movie-form" onSubmit={addMovie}>
              <label>Title<input name="title" value={formValues.title} onChange={updateForm} placeholder="e.g. Past Lives" required /></label>
              <label>Description<textarea name="description" value={formValues.description} onChange={updateForm} placeholder="What makes it unforgettable?" rows="2" required /></label>
              <label>Poster image URL<input name="posterURL" type="url" value={formValues.posterURL} onChange={updateForm} placeholder="https://..." required /></label>
              <label>Trailer embed URL<input name="trailerURL" type="url" value={formValues.trailerURL} onChange={updateForm} placeholder="https://www.youtube.com/embed/..." required /></label>
              <label>Rating <span className="field-hint">out of 5</span><input name="rating" type="number" min="0" max="5" step="0.1" value={formValues.rating} onChange={updateForm} placeholder="4.5" required /></label>
              {formError && <p className="form-error" role="alert">{formError}</p>}
              <button className="add-button submit-button" type="submit">Add to collection <span aria-hidden="true">↗</span></button>
            </form>
          </section>
        )}

        <section className="collection" id="collection" aria-labelledby="collection-title">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">CURATED BY YOU</p>
              <h2 id="collection-title">The collection <span className="collection-count">{String(filteredMovies.length).padStart(2, '0')}</span></h2>
            </div>
            <Filter
              title={titleFilter}
              onTitleChange={setTitleFilter}
              minimumRating={minimumRating}
              onRatingChange={setMinimumRating}
            />
          </div>
          <MovieList movies={filteredMovies} />
          <p className="collection-note">A good story stays with you. <span>Keep collecting.</span></p>
        </section>
      </main>} />
        <Route path="/movies/:movieId" element={<MovieDetails movies={movies} />} />
        <Route path="*" element={<main className="not-found"><h1>That title isn't in our collection.</h1><Link className="back-link" to="/">← Back to the collection</Link></main>} />
      </Routes>

      <footer className="footer"><Link className="brand footer-brand" to="/"><span className="brand-mark" aria-hidden="true">F</span><span>frame<span className="brand-period">.</span></span></Link><span>Made for the love of a good story.</span><span>© 2025 FRAME CLUB</span></footer>
    </div>
  );
}

function MovieDetails({ movies }) {
  const { movieId } = useParams();
  const movie = movies.find((item) => String(item.id) === movieId);

  if (!movie) {
    return <main className="not-found"><h1>That title isn't in our collection.</h1><Link className="back-link" to="/">← Back to the collection</Link></main>;
  }

  return (
    <main className="detail-page">
      <Link className="back-link" to="/">← Back to the collection</Link>
      <div className="detail-layout">
        <div className="detail-poster-wrap">
          {movie.posterURL && <img className="detail-poster" src={movie.posterURL} alt={`${movie.title} poster`} />}
          <span className="rating-badge"><span aria-hidden="true">★</span> {Number(movie.rating).toFixed(1)}</span>
        </div>
        <section className="detail-copy" aria-labelledby="detail-title">
          <p className="eyebrow">A FRAME CLUB PICK</p>
          <h1 id="detail-title">{movie.title}</h1>
          <p className="detail-description">{movie.description}</p>
          <div className="trailer-heading"><span className="eyebrow-line" /> THE TRAILER</div>
          {movie.trailerURL ? (
            <div className="trailer-frame">
              <iframe
                src={movie.trailerURL}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : <p className="trailer-unavailable">No trailer has been added for this title yet.</p>}
        </section>
      </div>
    </main>
  );
}

function App() {
  return <BrowserRouter><MovieApp /></BrowserRouter>;
}

export default App;
