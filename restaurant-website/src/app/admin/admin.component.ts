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
  day = new Date().getDay();
  constructor(private router: Router, private http: HttpClient) {
    this.socket = io('https://nikki-foods-api.azurewebsites.net/');
  }

  ngOnInit(): void {
    this.router.navigate(['/admin/orders']);
    this.http
      .get('https://nikki-foods-api.azurewebsites.net/')
      .subscribe((res: any) => {
        this.orderStatus = res.orderStatus;
        if (
          this.orderStatus ||
          this.day === 6 ||
          this.day === 0 ||
          this.day === 1
        ) {
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
