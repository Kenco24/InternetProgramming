// movie-create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  movieForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.movieForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      director: ['', [Validators.required, Validators.maxLength(50)]],
      genre: ['', [Validators.required, Validators.maxLength(50)]],
      plot: ['', [Validators.required, Validators.maxLength(500)]],
      cast: this.formBuilder.group({
        actor: ['', [Validators.required, Validators.maxLength(50)]],
        character: ['', [Validators.required, Validators.maxLength(50)]]
      }),
      oscars: this.formBuilder.group({
        category: ['', [Validators.required, Validators.maxLength(50)]],
        year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
      }),
      rating: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]]
    });
  }

  createMovie(): void {
    if (this.movieForm.valid) {
      const movieData = this.movieForm.value;
      this.moviesService.createMovie(movieData).subscribe(
        () => {
          console.log('Movie created successfully.');
          this.router.navigate(['/movie-list']);
        },
        (error) => {
          console.error('Error creating movie:', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/movie-list']);
    window.alert("Movie created succesffulyly");
    
  }
}
