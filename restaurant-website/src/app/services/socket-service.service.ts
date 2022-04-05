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
  foodArray: Food[] = [
    {
      id: '33cc84aebc4b49b9bdc181782680c493',
      body: 'Gob3 small pack',
      image: '../../assets/standardPack.jpeg',
      alt: 'Beans with plantain(Mini size)',
      price: '15.00',
    },
    {
      id: '3646754e10574da3a16a90e2ecff5e06',
      body: 'Gob3 standard pack(Full size)',
      image: '../../assets/gob3StandardPackFull.jpeg',
      alt: 'Gob3 standard pack(Full size)',
      price: '20.00',
    },
    {
      id: '4226d4f1e91e404880345bc18be88e5b',
      body: 'gob3 premium pack',
      image: '../../assets/fullSize.jpeg',
      alt: 'gob3 premium pack',
      price: '40.00',
    },
    {
      id: 'ddbf19c31b9c4844865bf59fbb8fc985',
      body: 'gob3 with egg',
      image: '../../assets/withEgg.jpeg',
      alt: 'gob3 with fish',
      price: '17.00',
    },
    {
      id: 'ab62ad68aff443afa4c827a78a22e3a3',
      body: 'gob3 with fish',
      image: '../../assets/withFish.jpeg',
      alt: 'gob3 with fish',
      price: '23.00',
    },
    {
      id: '6fe15e03186f478b8c2399ae70a51960',
      body: 'gob3 with chicken',
      image: '../../assets/withChicken.jpeg',
      alt: 'gob3 with chicken',
      price: '23.00',
    },
    {
      id: 'c4d3ddc886c540149323387915598847',
      body: 'gob3 with gizzard',
      image: '../../assets/withGizzard.jpeg',
      alt: 'gob3 with gizzard',
      price: '25.00',
    },

    {
      id: '4d2da93389ce48aa8841c56891494942',
      body: 'Jumbo pack',
      image: '../../assets/jumboPack.jpeg',
      alt: 'Jumbo pack',
      price: '40.00',
    },
    {
      id: 'c92a574c98634a70998b71d110f51fd5',
      body: 'aboboi',
      image: '../../assets/aboboi.jpg',
      alt: 'aboboi',
      price: '25.00',
    },
    {
      id: '91fcca31cba046fea468af2c659bcf86',
      body: '3tor (mini pack)',
      image: '../../assets/etorMiniPack.jpeg',
      alt: '3tor (mini pack)',
      price: '40.00',
    },
    {
      id: 'b29a20e95dc64369b225355c8f696c21',
      body: '3tor in Ayewa',
      image: '../../assets/EtorInAyewa.jpeg',
      alt: '3tor in Ayewa',
      price: '75.00',
    },
    {
      id: '596e88701eaf40e6aedb4fb1c5753e4e',
      body: '3tor cake(1 tier)',
      image: '../../assets/gob3Cake.jpeg',
      alt: '3tor in Ayewa',
      price: '350.00',
    },
    {
      id: '6e43e30afe3e43289b55b29b0bcefb05',
      body: '3otr cake(1 tier big)',
      image: '../../assets/gob3Cake.jpeg',
      alt: '3tor in Ayewa',
      price: '400.00',
    },
    {
      id: '99a22ef88cc44fffa947d0fc16cccee1',
      body: '3tor cake 2 tier',
      image: '../../assets/gob3Cake.jpeg',
      alt: '3tor in Ayewa',
      price: '550.00',
    },
  ];

  getFoodByID(id: string): Food {
    return this.foodArray.filter((item) => item.id === id)[0];
  }

  getAllFoods(): Food[] {
    return this.foodArray;
  }

  getClosingTime(): { closingTime: string; openingTime: string } {
    return { closingTime: this.closingTime, openingTime: this.openingTime };
  }
}
