import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card',
  imports: [CdkDrag],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @ViewChild("card") card: ElementRef;
  @Input() suit: string;
  @Input() rank: number;
  @Input() order: number;
  private revealed: boolean = false;
  private tapped: boolean = false;
  private prevMousePos = { x: 0, y: 0 };

  setCard(suit: string, rank: number, order: number): void {
    this.suit = suit;
    this.rank = rank;
    this.order = order;
  }

  getSuit(): string {
    return this.suit;
  }

  getRank(): number {
    return this.rank;
  }

  getOrder(): number {
    return this.order;
  }

  getCard(): string {
    return this.revealed ? `${this.suit}${this.rank}` : "back";
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

    if (this.tapped) {
      this.card.nativeElement.style.rotate = "90deg";
      return;
    }

    this.card.nativeElement.style.rotate = "0deg";
  }
}
