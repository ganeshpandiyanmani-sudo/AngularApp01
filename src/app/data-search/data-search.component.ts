import { Component,OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime,distinctUntilChanged, startWith, takeUntil, filter} from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface empData{
  name:string;
  location:string;
  department:string;
}

@Component({
  selector: 'app-data-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './data-search.component.html',
  styleUrl: './data-search.component.css'
})
export class DataSearchComponent implements OnInit, OnDestroy {

  searchControl = new FormControl('');
  employeeData: empData[] = [];
   listEmpData: empData[] = [
    { name: 'John Doe', location: 'New York', department: 'Sales' },
    { name: 'Jane Smith', location: 'Los Angeles', department: 'Marketing' }, 
    { name: 'Michael Johnson', location: 'Chicago', department: 'Finance' },
    { name: 'Emily Davis', location: 'Houston', department: 'Human Resources' }];

 

  ngOnInit(): void {
   
    this.searchControl.valueChanges.pipe(debounceTime(300),distinctUntilChanged(),startWith('')).subscribe(x=>{
      console.log('Values changed');
      this.applyFilter();

    });


  }

  ngOnDestroy(): void {
  }

  applyFilter():void{
    const searchValue = (this.searchControl.value ?? '').toLowerCase();
    this.listEmpData= this.listEmpData.filter(obj => {     
      return obj.name.toLowerCase().includes(searchValue) ||
      obj.location.toLowerCase().includes(searchValue) ||
      obj.department.toLowerCase().includes(searchValue)
    });

  }

}
