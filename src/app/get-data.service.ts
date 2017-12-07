/**
 * Created by codev on 10/30/17.
 */
import {Injectable} from "@angular/core";
import {  Response, Http } from "@angular/http";
import 'rxjs/add/operator/map'
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class getDataService {
  userObj:any

  // NEW ID GENERATOR
  idGenerator() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  constructor (private  http:Http) {}


    // GET CALL FOR DATA
  getAssociatedUsers() {
    return this.http.get('http://localhost:3000/users', {withCredentials: true});
  }

  // GET ALL ACTIVE USER'S FIRST, LAST, AND ENTITY_ID
  getActiveUserNames() {
    return this.http.get('http://localhost:3000/users/v1/active-user-names', {withCredentials: true});
  }

  getAllNflteams() {
    return this.http.get('http://localhost:3000/teams/all/active', {withCredentials: true});
  }

  getAssociatedTeams(winnerId, loserId) {
    return this.http.get('http://localhost:3000/teams/v1/associated/' + winnerId + '/' + loserId, {withCredentials: true});
  }


  // POST CALLS FOR COMPONENTS
  postNewUser(obj) {
    var body = {'first_name':obj['fn'], 'last_name':obj['ln'], 'nick_name':obj['nickName'], 'team_id':obj['teamId'], 'state_name':'active'}
    return this.http.post( 'http://localhost:3000/users/add', body, {withCredentials: true})
  }

  postNewGame(obj, id) {
    var date = new Date(obj['gameDate']).toISOString().substring(0, 10)
    var body = {'entity_id':id, 'home_team_id':obj['homeTeam'], 'winner_person_id':obj['winner'], 'losser_person_id':obj['loser'], 'date_sent':date }
    return this.http.post( 'http://localhost:3000/games/add', body, {withCredentials: true})
  }

  postWinner(obj, id) {
    var body = {'game_id':id, 'person_id':obj['winner'], 'att_num':obj['winnerAtt'], 'comp_num':obj['winnerComp'], 'yds_num':obj['winnerYds'], 'winnerTd':obj['winnerYds'] }
    console.log(body)
    return this.http.post('http://localhost:3000/games/add/stats/winner', body, {withCredentials: true})
  }


// { winnerAtt:winnerAtt, winnerComp:winnerComp, winnerYds:winnerYds, winnerTd:winnerTd, winnerInt:winnerInt },
// { loserAtt:loserAtt, loserComp:loserComp, loserYds:loserYds, loserTd:loserTd, loserInt:loserInt }
//
//
// winner_person_id
// varchar(40)
// losser_person_id
// varchar(40)
// date_sent
// datetime
// home_team_id


// td
//   entity_id
//   person_id
//   game_id
//   td_num



  // SELECTED USER FOR USER LIST TO USER PROFILE
  saveSelectedUser(obj) {
    this.userObj = obj
  }

  // GET SELECTED USER FOR USER LIST TO USER PROFILE
  getSelectedUser() {
    return this.userObj
  }

}


