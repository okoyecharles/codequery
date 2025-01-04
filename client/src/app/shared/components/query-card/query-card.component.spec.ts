import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCardComponent } from './query-card.component';

describe('QueryCardComponent', () => {
  let component: QueryCardComponent;
  let fixture: ComponentFixture<QueryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
