import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  orderStatus = false;
  closeOrder = false;
  private socket: any;
  toggleSidebar = false;
  constructor(private router: Router, private http: HttpClient) {
    this.socket = io('http://localhost:8000/');
  }

  ngOnInit(): void {
    this.router.navigate(['/admin/orders']);
    this.http.get('http://localhost:8000/').subscribe((res: any) => {
      this.orderStatus = res.orderStatus;
      if (this.orderStatus) {
        this.closeOrder = true;
      }
    });

    this.socket.on('orderStatus', (res: { orderStatus: boolean }) => {
      this.orderStatus = res.orderStatus;
      if (res.orderStatus) {
        this.closeOrder = true;
      } else {
        this.closeOrder = false;
      }
    });
  }

  onShowSideBar() {
    if (window.innerWidth <= 800) {
      this.toggleSidebar = !this.toggleSidebar;
    } else {
      this.toggleSidebar = false;
    }
  }
}
