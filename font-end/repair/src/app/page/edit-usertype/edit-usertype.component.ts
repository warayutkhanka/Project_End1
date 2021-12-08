import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { FormControl, FormGroup } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-edit-usertype',
  templateUrl: './edit-usertype.component.html',
  styleUrls: ['./edit-usertype.component.scss']
})
export class EditUsertypeComponent implements OnInit {

  usertype: any;
  data: any = {};

  constructor(private mainService: mainService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  editform = new FormGroup({
    user_typeid: new FormControl(''),
    user_typename: new FormControl(''),
  })

  ngOnInit(): void {
    this.mainService.usertype().then((res: any) => {
      this.usertype = res;
      console.log('usertype', this.usertype);
    }).catch((err) => {
      console.log(' ERROR : ', err);
    })
  }

  openfromadd() {
    $('#addusertype').modal('show');
  }

  closemodal() {
    $('#modal-edit-usertype').modal('hide');
  }
  closemodal1() {
    $('#addusertype').modal('hide');
  }


  openfromedit(data: any) {
    $('#modal-edit-usertype').modal('show');
    console.log(this.editform);
    this.data = data;
    console.log('=>', this.data);
    this.editform.controls['user_typeid'].setValue(this.data.user_typeid);
    this.editform.controls['user_typename'].setValue(this.data.user_typename);
  }

  editusertype() {
    console.log(this.editform.value)
    this.mainService.updateusertype(this.editform.value).then((res: any) => {
      console.log(res);
      Swal.fire('', `แก้ไขประเภทผู้ใช้สำเร็จ`, 'success');
      location.href = '/HomeAdmin/edit-usertype';
    }).catch(err => {
      console.log(err);
    })
  }

  addusertype(data: any) {
    data = this.data;
    if (!this.data.user_typename) { Swal.fire('', `โปรดระบุ user typename`, 'warning'); return; }
    console.log(data);
    this.mainService.addusertype(this.data).then((res: any) => {
      console.log('เพิ่มประเภทผู้ใช้ : ', res);
      Swal.fire('', `เพิ่มผู้ประเภทใช้สำเร็จ`, 'success');
      location.href = '/HomeAdmin/edit-usertype';
    }).catch(err => {
      console.log('Register ERROR : ', err);
      Swal.fire('', `เกิดข้อผิดพลาด ไม่สามารถทำรายการได้ <p><small>${err.error || err.toString()}</small></p>`, 'error');
    });
  }

  deleteusertype(user_typeid: any) {
    console.log(user_typeid)
    Swal.fire({
      title: 'ลบผู้ใช้',
      text: ' ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'กลับ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.mainService.deleteusertype(user_typeid).then((res: any) => {
          console.log(res);
          Swal.fire('', `ลบสำเร็จ`, 'success');
          location.href = '/HomeAdmin/edit-usertype';
        }).catch(err => {
          console.log(err);
          Swal.fire('', `เกิดข้อผิดพลาด ไม่สามารถทำรายการได้ <p><small>${err.error || err.toString()}</small></p>`, 'error');
        })
      }
    })
  }
}


