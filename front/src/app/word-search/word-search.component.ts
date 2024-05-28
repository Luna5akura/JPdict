// front/src/app/word-search/word-search.component.ts

import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WordService } from '../word.service';
import { TagExplanationComponent } from './tag-explanation.component';
import tagBank from '../../../assests/data/tag_bank_1.json';

@Component({
  selector: 'app-word-search',
  standalone: true,
  imports: [CommonModule, FormsModule, TagExplanationComponent],
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.scss'],
  providers: [WordService],
  encapsulation: ViewEncapsulation.None,
})


export class WordSearchComponent {
  searchTerm: string = '';
  searchResults: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;
  bgColors = ['#f0f8ff', '#faebd7', '#e6e6fa', '#ffe4e1', '#f0ffff', '#f5f5dc'];
  bgImage = 'assests/bg.jpg';

  constructor(private wordService: WordService) { }

  currentPage = 1;
  totalPages = 1;
  pagedResults: any[] = [];
  pages: number[] = [];
  visiblePages: (number | -1)[] = []; // -1 represents '...'
  gotoPage = 1;
  tagExplanation: string = '';
  explanationX: number = 0;
  explanationY: number = 0;
  explanationStyle: any = {};
  search() {
    this.currentPage = 1
    this.errorMessage = '';
    this.isLoading = true;
    this.searchResults = [];
    this.wordService.searchWord(this.searchTerm, this.currentPage).subscribe(
      data => {
        this.searchResults = data.results;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;
        this.pagedResults = data.results;
        this.pages = Array(this.totalPages).fill(0).map((_, i) => i + 1);
        this.isLoading = false;
        this.updateVisiblePages();
      },
      error => {
        this.errorMessage = 'Word not found';
        this.isLoading = false;
      }
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.gotoPage = page;
      this.wordService.searchWord(this.searchTerm, this.currentPage).subscribe(
        data => {
          this.pagedResults = data.results;
          this.updateVisiblePages();
        }
      );
    }
  }
  updateVisiblePages() {
    const maxVisiblePages = 5;
    const middlePage = Math.ceil(maxVisiblePages / 2);

    if (this.totalPages <= maxVisiblePages) {
      this.visiblePages = this.pages;
    } else {
      let startPage = Math.max(this.currentPage - middlePage + 1, 1);
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = endPage - maxVisiblePages + 1;
      }

      this.visiblePages = [];
      if (startPage > 1) {
        this.visiblePages.push(1);
        if (startPage > 2) {
          this.visiblePages.push(-1); // Represents '...'
        }
      }
      for (let i = startPage; i <= endPage; i++) {
        this.visiblePages.push(i);
      }
      if (endPage < this.totalPages) {
        if (endPage < this.totalPages - 1) {
          this.visiblePages.push(-1); // Represents '...'
        }
        this.visiblePages.push(this.totalPages);
      }
    }
  }
  onBgImageSelected(event: any) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.bgImage = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    }
  }
  getTagExplanation(tag: string, event: MouseEvent): void {
    const tagInfo = tagBank.find(item => item[0] === tag);
    // @ts-ignore
    this.tagExplanation = tagInfo ? tagInfo[3] : '';
    const offsetX = -15
    const offsetY = 40
    this.explanationX = event.clientX + offsetX;
    this.explanationY = event.clientY + offsetY;
    this.explanationStyle = {
      top: this.explanationY + 'px',
      left: this.explanationX + 'px',
      color: 'black',
    };
  }
}
