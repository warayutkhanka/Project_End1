import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

declare const $: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {};
  datauser: any;



  constructor(
    private api: mainService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.api.getlogin(this.user).then((res: any) => {
      if (res.user_typeid == 1) {
        this.datauser = res;
        localStorage.setItem('User_id', res.user_id)
        localStorage.setItem('dataUsername', res.username)
        localStorage.setItem('title_name', res.title_name)
        localStorage.setItem('dataFname', res.f_name)
        localStorage.setItem('dataSname', res.s_name)
        localStorage.setItem('email', res.email)
        localStorage.setItem('phone', res.tel)
        localStorage.setItem('dataUserstatus', res.user_typeid)
        // console.log(res);
        this.router.navigate(['/HomeUser']);
      }
      else if (res.user_typeid == 2) {
        localStorage.setItem('User_id', res.user_id)
        localStorage.setItem('dataUsername', res.username)
        localStorage.setItem('title_name', res.title_name)
        localStorage.setItem('dataFname', res.f_name)
        localStorage.setItem('dataSname', res.s_name)
        localStorage.setItem('email', res.email)
        localStorage.setItem('phone', res.tel)
        localStorage.setItem('dataUserstatus', res.user_typeid)
        this.router.navigate(['/HomeAdmin/dashboard']);
      }
      else {
        localStorage.setItem('User_id', res.user_id)
        localStorage.setItem('dataUsername', res.username)
        localStorage.setItem('title_name', res.title_name)
        localStorage.setItem('dataFname', res.f_name)
        localStorage.setItem('dataSname', res.s_name)
        localStorage.setItem('email', res.email)
        localStorage.setItem('phone', res.tel)
        localStorage.setItem('dataUserstatus', res.user_typeid)
        this.router.navigate(['/HomeTechnician']);
      }
    }).catch(err => {
      console.log('login Error! ', err);

      if (err.error == 'username invalid') {
        Swal.fire('', 'ไม่พบ username' + err.error, 'error');
        return;
      }
      else if (err.error == 'password invalid') {
        Swal.fire('', 'รหัสผ่านไม่ถูกต้อง' + err.error, 'warning');
        this.user.password = '';
        return;
      }
      Swal.fire('', 'เกิดข้อผิดพลาด ไม่สามารถทำรายการได้. ' + err.error, 'error');
    })
  }
}
