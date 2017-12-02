import { Component, OnInit } from '@angular/core';
import { getDataService } from '../get-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';



@Component({
  selector: 'app-all-user-list',
  templateUrl: './all-user-list.component.html',
  styleUrls: ['./all-user-list.component.css']
})
export class AllUserListComponent implements OnInit {

  allActiveUsers:any

  constructor(
    private getDataService: getDataService,
    private router: Router
  ) { }

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

  onAddButton() {
    this.router.navigate(['add-user'])
  }

}


