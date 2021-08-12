import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public loggeduser;
  constructor() {
    const userJson = localStorage.getItem('loggeduser');
    this.loggeduser = userJson !== null ? JSON.parse(userJson) : '';
  }

  ngOnInit() {

  }

}
