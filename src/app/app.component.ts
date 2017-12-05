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
  parseLocation:any

  constructor(private getDataService: getDataService,
              private http: HttpClient,
              private router: Router,
  ) {}

  ngOnInit() {
    this.parseLocation = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
    if (this.parseLocation != 'home') { this.router.navigate(['home']) }
    else { return false }

  }



  routeAllUserList() {
    this.router.navigate(['all-users-list'])
  }

}



