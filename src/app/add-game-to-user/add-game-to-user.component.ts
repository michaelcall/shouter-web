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
  gameDate:any

  // variables for game winner
  winnerAtt:any
  winnerComp:any
  winnerYds:any
  winnerTd:any
  winnerInt:any

  // variables for game loser
  loserAtt:any
  loserComp:any
  loserYds:any
  loserTd:any
  loserInt:any



  getAssociatedTeams:any
  allActiveUsers:any

  constructor(
    private getDataService: getDataService,
    private router: Router
  ) { }


  isRequired(obj){
    for (var key in obj) {
      if (obj[key] == undefined || obj[key] == null || obj[key].length == 0  ) {
        console.log('false')
        return false
      }
    }
    console.log('true')
    return true
  }

  ngOnInit() {
    this.getSelectedUser()
    this.getAllQbUsersActive()
  }

  getSelectedUser() {
    this.selectedUserObj = this.getDataService.getSelectedUser()
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

    console.log('winner and loser ids')
    console.log(winnerId)
    console.log(loserId)

    this.getDataService.getAssociatedTeams(winnerId, loserId )
      .subscribe(
        (response:Response) => {
          const data = response.json();
          this.getAssociatedTeams = data.data
        },
        (error) => console.log(error)
      )
  }

  addGame(gameObj, winnerObj, loserObj) {

    if (this.isRequired(gameObj) == false || this.isRequired(winnerObj) == false || this.isRequired(loserObj) == false  ) {
      console.log('not safe')
    }
    else {
      console.log('save')
      this.getDataService.postNewGame(gameObj)
        .subscribe(
          (response:Response) => {
            console.log(response);
          },
          (error) => console.log(error)
        )
    }
  }




}


