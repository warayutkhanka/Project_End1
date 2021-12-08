import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { FormControl, FormGroup } from '@angular/forms';


declare const $: any;

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss']
})
export class EditRequestComponent implements OnInit {

  getrequest: any;
  editrequest: any = {};
  data: any = {};
  equipment: any;
  status: any;

  constructor(private mainService: mainService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  editform = new FormGroup({
    request_id: new FormControl(''),
    fullname: new FormControl(''),
    equipment_id: new FormControl(''),
    request_address: new FormControl(''),
    request_details: new FormControl(''),
    request_images: new FormControl(''),
    status_id: new FormControl(''),
    request_date: new FormControl(''),
  })

  ngOnInit(): void {
    this.mainService.get_request().then((res: any) => {
      this.getrequest = res;
      console.log('usertype', this.getrequest);
    }).catch((err) => {
      console.log(' ERROR : ', err);
    })

    this.mainService.getstatus().then((res: any) => {
      this.status = res;
      console.log('status -->', this.status);
    }).catch((err) => {
      console.log(' ERROR : ', err);
    })
  }

  openfromedit(data: any) {
    $('#modal-edit-request').modal('show');
    console.log('edit form,-->', this.editform);
    this.data = data;
    console.log('=>', this.data);
    this.editform.controls['request_id'].setValue(data.request_id);
    // this.editform.controls['request_id'].disable();
    this.editform.controls['fullname'].setValue(data.fullname);
    // this.editform.controls['fullname'].disable();
    this.editform.controls['equipment_id'].setValue(data.equipment_id);
    // this.editform.controls['equipment_id'].disable();
    this.editform.controls['request_address'].setValue(data.request_address);
    this.editform.controls['request_details'].setValue(data.request_details);
    this.editform.controls['request_images'].setValue(data.request_images);
    this.editform.controls['status_id'].setValue(data.status_id);
    this.editform.controls['request_date'].setValue(data.request_date);
  }
  closemodal() {
    $('#modal-edit-request').modal('hide');
  }

  edit_request() {
    this.mainService.update_request(this.editform.value).then((res: any) => {
      console.log(this.editform.value);
      Swal.fire('', `แก้ไขข้อมูลสำเร็จ`, 'success');
      location.href = '/HomeAdmin/edit-request';
    }).catch(err => {
      console.log(err);
    })
  }

  deleterequest(request_id: any) {
    Swal.fire({
      title: 'ลบรายการแจ้งซ่อม',
      text: ' ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'กลับ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.mainService.delete_request(request_id).then((res: any) => {
          console.log(res);
          Swal.fire('', `ลบสำเร็จ`, 'success');
          location.href = '/HomeAdmin/edit-request';
        }).catch(err => {
          console.log(err);
          Swal.fire('', `เกิดข้อผิดพลาด ไม่สามารถทำรายการได้ <p><small>${err.error || err.toString()}</small></p>`, 'error');
        })
      }
    })
  }

}
