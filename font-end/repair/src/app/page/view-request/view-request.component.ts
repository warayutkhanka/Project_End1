import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss'],
})
export class ViewRequestComponent implements OnInit {

  user_id: any = localStorage.getItem('User_id');
  body: any
  data: any

  constructor(private mainService: mainService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.body = { user_id: this.user_id }
    this.mainService.ReportuserIDRequest(this.body).then((res => {
      this.data = res
      console.log(this.data)
    })).catch(err => {
      console.log(err)
    })
  }

}
