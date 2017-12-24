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

  isError(item){
    if (item == null || item == undefined || item.length == 0 ) { return true }
    else { return false }
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

  getUserProfile(id) {
    return this.http.get('http://localhost:3000/users/v1/profile/' + id, {withCredentials: true});
  }


  // POST CALLS FOR COMPONENTS
  postNewUser(obj) {
    var body = {'first_name':obj['fn'], 'last_name':obj['ln'], 'nick_name':obj['nickName'], 'team_id':obj['teamId'], 'state_name':'active'}
    return this.http.post( 'http://localhost:3000/users/add', body, {withCredentials: true})
  }

  postNewGame(obj, id) {
    var date = new Date(obj['gameDate']).toISOString().substring(0, 10)
    var body = {'game_id':id, 'home_team_id':obj['homeTeam'], 'date_played':date, 'winner_id':obj['winner'], 'loser_id':obj['loser'] }
    return this.http.post( 'http://localhost:3000/games/add', body, {withCredentials: true})
  }

  postStatAssignments(wobj, lobj, id) {
    var body = {'game_id':id, 'winner_id':wobj['winner'], 'watt_num':wobj['winnerAtt'], 'wcomp_num':wobj['winnerComp'], 'wyds_num':wobj['winnerYds'], 'wtd_num':wobj['winnerTd'], 'wint_num':wobj['winnerInt'],
      'loser_id':lobj['loser'], 'latt_num':lobj['loserAtt'], 'lcomp_num':lobj['loserComp'], 'lyds_num':lobj['loserYds'], 'ltd_num':lobj['loserTd'], 'lint_num':lobj['loserInt']
    }
    return this.http.post('http://localhost:3000/games/add/v2/stat-assignments', body, {withCredentials: true})
  }
  //
  // postLoser(obj, id) {
  //   var body = {'game_id':id, 'person_id':obj['loser'], 'att_num':obj['loserAtt'], 'comp_num':obj['loserComp'], 'yds_num':obj['loserYds'], 'td_num':obj['loserTd'], 'int_num':obj['loserInt'], 'outcome':0 }
  //   return this.http.post('http://localhost:3000/games/add/v2/game-assignment', body, {withCredentials: true})
  // }

 // UI DATA

  // SELECTED USER
  saveSelectedUser(obj) {
   this.userObj = {data: obj}
  }

  // GET SELECTED USER
  getSelectedUser() {
    if (this.isError(this.userObj) == false) {
      return this.userObj
    }
    else {
      alert('NO USER DATA - GO HOME')
      return
    }

  }

}


