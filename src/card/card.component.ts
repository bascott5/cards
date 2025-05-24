import { Component } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card',
  imports: [CdkDrag],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  private suit: string;
  private rank: number;
  private revealed: boolean = false;
  private tapped: boolean = false;
  private prevMousePos = { x: 0, y: 0 };

  setCard(suit: string, rank: number): void {
    this.suit = suit;
    this.rank = rank;
  }

  getSuit(): string {
    return this.suit;
  }

  getRank(): number {
    return this.rank;
  }

  getCard(): string {
    return this.revealed ? `${this.suit}${this.rank}` : `back`;
  }

  onMouseDownCard(e: any): void {
    this.prevMousePos = { x: e.clientX, y: e.clientY };
  }

  onMouseUpCard(e: any): void {
    if (
      e.clientX === this.prevMousePos.x &&
      e.clientY === this.prevMousePos.y
    ) {
      if (this.revealed) {
        this.toggleTapped();
        return;
      }

      this.revealCard();
    }
  }

  revealCard(): void {
    this.revealed = true;
  }

  toggleTapped(): void {
    this.tapped = !this.tapped;
  }
}
