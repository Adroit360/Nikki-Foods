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
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c494',
          body: 'Banku with grilled tilapia',
          image: '../../assets/grilledTilapiawithbanku.jpeg',
          alt: 'Banku with tilapia',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c495',
          body: 'Jollof with grilled chicken',
          image: '../../assets/chickenwithjollof.jpeg',
          alt: 'jollof with grilled chicken',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c496',
          body: 'Beef jollof rice',
          image: '../../assets/beefjollofrice.jpeg',
          alt: 'beef jollof rice',
          price: '40.00',
        },
      ],
    },
    {
      day: 3,
      data: [
        {
          id: '33cc84aebc4b49b9bdc181782680c497',
          body: 'Naneflor(pork trotters/pigfeet) stew with rice',
          image: '../../assets/NaneFlorwithrice.jpeg',
          alt: 'Naneflor(pork trotters/pigfeet) stew with rice',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c498',
          body: 'Naneflor(pork trotters/pigfeet) stew with Ga kenkey',
          image: '../../assets/standardPack.jpeg',
          alt: 'Naneflor(pork trotters/pigfeet) stew with Ga kenkey',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c499',
          body: 'Fish stew with rice',
          image: '../../assets/standardPack.jpeg',
          alt: 'Fish stew with rice',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c100',
          body: 'Fish stew with ga Kenkey',
          image: '../../assets/standardPack.jpeg',
          alt: 'Fish stew with ga Kenkey',
          price: '40.00',
        },
      ],
    },
    {
      day: 4,
      data: [
        {
          id: '33cc84aebc4b49b9bdc181782680c101',
          body: 'Kontomire abom with ampesi',
          image: '../../assets/standardPack.jpeg',
          alt: 'Kontomire abom with ampesi',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c102',
          body: 'Garden eggs stew with ampesi',
          image: '../../assets/standardPack.jpeg',
          alt: 'Garden eggs stew with ampesi',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c103',
          body: "Waakye with all it's accompaniments",
          image: '../../assets/waakye.jpeg',
          alt: "Waakye with all it's accompaniments",
          price: '40.00',
        },
      ],
    },
    {
      day: 5,
      data: [
        {
          id: '33cc84aebc4b49b9bdc181782680c104',
          body: 'Palm nut soup with fufu',
          image: '../../assets/standardPack.jpeg',
          alt: 'Beans with plantain(Mini size)',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c105',
          body: 'Palm nut soup with plain rice',
          image: '../../assets/standardPack.jpeg',
          alt: 'Beans with plantain(Mini size)',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c106',
          body: 'Fresh tilapia soup with fufu',
          image: '../../assets/standardPack.jpeg',
          alt: 'Beans with plantain(Mini size)',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c107',
          body: 'Fresh tilapia soup with plain rice',
          image: '../../assets/standardPack.jpeg',
          alt: 'Beans with plantain(Mini size)',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c108',
          body: 'Afrafra Nkwan(Mixed Protein soup) with fufu',
          image: '../../assets/standardPack.jpeg',
          alt: 'Beans with plantain(Mini size)',
          price: '40.00',
        },
        {
          id: '33cc84aebc4b49b9bdc181782680c109',
          body: 'Afrafra Nkwan(Mixed Protein soup) with rice',
          image: '../../assets/standardPack.jpeg',
          alt: 'Beans with plantain(Mini size)',
          price: '40.00',
        },
      ],
    },
  ];

  // getFoodByID(day: number, id: string): Food {
  //   const food = this.foodArray.filter((item) => item.day === day)[0];
  //   return food.data.filter((item) => item.id === id)[0];
  // }

  // getAllFoods(day: number): Food[] {
  //   return this.foodArray.filter((item) => item.day === day)[0].data;
  // }

  // getClosingTime(): { closingTime: string; openingTime: string } {
  //   return { closingTime: this.closingTime, openingTime: this.openingTime };
  // }

  getFoodByID(day: number, id: string): Food {
    const food = this.foodArray.filter((item) => item.day === day)[0];
    return food.data.filter((item) => item.id === id)[0];
  }

  getAllFoods(day: number): { day: number; data: Food[] } {
    return this.foodArray.filter((item) => item.day === day)[0];
  }

  getClosingTime(): { closingTime: string; openingTime: string } {
    return { closingTime: this.closingTime, openingTime: this.openingTime };
  }
}
