import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-view-assign',
  templateUrl: './view-assign.component.html',
  styleUrls: ['./view-assign.component.scss']
})
export class ViewAssignComponent implements OnInit {

  user_id: any = localStorage.getItem('User_id');
  body: any = {}
  assign_data: any;
  assign_id: any;
  assign_body: any;
  assign: any;
  request_img: any;


  constructor(private mainService: mainService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  editform = new FormGroup({
    assign_id: new FormControl(''),
    request_id: new FormControl(''),
    request_details: new FormControl(''),
    request_address: new FormControl(''),
    request_images: new FormControl(''),
    assign_status: new FormControl(''),
  })

  ngOnInit(): void {
    console.log('user_id-->', this.user_id);
    this.body = { user_id: this.user_id }
    this.mainService.getassign(this.body).then((res) => {
      console.log('get assign ==>', res);
      this.assign_data = res
    }).catch(err => {
      console.log(err);
    })
  }

  openModal(data: any) {
    $('#getassign').modal('show');
    this.assign_id = data.assign_id;
    this.assign_body = { assign_id: this.assign_id }
    console.log(this.assign_body);
    this.mainService.getassign_request(this.assign_body).then((res => {
      this.assign = res;
      let assignstatus = 1
      let status_id = 3
      this.request_img = this.assign[0].request_images
      // console.log(this.request_img)
      console.log('assign==>', this.assign);
      this.editform.controls['assign_id'].setValue(this.assign[0].assign_id);
      this.editform.controls['request_id'].setValue(this.assign[0].request_id);
      // this.editform.controls['request_id'].disable();
      this.editform.controls['request_details'].setValue(this.assign[0].request_details);
      this.editform.controls['request_details'].disable();
      this.editform.controls['request_address'].setValue(this.assign[0].request_address);
      this.editform.controls['request_address'].disable();
      this.editform.controls['request_images'].setValue(this.assign[0].request_images);
      this.editform.controls['request_images'].disable();
      this.editform.controls['assign_status'].setValue(assignstatus);

    })).catch(err => {
      console.log(err);
    })
  }
  closemodal() {
    $('#getassign').modal('hide');
  }

  update_assign() {
    console.log(this.editform.value)
    this.mainService.update_assign_start(this.editform.value).then((res => {
      console.log(res);
      Swal.fire('', 'รับงานสำเร็จ', 'success');
      location.href = '/view-assign'
    })).catch(err => {
      console.log(err);
    })
  }

  repair_start() {
    console.log('repair start', this.editform.value)
    this.mainService.repair_start(this.editform.value).then((res => {
      console.log(res);
    })).catch(err => {
      console.log(err);
    })
  }

  update_status() {
    console.log('update status request', this.editform.value)
    this.mainService.update_status_request(this.editform.value).then((res => {
      console.log(res)
    })).catch(err => {
      console.log(err)
    })
  }

  onclick() {
    this.update_assign();
    this.repair_start();
    this.update_status();
  }

}
