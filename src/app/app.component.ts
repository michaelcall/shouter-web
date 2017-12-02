import { Component, OnInit } from '@angular/core';
import { getDataService } from './get-data.service';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
   allActiveUsers:any;

  constructor(private getDataService: getDataService,
              private http: HttpClient,
              private router: Router,
  ) {}

  ngOnInit() {
    this.getAllQbUsersActive()
  }

  getAllQbUsersActive() {
    this.getDataService.getAssociatedUsers()
      .subscribe(
        (response:Response) => {
          const data = response.json();
          this.allActiveUsers = data.data
        },
        (error) => console.log(error)
      )
  }

  routeAllUserList() {
    this.router.navigate(['all-users-list'])
  }

}



