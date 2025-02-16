import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQueryDialogComponent } from './delete-query-dialog.component';

describe('DeleteQueryDialogComponent', () => {
  let component: DeleteQueryDialogComponent;
  let fixture: ComponentFixture<DeleteQueryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteQueryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQueryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
