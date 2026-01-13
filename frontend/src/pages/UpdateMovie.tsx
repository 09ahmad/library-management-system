import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { movieService } from '../services/api';

const UpdateMovie: React.FC = () => {
  const [movieName, setMovieName] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [director, setDirector] = useState('');
  const [category, setCategory] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadMovies();
    const movie = (location.state as any)?.movie;
    if (movie) {
      setMovieName(movie.movieName);
      setSerialNo(movie.serialNo);
      setDirector(movie.director);
      setCategory(movie.category);
      setSelectedMovie(movie);
    }
  }, [location]);

  useEffect(() => {
    if (serialNo) {
      const movie = movies.find(m => m.serialNo === serialNo);
      if (movie) {
        setSelectedMovie(movie);
        setMovieName(movie.movieName);
        setDirector(movie.director);
        setCategory(movie.category);
      }
    }
  }, [serialNo, movies]);

  const loadMovies = async () => {
    try {
      const response = await movieService.getAll();
      if (response.success) {
        setMovies(response.data);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!serialNo) {
      setError('Serial number is required');
      return;
    }

    try {
      const response = await movieService.update(serialNo, {
        movieName,
        director,
        category
      });

      if (response.success) {
        navigate('/confirmation', { state: { message: 'Movie updated successfully' } });
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/master/movies');
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="form-container">
          <h2>Update Movie</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="movieName">Movie Name</label>
              <select
                id="movieName"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
              >
                <option value="">Select Movie</option>
                {movies.map((movie) => (
                  <option key={movie.serialNo} value={movie.serialNo}>
                    {movie.movieName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="serialNo">Serial No</label>
              <select
                id="serialNo"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
              >
                <option value="">Select Serial No</option>
                {movies.map((movie) => (
                  <option key={movie.serialNo} value={movie.serialNo}>
                    {movie.serialNo}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="director">Director</label>
              <input
                type="text"
                id="director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;
