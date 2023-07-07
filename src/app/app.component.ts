
import { Component, OnInit } from '@angular/core';
import { DataService } from './api.service';
  
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any;
  name: string = '';
  message: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData()
      .then(data => {
        this.data = data;
        console.log("this.data ->", this.data);
      })
      .catch(error => console.error('Error:', error));
  }

  submitMessage() {
    this.dataService.submitMessage(this.name, this.message)
      .then(() => {
        console.log("Message submitted successfully!");
      })
      .catch(err => {
        console.error("Error sumitting message:", err);
      });
  }
}