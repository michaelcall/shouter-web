import { Component, OnInit } from '@angular/core';
import { getDataService } from '../get-data.service';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private getDataService: getDataService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }


  routeAllUserList() {
    this.router.navigate(['all-users-list'])
  }

}
