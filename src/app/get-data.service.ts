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

  getAllNflteams() {
    return this.http.get('http://localhost:3000/teams/all/active', {withCredentials: true});
  }


  // POST CALLS FOR COMPONENTS
  postNewUser(obj) {
    var body = {'first_name':obj['fn'], 'last_name':obj['ln'], 'nick_name':obj['nickName'], 'team_id':obj['teamId'], 'state_name':'active'}
    return this.http.post( 'http://localhost:3000/users/add', body, {withCredentials: true})
  }




  // UI DATA
  saveSelectedUser(obj) {
    this.userObj = obj
  }

  getSelectedUser() {
    return this.userObj
  }

}


