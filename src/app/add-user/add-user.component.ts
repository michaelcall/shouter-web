import { Component, OnInit } from '@angular/core';
import { getDataService } from '../get-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  allNflTeams:any

  // ng model variables
  fn:any
  ln:any
  nickName:any
  teamId:any

  constructor(
    private getDataService: getDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllNflTeams()
  }

  getAllNflTeams() {
    this.getDataService.getAllNflteams()
      .subscribe(
        (response:Response) => {
          const data = response.json();
          this.allNflTeams = data.data
        },
        (error) => console.log(error)
      )
  }

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

  addUser( obj ) {
    if (this.isRequired(obj) == true) {
      this.getDataService.postNewUser(obj)
      .subscribe(
        (response:Response) => {
          console.log(response);
        },
        (error) => console.log(error)
      )
    }

  }

}


