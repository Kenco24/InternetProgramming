import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { isNumeric } from '../common/utils';
import { Movie } from '../models/client';
import { ConfirmationDialogService } from '../confirmation-dialog.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
  ) { }
  
  
 
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.moviesService.getMovieById(id)),
    ).subscribe({
      next: movie => {
        this.movie = movie;
      },
      error: err => console.log(err)
    });
  }

  goBack() {
    this.router.navigate(['/movie-list']);
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
      },
      (error) => {
        console.error('Error deleting movie:', error);
      }
    );
  }
  redirectToActorDetails(actorName: string) {
    // Assuming your actor details route is named 'actor-details'
    this.router.navigate(['/actor-details', actorName]);
  }

  editMovie(movie : Movie){
    this.router.navigate(['/movie', movie.id,"edit"]);
  }
  
}



