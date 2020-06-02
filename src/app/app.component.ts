import { Component, OnInit } from '@angular/core';
import { AppService } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'jasmine-demo';

  constructor(protected appService: AppService) { }

  ngOnInit(): void {
    this.appService.get().subscribe(
      (result) => {
        console.log(result);
      }
    );
  }
}
