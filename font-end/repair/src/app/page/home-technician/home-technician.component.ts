import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-technician',
  templateUrl: './home-technician.component.html',
  styleUrls: ['./home-technician.component.scss']
})
export class HomeTechnicianComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    window.localStorage.clear();
    location.href = "/login";
  }

}
