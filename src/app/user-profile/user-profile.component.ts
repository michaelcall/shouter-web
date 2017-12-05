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

  isError(item){
    if (item == null || item == undefined || item.length == 0 ) { return true }
    else { return false }
  }


  ngOnInit() {
    this.getSelectedUser()
  }

  getSelectedUser() {
    this.selectedUser = this.getDataService.getSelectedUser()
    console.log(this.selectedUser)
  }

  onAddGame() {

    if (this.isError(this.selectedUser) == false) {
      this.getDataService.saveSelectedUser( this.selectedUser )
      this.router.navigate(['user-game'])
    }
    else {
      alert('NO USER DATA - RETURN HOME')
    }

  }



}




