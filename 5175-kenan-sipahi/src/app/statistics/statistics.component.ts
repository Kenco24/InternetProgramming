// statistics.component.ts
import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  statistics: any; // Update this type based on the actual structure

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.statisticsService.getStatistics().subscribe(
      (data) => {
        this.statistics = data;
        // Call methods to calculate other statistics if needed.
      },
      (error) => {
        console.error('Error loading statistics:', error);
      }
    );
  }
}
