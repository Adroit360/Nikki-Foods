import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { io } from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  orderStatus = false;
  closeOrder = false;
  private socket: any;
  showFailed = false;
  day = new Date().getDay();
  @Output('toggleSideBar') toggleSidebarEvent = new EventEmitter();
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.socket = io('https://nikki-foods-api.azurewebsites.net/');
    this.showFailed = activatedRoute.snapshot.queryParams['showFailed'];
    // console.log('showFailed', this.showFailed);
  }

  ngOnInit(): void {
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

  logOut(): void {
    this.authService
      .logOut()
      .then((res) => {
        this.router.navigate(['/login']);
      })
      .catch((err) => console.log(err));
  }

  onOpenOrders() {
    if (this.day === 6 || this.day === 0 || this.day === 1) {
      return;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .post(
        'https://nikki-foods-api.azurewebsites.net/api/openOrders',
        {},
        httpOptions
      )
      .subscribe();
    this.onToggleSidebar();
  }

  onCloseOrders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .post(
        'https://nikki-foods-api.azurewebsites.net/api/closeOrders',
        {},
        httpOptions
      )
      .subscribe();
    this.onToggleSidebar();
  }

  onToggleSidebar() {
    this.toggleSidebarEvent.emit(false);
  }
}
