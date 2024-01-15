// statistics.service.ts
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { MoviesService } from './movies.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private moviesService: MoviesService) {}

  getStatistics(): Observable<any> {
    return forkJoin({
      movies: this.moviesService.getAllMovies(),
      actors: this.moviesService.getAllActors(),
    });
  }

  // You can add methods to calculate other statistics based on the data retrieved.
}
