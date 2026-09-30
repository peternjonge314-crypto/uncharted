function Filter({ title, onTitleChange, minimumRating, onRatingChange }) {
  return (
    <div className="filters" aria-label="Filter movies">
      <label className="search-field">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <span className="visually-hidden">Search by title</span>
        <input
          type="search"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Find a title..."
        />
      </label>
      <label className="rating-filter">
        <span className="filter-label">RATING</span>
        <select value={minimumRating} onChange={(event) => onRatingChange(event.target.value)} aria-label="Minimum rating">

          <option value="0">Any rating</option>
          <option value="3">3.0+ stars</option>
          <option value="4">4.0+ stars</option>
          <option value="4.5">4.5+ stars</option>
        </select>
      </label>
    </div>
  );
}

export default Filter;