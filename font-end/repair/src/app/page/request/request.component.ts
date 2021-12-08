import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  fname: any;
  sname: any;
  name: any;
  usertype: any = localStorage.getItem('dataUserstatus');
  datetime: any;

  data: any = {
    fullname: '',
    datetime: '',
    img: '',
    user_id: localStorage.getItem('User_id')
  };

  equipment: any;


  constructor(
    private api: mainService,
    private router: Router) { }

  ngOnInit(): void {
    this.api.equipment().then((res: any) => {
      this.equipment = res;
      // console.log(this.equipment);
    }).catch((err) => {
      console.log(' ERROR : ', err);
    })

    const date = new Date()
    this.datetime = date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    this.fname = localStorage.getItem('dataFname')
    this.sname = localStorage.getItem('dataSname')
    this.name = this.fname + ' ' + this.sname;
    this.data.fullname = this.name;

    // console.log('usertype ==>',this.usertype)

  }


  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.data.img = reader.result;
    };
  }


  async request() {
    this.data.fullname = this.name;
    if (!this.data.fullname) { Swal.fire('', `โปรดระบุ ชื่อ`, 'warning'); return; }
    if (!this.data.equipment_id) { Swal.fire('', `โปรดระบุ ชนิดอุปกรณ์`, 'warning'); return; }
    if (!this.data.request_address) { Swal.fire('', `โปรดเลือก ที่อยู่อุปกรณ์`, 'warning'); return; }
    if (!this.data.request_details) { Swal.fire('', `โปรดระบุ รายละเอียด`, 'warning'); return; }
    if (!this.data.img) { Swal.fire('', `โปรดระบุ รูปภาพ`, 'warning'); return; }
    console.log(this.data);
    this.api.request(this.data).then((res: any) => {
      console.log('แจ้งซ่อม : ', res);
      Swal.fire('', `แจ้งซ่อมสำเร็จ`, 'success');
      location.href = '/request';
    }).catch(err => {
      console.log('แจ้งซ่อม ERROR : ', err);
      Swal.fire('', `เกิดข้อผิดพลาด ไม่สามารถทำรายการได้ <p><small>${err.error || err.toString()}</small></p>`, 'error');
    });
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
}
