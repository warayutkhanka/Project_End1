import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mainService } from 'src/app/service/main.service';
import Swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  data: any = {
    user_id: localStorage.getItem('User_id')
  };

  data1: any = {};

  fullname: any;
  user_id: any = localStorage.getItem('User_id');
  f_name: any = localStorage.getItem('dataFname');
  s_name: any = localStorage.getItem('dataSname');
  email: any = localStorage.getItem('email');
  tel: any = localStorage.getItem('phone');
  titlename: any = localStorage.getItem('title_name');
  usertype: any = localStorage.getItem('dataUserstatus');

  constructor(
    private mainservice: mainService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  back() {
    if (this.usertype == 1) {
      this.router.navigate(['/HomeUser']);
    }
    else if (this.usertype == 2) {
      this.router.navigate(['/HomeAdmin']);
    }
    else {
      this.router.navigate(['/HomeTechnician']);
    }
  }

  openModal() {
    $('#modal1').modal('show');
  }
  closemodal() {
    $('#modal1').modal('hide');
  }

  changepassword() {
    if (this.data1.password1 != this.data.password) {
      if (this.data.password == this.data1.cf_password) {
        Swal.fire({
          title: 'ยืนยันการเปลี่ยนรหัสผ่าน',
          text: ' ',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'green',
          cancelButtonColor: 'red',
          confirmButtonText: 'เปลี่ยน',
          cancelButtonText: 'กลับ',
        }).then((result) => {
          if (result.isConfirmed) {
            this.mainservice.chpassword(this.data).then((res) => {
              console.log(res);
              Swal.fire('', `เปลี่ยนรหัสผ่านสำเร็จ`, 'success');
              location.href = '/';
            }).catch(err => {
              console.log(err)
            })
          }
        })
      } else {
        Swal.fire('', `รหัสผ่านใหม่ไม่ตรงกัน`, "error");
      }
    } else {
      Swal.fire('', `กรุณากรอกรหัสผ่านที่ไม่ซ้ำกัน`, "error");
    }

  }
  //     if (this.data1.password1 != this.data.password) {
  //       console.log(this.data.password);
  //       if (this.data.password == this.data1.cf_password) {
  //         Swal.fire({
  //           title: 'ลบผู้ใช้',
  //           text: ' ',
  //           icon: 'warning',
  //           showCancelButton: true,
  //           confirmButtonColor: 'green',
  //           cancelButtonColor: 'red',
  //           confirmButtonText: 'ลบ',
  //           cancelButtonText: 'กลับ',
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             this.mainservice.chpassword(this.data).then((res) => {
  //               console.log(res);
  //               Swal.fire('', `ลบสำเร็จ`, 'success');
  //               location.href = '/HomeAdmin/edit-user';
  //             }).catch(err => {
  //               console.log(err)
  //             })
  //             // console.log(this.data)
  //           } else {
  //             Swal.fire('', `รหัสผ่านใหม่ไม่ตรงกัน`, "error");
  //           }
  //         } else {
  //           Swal.fire('', `กรุณากรอกรหัสผ่านที่ไม่ซ้ำกัน`, "error");
  //         }
  //       }
  //     }
  //   }
  // }
}
