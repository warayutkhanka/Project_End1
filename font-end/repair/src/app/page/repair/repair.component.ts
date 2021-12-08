import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss']
})
export class RepairComponent implements OnInit {

  body: any;
  body1: any;
  user_id: any = localStorage.getItem('User_id');
  repair_data: any;
  data: any;
  repair: any;
  status: any;

  constructor(private mainService: mainService) { }

  editform = new FormGroup({
    repair_id: new FormControl(''),
    assign_id: new FormControl(''),
    request_id: new FormControl(''),
    repair_details: new FormControl(''),
    repair_img: new FormControl(''),
    status_id: new FormControl(''),
  })

  ngOnInit(): void {
    this.body = { user_id: this.user_id }
    this.mainService.get_repair(this.body).then((res => {
      this.repair_data = res
      console.log(this.repair_data);
    })).catch(err => {
      console.log(err)
    })

    this.mainService.getstatus().then((res => {
      this.status = res;
      console.log(this.status);
    })).catch(err => {
      console.log(err);
    })
  }


  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      this.editform.controls['repair_img'].setValue(reader.result)
    };

  }


  openmodal(data: any) {
    $('#modelId').modal('show');
    this.data = data;
    this.body1 = { repair_id: this.data.repair_id }
    this.mainService.repair(this.body1).then((res => {
      this.repair = res
      this.editform.controls['repair_id'].setValue(this.repair[0].repair_id);
      this.editform.controls['assign_id'].setValue(this.repair[0].assign_id);
      this.editform.controls['request_id'].setValue(this.data.request_id);
      this.editform.controls['repair_details'].setValue(this.repair[0].repair_details);
      this.editform.controls['status_id'].setValue(this.repair[0].status_id);
      console.log(this.repair[0])
      // console.log('requestID',data.request_id)
    })).catch(err => {
      console.log(err);
    })

  }

  closemodal() {
    $('#modelId').modal('hide');
  }

  onclick() {
    this.update_Repair();
    this.update_request_status();

  }

  update_Repair() {
    console.log('update_repair', this.editform.value)
    this.mainService.update_repair(this.editform.value).then((res => {
      console.log(res)
      Swal.fire('', 'บันทึกข้อมูลสำเร็จ', 'success')
      location.href = '/repair';
    })).catch(err => {
      console.log(err)
    })
  }

  update_request_status() {
    console.log('update_request_status', this.editform.value)
    this.mainService.update_request_status(this.editform.value).then((res => {
      console.log(res)
    })).catch(err => {
      console.log(err)
    })
  }
}
