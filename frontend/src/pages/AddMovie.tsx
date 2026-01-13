import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieService } from '../services/api';

const AddMovie: React.FC = () => {
  const [movieName, setMovieName] = useState('');
  const [director, setDirector] = useState('');
  const [category, setCategory] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!movieName || !director || !category || !serialNo) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await movieService.add({
        movieName,
        director,
        category,
        serialNo
      });

      if (response.success) {
        navigate('/confirmation', { state: { message: 'Movie added successfully' } });
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
          <h2>Add Movie</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="movieName">Movie Name *</label>
              <input
                type="text"
                id="movieName"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="director">Director *</label>
              <input
                type="text"
                id="director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="serialNo">Serial No *</label>
              <input
                type="text"
                id="serialNo"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Submit</button>
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

export default AddMovie;
