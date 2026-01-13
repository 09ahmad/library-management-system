import { Response } from 'express';
import { db } from '../models/database';
import { AuthRequest } from '../middleware/auth';

export class MovieController {
  static getAllMovies = (req: AuthRequest, res: Response) => {
    const movies = db.getAllMovies();
    res.json({ success: true, data: movies });
  };

  static addMovie = (req: AuthRequest, res: Response) => {
    const { movieName, director, category, serialNo } = req.body;

    if (!movieName || !director || !category || !serialNo) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const existingMovie = db.getAllMovies().find(m => m.serialNo === serialNo);
    if (existingMovie) {
      return res.status(400).json({ 
        success: false, 
        message: 'Movie with this serial number already exists' 
      });
    }

    const newMovie = {
      movieName,
      director,
      category,
      serialNo,
      availability: 'Available' as const
    };

    db.addMovie(newMovie);
    res.json({ success: true, data: newMovie, message: 'Movie added successfully' });
  };

  static updateMovie = (req: AuthRequest, res: Response) => {
    const { serialNo } = req.params;
    const { movieName, director, category } = req.body;

    const movies = db.getAllMovies();
    const existingMovie = movies.find(m => m.serialNo === serialNo);
    if (!existingMovie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    const updates: any = {};
    if (movieName) updates.movieName = movieName;
    if (director) updates.director = director;
    if (category) updates.category = category;

    const success = db.updateMovie(serialNo, updates);
    if (success) {
      const updatedMovie = db.getAllMovies().find(m => m.serialNo === serialNo);
      res.json({ success: true, data: updatedMovie, message: 'Movie updated successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to update movie' });
    }
  };
}
