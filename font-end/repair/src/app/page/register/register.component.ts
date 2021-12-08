import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

declare const $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  data: any = {};

  constructor(
    private mainservice: mainService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async register() {
    if (!this.data.username) { Swal.fire('', `โปรดระบุ username`, 'warning'); return; }
    if (!this.data.password) { Swal.fire('', `โปรดระบุ password`, 'warning'); return; }
    if (!this.data.titlename) { Swal.fire('', `โปรดเลือก คำนำหน้า`, 'warning'); return; }
    if (!this.data.fname) { Swal.fire('', `โปรดระบุ ชื่อ`, 'warning'); return; }
    if (!this.data.sname) { Swal.fire('', `โปรดระบุ นามสกุล`, 'warning'); return; }
    if (!this.data.email) { Swal.fire('', `โปรดระบุ อีเมล`, 'warning'); return; }
    if (!this.data.tel) { Swal.fire('', `โปรดระบุ เบอร์ติดต่อ`, 'warning'); return; }
    if (!this.data.sex) { Swal.fire('', `โปรดเลือก เพศ`, 'warning'); return; }
    console.log('form create', this.data);
    this.mainservice.getRegister(this.data).then((res: any) => {
      console.log('Register : ', res);
      Swal.fire('', `สมัครสมาชิกสำเร็จ`, 'success');
      location.href = '/';
    }).catch(err => {
      console.log('Register ERROR : ', err);
      Swal.fire('', `เกิดข้อผิดพลาด ไม่สามารถทำรายการได้ <p><small>${err.error || err.toString()}</small></p>`, 'error');
    });
  }

}
