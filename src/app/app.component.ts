
import { Component, OnInit } from '@angular/core';
import { DataService } from './api.service';
  
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData()
      .then(data => {
        this.data = data;
        console.log("this.data ->", this.data);
      })
      .catch(error => console.error('Error:', error));
  }
}