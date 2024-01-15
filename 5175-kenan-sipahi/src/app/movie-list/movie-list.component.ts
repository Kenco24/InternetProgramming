// movie-list.component.ts
import { Component } from '@angular/core';
import { Movie } from '../models/client';
import { Subscription } from 'rxjs';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies: Movie[] = [];
  movieSubscription$?: Subscription;
  sortField: string = ''; // Updated property name
  sortDirection: string = 'asc';

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  viewMovie(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
  }

  editMovie(movie: Movie) {
    this.router.navigate(['/movie', movie.id, 'edit']);
  }

  loadMovies() {
    this.moviesService.getAllMovies().subscribe(
      (movies) => {
        this.movies = movies;
      },
      (error) => {
        console.error('Error loading movies:', error);
      }
    );
  }

  openDeleteConfirmationDialog(movie: Movie) {
    const confirmDelete = this.confirmationDialogService.confirm(`Are you sure you want to delete "${movie.title}"?`);
    if (confirmDelete) {
      this.deleteMovie(movie);
    }
  }

  deleteMovie(movie: Movie) {
    this.moviesService.deleteMovie(movie.id).subscribe(
      () => {
        console.log('Movie deleted successfully.');
        this.loadMovies(); // Refresh the movie list after deletion
      },
      (error) => {
        console.error('Error deleting movie:', error);
      }
    );
  }

  // Updated method to set sorting field
  sort(field: string) {
    this.sortField = field;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
}
