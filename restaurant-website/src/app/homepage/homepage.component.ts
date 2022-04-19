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
  constructor(
    private router: Router,
    private socketService: SocketService,
    private http: HttpClient
  ) {
    // this.socket = io('http://localhost:8000/');
    this.socket = io('http://localhost:8000/');
  }

  foodArray: any;
  closingTime: string = '';
  currentTime: string = '';
  public orderStatus: boolean = false;
  breakTime: { closingTime: string; openingTime: string } = {
    closingTime: '',
    openingTime: '',
  };
  closingTimeError = false;
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.http.get('http://localhost:8000/').subscribe((res: any) => {
      this.orderStatus = res.orderStatus;
      if (this.orderStatus) {
        this.closingTimeError = true;
      } else {
        this.closingTimeError = false;
      }
    });

    this.socket.on('orderStatus', (res: { orderStatus: boolean }) => {
      this.orderStatus = res.orderStatus;
      if (res.orderStatus) {
        this.closingTimeError = true;
      } else {
        this.closingTimeError = false;
      }
    });

    // get the food based on the current day
    // this.foodArray = this.socketService.getAllFoods(new Date().getDay());
    this.foodArray = this.socketService.getAllFoods(3);
  }

  onProceedToOrderPage(id: number): void {
    if (this.orderStatus) {
      this.closingTimeError = true;
    } else if (this.foodArray.day !== new Date().getDay()) {
      if (
        new Date().getDay() === 6 ||
        new Date().getDay() === 0 ||
        new Date().getDay() === 1
      ) {
        this.closingTimeError = true;
      } else {
        this.foodArray = this.socketService.getAllFoods(new Date().getDay());
      }
    } else {
      this.closingTimeError = false;
      console.log(this.foodArray);
      this.router.navigate(['/orders', id]);
    }
  }
}
