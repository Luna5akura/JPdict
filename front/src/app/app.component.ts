// front/src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WordSearchComponent } from './word-search/word-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, WordSearchComponent],
  template: '<app-word-search></app-word-search>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'word-search-app';
}
