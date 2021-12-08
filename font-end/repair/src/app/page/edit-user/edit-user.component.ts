import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { FormControl, FormGroup } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: any;
  tempdata: any;
  data: any = {};
  usertype: any;


  constructor(private mainService: mainService) {

  }


  editform = new FormGroup({
    user_id: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    title_name: new FormControl(''),
    f_name: new FormControl(''),
    s_name: new FormControl(''),
    sex: new FormControl(''),
    user_typeid: new FormControl(''),
    email: new FormControl(''),
    tel: new FormControl(''),
  })

  ngOnInit(): void {
    this.mainService.getUserInfo().then((res: any) => {
      this.user = res;
      console.log('getUsers : ', this.user);
    }).catch(err => {
      console.log('getUsers ERROR : ', err);
    })

    this.mainService.usertype().then((res: any) => {
      this.usertype = res;
      console.log('usertype', this.usertype);
    }).catch((err) => {
      console.log(' ERROR : ', err);
    })
  }

  closemodal() {
    $('#modaledituser').modal('hide');
  }

  closemodal1() {
    $('#modaladduser').modal('hide');
  }

  openfromedit(data: any) {
    $('#modaledituser').modal('show');
    console.log(this.editform);
    this.data = data;
    console.log('=>', this.data);
    this.editform.controls['user_id'].setValue(this.data.user_id);
    this.editform.controls['username'].setValue(this.data.username);
    this.editform.controls['username'].disable();
    this.editform.controls['password'].setValue(this.data.password);
    this.editform.controls['password'].disable();
    this.editform.controls['title_name'].setValue(this.data.title_name);
    this.editform.controls['f_name'].setValue(this.data.f_name);
    this.editform.controls['s_name'].setValue(this.data.s_name);
    this.editform.controls['sex'].setValue(this.data.sex);
    this.editform.controls['user_typeid'].setValue(this.data.user_typeid);
    this.editform.controls['email'].setValue(this.data.email);
    this.editform.controls['tel'].setValue(this.data.tel);


  }

  edituser() {
    this.mainService.updateuser(this.editform.value).then((res: any) => {
      console.log(res);
      Swal.fire('', `แก้ไขผู้ใช้สำเร็จ`, 'success');
      location.href = '/HomeAdmin/edit-user';
    }).catch(err => {
      console.log(err);
    })
  }

  openfromadd() {
    $('#modaladduser').modal('show');
  }


  deleteuser(user_id: any) {
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
        this.mainService.deleteuser(user_id).then((res: any) => {
          console.log(res);
          Swal.fire('', `ลบสำเร็จ`, 'success');
          location.href = '/HomeAdmin/edit-user';
        }).catch(err => {
          console.log(err);
          Swal.fire('', `เกิดข้อผิดพลาด ไม่สามารถทำรายการได้ <p><small>${err.error || err.toString()}</small></p>`, 'error');
        })
      }
    })
  }

  adduser(data: any) {
    data = this.data;
    if (!this.data.username) { Swal.fire('', `โปรดระบุ username`, 'warning'); return; }
    if (!this.data.password) { Swal.fire('', `โปรดระบุ password`, 'warning'); return; }
    if (!this.data.titlename) { Swal.fire('', `โปรดเลือก คำนำหน้า`, 'warning'); return; }
    if (!this.data.fname) { Swal.fire('', `โปรดระบุ ชื่อ`, 'warning'); return; }
    if (!this.data.sname) { Swal.fire('', `โปรดระบุ นามสกุล`, 'warning'); return; }
    if (!this.data.email) { Swal.fire('', `โปรดระบุ อีเมล`, 'warning'); return; }
    if (!this.data.tel) { Swal.fire('', `โปรดระบุ เบอร์ติดต่อ`, 'warning'); return; }
    if (!this.data.sex) { Swal.fire('', `โปรดเลือก เพศ`, 'warning'); return; }
    console.log(data);
    this.mainService.getRegister(this.data).then((res: any) => {
      console.log('เพิ่มผู้ใช้ : ', res);
      Swal.fire('', `เพิ่มผู้ใช้สำเร็จ`, 'success');
      location.href = '/HomeAdmin/edit-user';
    }).catch(err => {
      console.log('Register ERROR : ', err);
      Swal.fire('', `เกิดข้อผิดพลาด ไม่สามารถทำรายการได้ <p><small>${err.error || err.toString()}</small></p>`, 'error');
    });
  }


}
