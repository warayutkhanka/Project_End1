import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { FormControl, FormGroup } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  getrequest: any;
  editrequest: any = {};
  data: any = {};
  equipment: any;
  status: any;
  request: any = {};
  getusertype: any

  constructor(private mainService: mainService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  editform = new FormGroup({
    request_id: new FormControl(''),
    user_id: new FormControl(''),
    request_address: new FormControl(''),
    request_details: new FormControl(''),
    request_images: new FormControl(''),
    status_id: new FormControl(''),

  })

  ngOnInit(): void {
    this.mainService.getrequest().then((res: any) => {
      this.getrequest = res;
    }).catch((err) => {
      console.log(' ERROR : ', err);
    })

    this.mainService.usertype1().then((res: any) => {
      this.getusertype = res;
      console.log(this.getusertype)
    }).catch((err) => {
      console.log(' ERROR : ', err);
    })

    this.mainService.getstatus().then((res: any) => {
      this.status = res;
    }).catch((err) => {
      console.log(' ERROR : ', err);
    })
  }

  openmodal(data: any) {
    $('#assign').modal('show');
    this.request = data;
    let status_ID = 2
    console.log(this.request)
    this.editform.controls['request_id'].setValue(data.request_id);
    this.editform.controls['request_address'].setValue(data.request_address);
    this.editform.controls['request_address'].disable();
    this.editform.controls['request_details'].setValue(data.request_details);
    this.editform.controls['request_details'].disable();
    this.editform.controls['request_images'].setValue(data.request_images);
    this.editform.controls['request_images'].disable();
    this.editform.controls['status_id'].setValue(status_ID);
  }

  closemodal() {
    $('#assign').modal('hide');
  }

  assign_work() {
    console.log('assign', this.editform.value)
    if (this.editform.value.user_id == '') {
      Swal.fire('', `กรุณาระบุข้อมูลให้ครบถ้วน`, 'error');
    } else {
      this.mainService.assign_work(this.editform.value).then((res) => {
        Swal.fire('', `มอบหมายงานสำเร็จ`, 'success');
        location.href = "/HomeAdmin/assign"
        console.log('from==>', res)
      }).catch(err => {
        console.log(err);
      })
      this.update_status()
    }

  }

  update_status() {
    // console.log('update', this.editform.value)
    this.mainService.update_request_status(this.editform.value).then((res) => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }


}
