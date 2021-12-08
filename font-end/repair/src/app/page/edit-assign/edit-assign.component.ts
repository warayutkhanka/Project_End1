import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-assign',
  templateUrl: './edit-assign.component.html',
  styleUrls: ['./edit-assign.component.scss']
})
export class EditAssignComponent implements OnInit {

  assign: any;


  constructor(private mainService: mainService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.mainService.view_assign().then((res => {
      this.assign = res;
      console.log(this.assign)
    })).catch(err => {
      console.log(err);
    })
  }

}
