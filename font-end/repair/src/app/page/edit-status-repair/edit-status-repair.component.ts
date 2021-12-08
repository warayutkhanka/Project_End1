import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { FormControl, FormGroup } from '@angular/forms';
declare const $: any;

@Component({
  selector: 'app-edit-status-repair',
  templateUrl: './edit-status-repair.component.html',
  styleUrls: ['./edit-status-repair.component.scss']
})
export class EditStatusRepairComponent implements OnInit {

  getstatus: any;
  data: any;
  body: any

  constructor(private mainService: mainService) { }

  editform = new FormGroup({
    status_id: new FormControl(''),
    status_name: new FormControl(''),
  })


  ngOnInit(): void {
    this.mainService.getstatus().then((res => {
      this.getstatus = res
      console.log(this.getstatus)
    })).catch(err => {
      console.log(err)
    })
  }


  openaddstatus() {
    $('#addstatus').modal('show');
  }

  editstatus(data: any) {
    $('#edit-status').modal('show');
    this.data = data
    this.editform.controls['status_id'].setValue(this.data.status_id);
    this.editform.controls['status_name'].setValue(this.data.status_name);
  }

  closemodal() {
    $('#edit-status').modal('hide');
  }

  closemodal1() {
    $('#addstatus').modal('hide');

  }

  addstatus() {
    this.mainService.add_status(this.editform.value).then((res => {
      console.log(res)
      Swal.fire('', 'เพิ่มสถานะสำเร็จ', 'success')
      location.href = '/HomeAdmin/edit-status';
    })).catch(err => {
      console.log(err)
    })
  }

  edit_status() {
    console.log(this.editform.value)
    this.mainService.update_status(this.editform.value).then((res) => {
      console.log(res)
      Swal.fire('', 'แก้ไขสถานะสำเร็จ', 'success')
      location.href = '/HomeAdmin/edit-status';
    }).catch(err => {
      console.log(err)
    })
  }

  delete_status(status_id: any) {
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
        console.log(status_id)
        // this.body = { status_id: status_id }
        this.mainService.delete_status(status_id).then((res: any) => {
          console.log(res);
          Swal.fire('', `ลบสำเร็จ`, 'success');
          location.href = '/HomeAdmin/edit-status';
        }).catch(err => {
          console.log(err);
          Swal.fire('', `เกิดข้อผิดพลาด ไม่สามารถทำรายการได้ <p><small>${err.error || err.toString()}</small></p>`, 'error');
        })
      }
    })
  }

}
