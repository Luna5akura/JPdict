// front/src/app/word-search/tag-explanation.component.ts

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-tag-explanation',
  templateUrl: './tag-explanation.component.html',
  standalone: true,
  imports: [
    NgStyle
  ],
  styleUrls: ['./tag-explanation.component.scss']
})
export class TagExplanationComponent implements OnInit, OnChanges {
  @Input() explanation: string = '';
  @Input() x: number = 0;
  @Input() y: number = 0;

  styles: any = {};

  ngOnInit(): void {
    this.updateStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['x'] || changes['y'] || changes['explanation']) {
      this.updateStyles();
    }
  }

  updateStyles(): void {
    this.styles = {
      top: `${this.y}px`,
      left: `${this.x}px`,
      display: this.explanation ? 'block' : 'none'
    };
  }
}
