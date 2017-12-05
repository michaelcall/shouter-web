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

  getAssociatedTeams() {
    return this.http.get('http://localhost:3000/teams/v1/associated/:winner_id/:loser_id', {withCredentials: true});
  }


  // POST CALLS FOR COMPONENTS
  postNewUser(obj) {
    var body = {'first_name':obj['fn'], 'last_name':obj['ln'], 'nick_name':obj['nickName'], 'team_id':obj['teamId'], 'state_name':'active'}
    return this.http.post( 'http://localhost:3000/users/add', body, {withCredentials: true})
  }




  // SELECTED USER FOR USER LIST TO USER PROFILE
  saveSelectedUser(obj) {
    this.userObj = obj
  }

  // GET SELECTED USER FOR USER LIST TO USER PROFILE
  getSelectedUser() {
    return this.userObj
  }

}


