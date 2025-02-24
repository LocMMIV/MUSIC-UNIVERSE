import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSongComponent } from './list-song.component';

describe('ListSongComponent', () => {
  let component: ListSongComponent;
  let fixture: ComponentFixture<ListSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSongComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
