// actor-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css'],
})
export class ActorDetailsComponent {
  
  actorDetails: any;  // Update this type based on your API response or data structure

  
}
