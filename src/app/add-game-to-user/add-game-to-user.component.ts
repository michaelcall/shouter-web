import { Component, OnInit } from '@angular/core';
import { getDataService } from '../get-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-add-game-to-user',
  templateUrl: './add-game-to-user.component.html',
  styleUrls: ['./add-game-to-user.component.css']
})
export class AddGameToUserComponent implements OnInit {

  selectedUserObj:any
  winner:any
  loser:any
  homeTeam:any
  getAssociatedTeams:any
  allActiveUsers:any

  constructor(
    private getDataService: getDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSelectedUser()
    this.getAllQbUsersActive()
  }

  getSelectedUser() {
    this.selectedUserObj = this.getDataService.getSelectedUser()
    console.log( this.selectedUserObj )
  }


  // GET ALL ACTIVE USERS
  getAllQbUsersActive() {
    this.getDataService.getActiveUserNames()
      .subscribe(
        (response:Response) => {
          const data = response.json();
          this.allActiveUsers = data.data
        },
        (error) => console.log(error)
      )
  }

  // GET ALL ASSOCIATED TEAMS TO THE WINNER AND LOSER
  getAllTeamsAssociated(winnerId, loserId) {

    console.log(winnerId)
    console.log(loserId)
    
    // this.getDataService.getAssociatedTeams()
    //   .subscribe(
    //     (response:Response) => {
    //       const data = response.json();
    //       this.getAssociatedTeams = data.data
    //     },
    //     (error) => console.log(error)
    //   )
  }




}


