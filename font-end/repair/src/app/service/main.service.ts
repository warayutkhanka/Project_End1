import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class mainService {
  constructor(private http: HttpClient) { }

  getlogin(form: any) {
    return this.http.post(environment.serverUrl + `/api/login`, form).toPromise();
  }

  getRegister(data: any) {
    return this.http.post(environment.serverUrl + `/api/register`, data).toPromise();
  }

  getUserInfo() {
    return this.http.get(environment.serverUrl + `/api/getusers`).toPromise();
  }

  request(data: any) {
    return this.http.post(environment.serverUrl + `/api/request`, data).toPromise();
  }

  equipment() {
    return this.http.get(environment.serverUrl + `/api/equipment`).toPromise();
  }

  usertype() {
    return this.http.get(environment.serverUrl + `/api/usertype`).toPromise();
  }
  usertype1() {
    return this.http.get(environment.serverUrl + `/api/getusertype1`).toPromise();
  }

  updateuser(updateuser: any) {
    return this.http.put(environment.serverUrl + `/api/updateuser`, updateuser).toPromise();
  }

  chpassword(data: any) {
    console.log(data)
    return this.http.put(environment.serverUrl + `/api/changepassword`, data).toPromise();
  }

  deleteuser(user_id: any) {
    const opt = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), body: { user_id: user_id }
    };
    return this.http.delete(environment.serverUrl + `/api/deleteuser`, opt).toPromise();
  }
  //  ==================== usertype ================
  addusertype(data: any) {
    return this.http.post(environment.serverUrl + `/api/addusertype`, data).toPromise();
  }

  updateusertype(data: any) {
    console.log("test", data)
    return this.http.put(environment.serverUrl + `/api/updateusertype`, data).toPromise();
  }

  deleteusertype(user_typeid: any) {
    console.log('data', user_typeid)
    const opt = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), body: { user_typeid: user_typeid }
    };
    return this.http.delete(environment.serverUrl + `/api/deleteusertype`, opt).toPromise();
  }

  //================ equipment =====================
  geteqipment() {
    return this.http.get(environment.serverUrl + `/api/getequipment`).toPromise();
  }

  addeqipment(data: any) {
    return this.http.post(environment.serverUrl + `/api/addequipment`, data).toPromise();
  }

  update_equipment(data: any) {
    return this.http.put(environment.serverUrl + `/api/update_equipment`, data).toPromise();
  }
  update_request(data: any) {
    console.log(data);
    return this.http.put(environment.serverUrl + `/api/update_request`, data).toPromise();
  }

  delete_equipment(equipment_id: any) {
    const opt = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), body: { equipment_id: equipment_id }
    };
    return this.http.delete(environment.serverUrl + `/api/delete_equipment`, opt).toPromise();
  }

  //================ request =====================
  getrequest() {
    return this.http.get(environment.serverUrl + `/api/showrequest`).toPromise();
  }

  delete_request(request_id: any) {
    console.log(request_id);
    const opt = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), body: { request_id: request_id }
    };
    return this.http.delete(environment.serverUrl + `/api/delete_request`, opt).toPromise();
  }


  //================= status =====================
  getstatus() {
    return this.http.get(environment.serverUrl + `/api/status`).toPromise();
  }

  assign_work(data: any) {
    console.log(data)
    return this.http.post(environment.serverUrl + `/api/assignwork`, data).toPromise();
  }

  getassign(user_id: any) {
    return this.http.post(environment.serverUrl + `/api/get_assign`, user_id).toPromise();
  }

  getassign_request(assign_id: any) {
    return this.http.post(environment.serverUrl + `/api/get_assign_requesr`, assign_id).toPromise();
  }

  repair_start(data: any) {
    return this.http.post(environment.serverUrl + `/api/repair_start`, data).toPromise();
  }

  update_assign_start(data: any) {
    console.log(data);
    return this.http.put(environment.serverUrl + `/api/update_assign`, data).toPromise();
  }

  get_repair(data: any) {
    return this.http.post(environment.serverUrl + `/api/get_repair`, data).toPromise();
  }

  repair(data: any) {
    return this.http.post(environment.serverUrl + `/api/repair`, data).toPromise();
  }

  update_repair(data: any) {
    console.log(data);
    return this.http.put(environment.serverUrl + `/api/update_repair`, data).toPromise();
  }

  update_request_status(data: any) {
    console.log(data);
    return this.http.put(environment.serverUrl + `/api/update_repair_status`, data).toPromise();
  }

  view_assign() {
    return this.http.get(environment.serverUrl + `/api/viewassign`).toPromise();
  }

  view_repair() {
    return this.http.get(environment.serverUrl + `/api/viewrepair`).toPromise();
  }

  report_request() {
    return this.http.get(environment.serverUrl + `/api/report_request`).toPromise();
  }

  report_repair() {
    return this.http.get(environment.serverUrl + `/api/report_repair`).toPromise();
  }

  get_request() {
    return this.http.get(environment.serverUrl + `/api/get_request`).toPromise();
  }

  add_status(data: any) {
    return this.http.post(environment.serverUrl + `/api/add_status`, data).toPromise();
  }

  ReportuserIDRequest(data: any) {
    return this.http.post(environment.serverUrl + `/api/report_user_request`, data).toPromise();
  }

  update_status(data: any) {
    return this.http.put(environment.serverUrl + `/api/update_status`, data).toPromise();
  }

  delete_status(data: any) {
    console.log(data)
    const opt = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), body: { status_id: data }
    };
    return this.http.delete(environment.serverUrl + `/api/delete_status`, opt).toPromise();
  }

  update_status_request(data: any) {
    return this.http.put(environment.serverUrl + `/api/update_status_request`, data).toPromise();
  }

  get_request_equipment() {
    return this.http.get(environment.serverUrl + `/api/get_request_equipment`).toPromise();
  }

  report_last_request() {
    return this.http.get(environment.serverUrl + `/api/report_last_request`).toPromise();
  }





}