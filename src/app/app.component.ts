import { Component, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Card } from '../card-type';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-root',
  imports: [CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'cards';
  deck: Card[] = new Array(52);
  @ViewChildren(CardComponent) cardComponents: QueryList<CardComponent>;

  ngAfterViewInit(): void {
    const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const suits = ["clubs", "diamonds", "hearts", "spades"];

    let i = 0;
    for (let j = 0; j < suits.length; j++) {
      for (let k = 0; k < ranks.length; k++) {
        this.cardComponents.get(i)!.setCard(suits[j], ranks[k], i + 1);
        i++;
      }
    }

    this.shuffle();
  }

  shuffle(): void {
    for (let i = this.deck.length - 1; i < 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }

    for (let i = 0; i < this.deck.length; i++) {
      this.cardComponents.get(i)!.setCard(this.deck[i].suit, this.deck[i].rank, 0);
    }
  }
}
