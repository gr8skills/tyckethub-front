import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-comparison-detail',
  templateUrl: './movie-comparison-detail.component.html',
  styleUrls: ['./movie-comparison-detail.component.scss']
})
export class MovieComparisonDetailComponent implements OnInit {
  displayStyle = {};
  constructor() { }

  ngOnInit(): void {
  }

  toggleSearchBox(toggleState: boolean): void {

  }
}
