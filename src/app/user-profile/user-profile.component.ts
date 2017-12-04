import { Component, OnInit } from '@angular/core';
import { getDataService } from '../get-data.service';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  selectedUser:any

  constructor(
    private getDataService: getDataService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSelectedUser()
  }

  getSelectedUser() {
    this.selectedUser = this.getDataService.getSelectedUser()
    console.log(this.selectedUser)
  }



}




