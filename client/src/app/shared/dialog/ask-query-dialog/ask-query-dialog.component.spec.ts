import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQueryDialogComponent } from './ask-query-dialog.component';

describe('AskQueryDialogComponent', () => {
  let component: AskQueryDialogComponent;
  let fixture: ComponentFixture<AskQueryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskQueryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskQueryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
