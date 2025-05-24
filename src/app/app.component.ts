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
        this.cardComponents.get(i)!.setCard(suits[j], ranks[k]);
        i++;
      }
    }

    this.shuffle();
  }

  shuffle(): void {
    let rng = Math.floor(Math.random() * this.cardComponents.length - 1) + 0;
    let shuffledCards: Map<string, null> = new Map();
    let i = 0;
    let temp: CardComponent;

    while (i < this.deck.length) {
      if (
        this.cardComponents.get(i)!.getCard() in shuffledCards ||
        this.cardComponents.get(rng)!.getCard() in shuffledCards
      ) {
        continue;
      }

      temp = this.cardComponents.get(i)!;
      this.cardComponents.get(i)!.setCard(this.cardComponents.get(rng)!.getSuit(), this.cardComponents.get(rng)!.getRank());
      this.cardComponents.get(rng)!.setCard(temp.getSuit(), temp.getRank());

      rng = Math.floor(Math.random() * this.cardComponents.length - 1) + 0;
      i++;
    }
  }
}
