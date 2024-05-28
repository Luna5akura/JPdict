import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSearchComponent } from './word-search.component';

describe('WordSearchComponent', () => {
  let component: WordSearchComponent;
  let fixture: ComponentFixture<WordSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
