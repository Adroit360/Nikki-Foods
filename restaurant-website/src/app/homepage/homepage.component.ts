import { SocketService } from './../services/socket-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  private socket: any;
  day = new Date().getDay();
  // day = 6;
  isMenuAvailable = false;
  constructor(
    private router: Router,
    private socketService: SocketService,
    private http: HttpClient
  ) {
    this.socket = io('https://nikki-foods-api.azurewebsites.net/');
  }

  foodArray: any;
  closingTime: string = '';
  currentTime: string = '';
  closed = false;
  public orderStatus: boolean = false;
  breakTime: { closingTime: string; openingTime: string } = {
    closingTime: '',
    openingTime: '',
  };
  closingTimeError = false;
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.http
      .get('https://nikki-foods-api.azurewebsites.net/')
      .subscribe((res: any) => {
        this.orderStatus = res.orderStatus;
        if (this.orderStatus) {
          this.closingTimeError = true;
        }
      });

    this.socket.on('orderStatus', (res: { orderStatus: boolean }) => {
      this.orderStatus = res.orderStatus;
    });

    if (this.day === 6 || this.day === 0 || this.day === 1) {
      this.closingTimeError = true;
      this.closed = true;
    } else {
      // get the food based on the current day
      this.foodArray = this.socketService.getAllFoods(this.day);
      this.closed = false;
    }
  }

  onProceedToOrderPage(id: number): void {
    if (this.orderStatus) {
      this.closingTimeError = true;
    } else if (this.foodArray.day !== this.day) {
      if (this.day === 6 || this.day === 0 || this.day === 1) {
        this.closingTimeError = true;
      } else {
        this.isMenuAvailable = true;
      }
    } else {
      this.closingTimeError = false;
      this.router.navigate(['/orders', id]);
    }
  }

  onSetTodaysMenu() {
    this.foodArray = this.socketService.getAllFoods(this.day);
  }

  onCloseLocationModal() {
    this.foodArray = this.socketService.getAllFoods(this.day);
    this.isMenuAvailable = false;
    window.scroll(0, 0);
  }
}
