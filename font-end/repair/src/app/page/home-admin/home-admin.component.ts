import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    // window.location.reload();
  }

  logout() {
    if ("click") {
      Swal.fire('', `ออกจากระบบ`, 'success');
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }



}
