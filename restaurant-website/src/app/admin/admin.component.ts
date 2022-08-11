import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { OrderDetailsAdmin } from '../models/interface';
import { OrderType } from '../single-order/single-order.component';

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
  showFailed = false;

  allOrders: OrderDetailsAdmin[] = [];
  failedOrders: OrderDetailsAdmin[] = [];
  deliveredOrders: OrderDetailsAdmin[] = [];

  currentPage = 'orders';

  orders$: Observable<OrderDetailsAdmin[]>;

  notificationAudio = new Audio('../../assets/Short-notification-sound.mp3');
  isFirstTime = true;
  showOrderDetails = false;
  itemLength: number = 0;
  subscriptions: Subscription[] = [];
  totalAmount = 0;
  totalOrders = 0;
  amountTobePayed = 0;
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  endDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).setHours(23, 59, 59, 999);
  foodOrdered: OrderDetailsAdmin[] = [];

  paidOrders!: OrderDetailsAdmin[];

  OrderType = OrderType;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore
  ) {
    this.socket = io('https://nikki-foods-api.azurewebsites.net/');
    this.showFailed = activatedRoute.snapshot.queryParams['showFailed'];

    this.orders$ = this.onGetTotalOrdersCollection();
    let itemSubs = this.orders$.subscribe((res) => {
      if (!this.isFirstTime && res.length > this.itemLength)
        this.notificationAudio.play();
      else this.isFirstTime = false;

      this.itemLength = res.length;
    });

    // get the total orders and total amount
    this.orders$.subscribe((items) => {
      console.log(items);
      this.totalAmount = 0;
      this.totalOrders = 0;
      this.foodOrdered = [];
      this.deliveredOrders = [];
      this.failedOrders = [];
      items.forEach((item) => {
        if (
          parseInt(item.date) >= this.startDate.getTime() &&
          parseInt(item.date) <= this.endDate
        ) {
          if (item.orderPaid) {
            if (!item.completed) {
              this.foodOrdered.push(item);
            } else {
              this.deliveredOrders.push(item);
            }
            this.totalAmount += parseFloat(item.priceOfFood);
            this.totalOrders += 1;
          } else {
            this.failedOrders.push(item);
          }
        }
      });
      this.paidOrders = items.filter(
        (item) => item.completed === false && item.orderPaid
      );
      this.amountTobePayed = +(this.totalAmount * 0.8).toFixed(2); // calculate 20% of the total food revenue
    });

    this.subscriptions.push(itemSubs);
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

  onShowSideBar() {
    if (window.innerWidth <= 800) {
      this.toggleSidebar = !this.toggleSidebar;
    } else {
      this.toggleSidebar = false;
    }
  }

  onGetTotalOrdersCollection(): Observable<any> {
    return this.firestore
      .collection('orders', (orders) =>
        orders
          .where('date', '>=', this.startDate.getTime().toString())
          .where('date', '<=', this.endDate.toString())
          .orderBy('date', 'desc')
      )
      .valueChanges({ idField: 'Id' });
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

  onToggleSidebar(page?: string) {
    this.toggleSidebar = false;
    if (page) {
      this.currentPage = page;
    }
  }
}
