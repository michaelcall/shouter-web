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
        return false
      }
    }
    return true
  }

  ngOnInit() {
    this.getSelectedUser()
    this.getAllQbUsersActive()
  }

  // ON INIT FUNCTION
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
    this.getDataService.getAssociatedTeams(winnerId, loserId )
      .subscribe(
        (response:Response) => {
          const data = response.json();
          this.getAssociatedTeams = data.data
        },
        (error) => console.log(error)
      )
  }

  // POST GAME INFO
  postGame(gameObj, gameId ) {
    this.getDataService.postNewGame(gameObj, gameId)
      .subscribe(
        (response:Response) => {
          console.log(response);
        },
        (error) => console.log(error)
      )
  }

  // POST WINNER STATS
  postStats(winnerObj, loserObj, gameId) {
    this.getDataService.postStatAssignments(winnerObj, loserObj, gameId)
      .subscribe(
        (response:Response) => {
          console.log(response);
        },
        (error) => console.log(error)
      )
  }

  // // POST LOSER STATS
  // postLoser(loserObj, gameId) {
  //   this.getDataService.postLoser(loserObj, gameId)
  //     .subscribe(
  //       (response:Response) => {
  //         console.log(response);
  //       },
  //       (error) => console.log(error)
  //     )
  // }

  // ADD GAME TO DB
  addGame(gameObj, winnerObj, loserObj) {
    if (this.isRequired(gameObj) == false || this.isRequired(winnerObj) == false || this.isRequired(loserObj) == false ) {
      return null
    }
    else {
      let gameId = this.getDataService.idGenerator()
      this.postGame(gameObj, gameId )
      this.postStats(winnerObj, loserObj, gameId)
      // this.postLoser(loserObj, gameId)
    }
  }





}


