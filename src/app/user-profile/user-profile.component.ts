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
  profileName:string
  profileStatus:string
  userData:any

  constructor(
    private getDataService: getDataService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSelectedUser()
  }

  // GET USER PROFILE DATA
  getUserProfileData(selectedUser) {
    if (selectedUser) {
      this.getDataService.getUserProfile(selectedUser['entity-id'])
        .subscribe(
          (response:Response) => {
            const data = response.json();
            this.userData = data.data
          },
          (error) => console.log(error)
        )

      this.profileName = selectedUser.fn + " " + selectedUser.ln
      this.profileStatus = selectedUser['state-name']
    }
  }

  // ON INIT FUNCTION - GET SELECTED USER
  getSelectedUser() {
    this.selectedUser = this.getDataService.getSelectedUser()
    if (this.getDataService.isError(this.selectedUser.data['entity-id']) == false) {
      this.getUserProfileData(this.selectedUser.data)
    }
    else {
      alert('NO USER DATA - RETURN HOME'); return;
    }
  }

  // ROUTE TO ADD GAME
  onAddGame() {
    if (this.getDataService.isError(this.selectedUser) == false) {
      this.getDataService.saveSelectedUser( this.selectedUser.data )
      this.router.navigate(['user-game'])
    }
    else { alert('NO USER DATA - RETURN HOME') }
  }



}




