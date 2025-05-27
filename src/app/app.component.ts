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
          order: i + 1
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
    if (this.deck.length !== 52) {
      return;
    }
    
    if (this.deck[i].order === 52) {
      return;
    }

    // TODO: Find a better way of bringing current card to the top while pushing all other cards down by one
    const prevOrder = this.deck[i].order;
    for (let j = 0; j < this.deck.length; j++) {
      if (this.deck[j].order === 52) {
        this.deck[j].order = prevOrder;
      }
    }

    this.deck[i].order = 52;
  }
}
