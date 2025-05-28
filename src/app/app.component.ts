import { Component, AfterViewInit, ViewChildren, QueryList, OnInit } from '@angular/core';
import { Card } from '../card-type';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-root',
  imports: [CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cards';
  deck: Card[] = new Array(52);

  ngOnInit(): void {
    const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const suits = ["clubs", "diamonds", "hearts", "spades"];

    let i = 0;
    for (let j = 0; j < suits.length; j++) {
      for (let k = 0; k < ranks.length; k++) {
        this.deck[i] = {
          suit: suits[j],
          rank: ranks[k],
        }
        i++;
      }
    }

    this.shuffle();
  }

  shuffle(): void {
    let tempRank = 0;
    let tempSuit = "";
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      tempRank = this.deck[i].rank;
      this.deck[i].rank = this.deck[j].rank;
      this.deck[j].rank = tempRank;

      tempSuit = this.deck[i].suit;
      this.deck[i].suit = this.deck[j].suit;
      this.deck[j].suit = tempSuit;
    }
  }

  onMouseDownCard(i: number): void {
    if (i === 51) {
      return;
    }
    
    if (i === 50) {
      [this.deck[50], this.deck[51]] = [this.deck[51], this.deck[50]];
      return;
    }

    let temp: Map<number, Card> = new Map();
    temp.set(51, this.deck[i]);
    temp.set(i, this.deck[51]);
    for (let j = i + 1; j < this.deck.length; j++) {
      temp.set(j - 1, this.deck[j]);
    }

    for (let j = i; j < this.deck.length; j++) {
      this.deck[j] = temp.get(j) as Card;
    }
  }
}
