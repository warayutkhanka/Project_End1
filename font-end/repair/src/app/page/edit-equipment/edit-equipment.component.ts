import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { FormControl, FormGroup } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.scss']
})
export class EditEquipmentComponent implements OnInit {
  equipment: any;
  data: any = {};

  constructor(private mainService: mainService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  editform = new FormGroup({
    equipment_id: new FormControl(''),
    equipment_name: new FormControl(''),
  })

  ngOnInit(): void {
    this.mainService.geteqipment().then((res: any) => {
      this.equipment = res;
      console.log('usertype', this.equipment);
    }).catch((err) => {
      console.log(' ERROR : ', err);
    })
  }

  closemodal() {
    $('#modal-edit-equipment').modal('hide');
  }

  closemodal1() {
    $('#addequipment').modal('hide');
  }

  openfromadd() {
    $('#addequipment').modal('show');
  }

  openfromedit(data: any) {
    $('#modal-edit-equipment').modal('show');
    // console.log(this.editform);
    this.data = data;
    console.log(this.data)
    this.editform.controls['equipment_id'].setValue(this.data.equipment_id);
    this.editform.controls['equipment_name'].setValue(this.data.equipment_name);
  }

  addequipment(data: any) {
    data = this.data;
    if (!this.data.equipment_name) { Swal.fire('', `โปรดระบุ ชื่ออุปกรณ์`, 'warning'); return; }
    console.log(data);
    this.mainService.addeqipment(this.data).then((res: any) => {
      console.log('เพิ่มอุปกรณ์ : ', res);
      Swal.fire('', `เพิ่มอุปกรณ์สำเร็จ`, 'success');
      location.href = '/HomeAdmin/edit-equipment';
    }).catch(err => {
      console.log('Register ERROR : ', err);
      Swal.fire('', `เกิดข้อผิดพลาด ไม่สามารถทำรายการได้ <p><small>${err.error || err.toString()}</small></p>`, 'error');
    });
  }

  editequipment() {
    this.mainService.update_equipment(this.editform.value).then((res: any) => {
      Swal.fire('', `แก้ไขอุปกรณ์สำเร็จ`, 'success');
      location.href = '/HomeAdmin/edit-equipment';
    }).catch(err => {
      console.log(err);
    })
  }

  delete_equipment(equipment_id: any) {
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
        this.mainService.delete_equipment(equipment_id).then((res: any) => {
          Swal.fire('', `ลบสำเร็จ`, 'success');
          location.href = '/HomeAdmin/edit-equipment';
        }).catch(err => {
          console.log(err);
          Swal.fire('', `เกิดข้อผิดพลาด ไม่สามารถทำรายการได้ <p><small>${err.error || err.toString()}</small></p>`, 'error');
        })
      }
    })
  }


}
