import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { FormControl, FormGroup } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-edit-repair',
  templateUrl: './edit-repair.component.html',
  styleUrls: ['./edit-repair.component.scss']
})
export class EditRepairComponent implements OnInit {

  getrepair: any;
  repair: any;
  img: any;
  status: any;

  constructor(private mainService: mainService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  editform = new FormGroup({
    repair_id: new FormControl(''),
    assign_id: new FormControl(''),
    repair_details: new FormControl(''),
    repair_end: new FormControl(''),
    status_id: new FormControl(''),
    repair_img: new FormControl(''),
  })

  ngOnInit(): void {
    this.mainService.view_repair().then((res => {
      this.getrepair = res
      console.log('repair==>', this.getrepair)
    })).catch(err => {
      console.log(err)
    })

    this.mainService.getstatus().then((res => {
      this.status = res
      console.log(this.status)
    })).catch(err => {
      console.log(err)
    })

  }

  closemodal() {
    $('#update_repair').modal('hide');
  }

  openmodal(data: any) {
    $('#update_repair').modal('show');
    this.repair = data;
    this.img = this.repair.repair_imgs;
    this.editform.controls['repair_id'].setValue(this.repair.repair_id);
    this.editform.controls['assign_id'].setValue(this.repair.assign_id);
    this.editform.controls['repair_details'].setValue(this.repair.repair_details);
    this.editform.controls['repair_img'].setValue(this.img);
    this.editform.controls['status_id'].setValue(this.repair.status_id);
  }

  test() {
    this.mainService.update_repair(this.editform.value).then((res) => {
      console.log(res)
      Swal.fire('', 'แก้ไขสำเร็จ', 'success');
      location.href = '/HomeAdmin/edit-repair';
    }).catch(err => {
      console.log(err)
    })
  }


}
