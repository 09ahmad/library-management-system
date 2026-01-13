import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieService } from '../services/api';

const MasterMovies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const response = await movieService.getAll();
      if (response.success) {
        setMovies(response.data);
      }
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/maintenance/add-movie');
  };

  const handleUpdate = (movie: any) => {
    navigate('/maintenance/update-movie', { state: { movie } });
  };

  const handleBack = () => {
    navigate('/master');
  };

  if (loading) {
    return <div className="main-content">Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="table-container">
          <h2>Master List - Movies</h2>
          <div className="button-group" style={{ marginBottom: '20px' }}>
            <button className="btn btn-primary" onClick={handleAdd}>Add</button>
            <button className="btn btn-secondary" onClick={handleBack}>Back</button>
          </div>
          {movies.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Movie Name</th>
                  <th>Director</th>
                  <th>Category</th>
                  <th>Serial No</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.serialNo}>
                    <td>{movie.movieName}</td>
                    <td>{movie.director}</td>
                    <td>{movie.category}</td>
                    <td>{movie.serialNo}</td>
                    <td>{movie.availability}</td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleUpdate(movie)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterMovies;
