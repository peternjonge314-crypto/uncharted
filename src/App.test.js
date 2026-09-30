import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the movie collection and filters by title', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /the collection/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Dune: Part Two' })).toBeInTheDocument();

  fireEvent.change(screen.getByRole('searchbox', { name: /search by title/i }), { target: { value: 'dune' } });
  expect(screen.getByRole('heading', { name: 'Dune: Part Two' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'The Grand Budapest Hotel' })).not.toBeInTheDocument();

  fireEvent.change(screen.getByRole('searchbox', { name: /search by title/i }), { target: { value: '' } });
  fireEvent.change(screen.getByRole('combobox', { name: /minimum rating/i }), { target: { value: '4.5' } });
  expect(screen.getByRole('heading', { name: 'Dune: Part Two' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'The Grand Budapest Hotel' })).toBeInTheDocument();
});

test('adds a movie to the collection', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /add a title/i }));
  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Past Lives' } });
  fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'A tender story of two childhood friends.' } });
  fireEvent.change(screen.getByLabelText('Poster image URL'), { target: { value: 'https://example.com/poster.jpg' } });
  fireEvent.change(screen.getByLabelText('Trailer embed URL'), { target: { value: 'https://www.youtube.com/embed/example' } });
  fireEvent.change(screen.getByRole('spinbutton', { name: /rating/i }), { target: { value: '4.6' } });
  fireEvent.click(screen.getByRole('button', { name: /add to collection/i }));

  expect(screen.getByRole('heading', { name: 'Past Lives' })).toBeInTheDocument();
});

test('opens a movie details page and returns to the collection', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'View details for Dune: Part Two' }));

  expect(screen.getByRole('heading', { name: 'Dune: Part Two' })).toBeInTheDocument();
  expect(screen.getByTitle('Dune: Part Two trailer')).toHaveAttribute('src', 'https://www.youtube.com/embed/Way9Dexny3w');

  fireEvent.click(screen.getByRole('link', { name: /back to the collection/i }));
  expect(screen.getByRole('heading', { name: /the collection/i })).toBeInTheDocument();
});
