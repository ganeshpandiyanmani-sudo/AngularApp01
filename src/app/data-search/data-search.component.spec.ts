import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DataSearchComponent } from './data-search.component';

describe('DataSearchComponent', () => {
  let component: DataSearchComponent;
  let fixture: ComponentFixture<DataSearchComponent>;
  const originalEmployeeData = [
    { name: 'John Doe', location: 'New York', department: 'Sales' },
    { name: 'Jane Smith', location: 'Los Angeles', department: 'Marketing' },
    { name: 'Michael Johnson', location: 'Chicago', department: 'Finance' },
    { name: 'Emily Davis', location: 'Houston', department: 'Human Resources' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function resetEmployeeData(): void {
    component.listEmpData = [...originalEmployeeData];
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter employees by name', () => {
    component.searchControl.setValue('john');
    resetEmployeeData();

    component.applyFilter();

    expect(component.listEmpData).toEqual([
      { name: 'John Doe', location: 'New York', department: 'Sales' },
      { name: 'Michael Johnson', location: 'Chicago', department: 'Finance' }
    ]);
  });

  it('should filter employees by location or department', () => {
    component.searchControl.setValue('houston');
    resetEmployeeData();
    component.applyFilter();
    expect(component.listEmpData).toEqual([
      { name: 'Emily Davis', location: 'Houston', department: 'Human Resources' }
    ]);

    resetEmployeeData();
    component.searchControl.setValue('finance');
    component.applyFilter();
    expect(component.listEmpData).toEqual([
      { name: 'Michael Johnson', location: 'Chicago', department: 'Finance' }
    ]);
  });

  it('should match search values without regard to case', () => {
    resetEmployeeData();
    component.searchControl.setValue('NEW YORK');

    component.applyFilter();

    expect(component.listEmpData).toEqual([
      { name: 'John Doe', location: 'New York', department: 'Sales' }
    ]);
  });

  it('should keep all employees when the search value is empty', () => {
    resetEmployeeData();
    component.searchControl.setValue('');

    component.applyFilter();

    expect(component.listEmpData).toEqual(originalEmployeeData);
  });

  it('should apply the filter after the debounce period', fakeAsync(() => {
    resetEmployeeData();
    component.searchControl.setValue('marketing');

    tick(299);
    expect(component.listEmpData).toEqual(originalEmployeeData);

    tick(1);
    expect(component.listEmpData).toEqual([
      { name: 'Jane Smith', location: 'Los Angeles', department: 'Marketing' }
    ]);
  }));
});
