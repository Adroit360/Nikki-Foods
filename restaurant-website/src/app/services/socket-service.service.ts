import { Injectable } from '@angular/core';
import { Food } from '../models/interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  orderStatusEvent: Subject<boolean> = new Subject<boolean>();
  constructor() {}
  closingTime: string = '19:00:00';
  openingTime = '07:00:00';
  foodArray: { day: number; data: Food[] }[] = [
    {
      day: 2,
      data: [
        {
          id: '33cc84aebc4b49b9bdc181782680c493',
          body: 'Okro soup with banku',
          image: '../../assets/okrosoupandbanku.jpeg',
          alt: 'Okro soup with banku',
          price: '15.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c494',
          body: 'Banku with grilled tilapia',
          image: '../../assets/grilledTilapiawithbanku.jpeg',
          alt: 'Banku with tilapia',
          price: '15.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c495',
          body: 'Jollof with grilled chicken',
          image: '../../assets/chickenwithjollof.jpeg',
          alt: 'jollof with grilled chicken',
          price: '15.00',
        },
      ],
    },
    {
      day: 3,
      data: [
        {
          id: '33cc84aebc4b49b9bdc181782680c493',
          body: 'Gob3 small pack',
          image: '../../assets/standardPack.jpeg',
          alt: 'Beans with plantain(Mini size)',
          price: '15.00',
        },
      ],
    },
    {
      day: 4,
      data: [
        {
          id: '33cc84aebc4b49b9bdc181782680c493',
          body: 'Gob3 small pack',
          image: '../../assets/standardPack.jpeg',
          alt: 'Beans with plantain(Mini size)',
          price: '15.00',
        },
      ],
    },
    {
      day: 5,
      data: [
        {
          id: '33cc84aebc4b49b9bdc181782680c493',
          body: 'Gob3 small pack',
          image: '../../assets/standardPack.jpeg',
          alt: 'Beans with plantain(Mini size)',
          price: '15.00',
        },
      ],
    },
  ];

  getFoodByID(day: number, id: string): Food {
    const food = this.foodArray.filter((item) => item.day === day)[0];
    return food.data.filter((item) => item.id === id)[0];
  }

  getAllFoods(day: number): Food[] {
    return this.foodArray.filter((item) => item.day === day)[0].data;
  }

  getClosingTime(): { closingTime: string; openingTime: string } {
    return { closingTime: this.closingTime, openingTime: this.openingTime };
  }
}
