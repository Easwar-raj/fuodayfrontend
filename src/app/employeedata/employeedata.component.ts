import { Component } from '@angular/core';

@Component({
  selector: 'app-employeedata',
  standalone: false,
  templateUrl: './employeedata.component.html',
  styleUrl: './employeedata.component.scss'
})
export class EmployeedataComponent {
  employeeData = [
    { id: 'EMP001', name: 'John Doe', email: 'john@example.com', phone: '1234567890', dept: 'HR' },
    { id: 'EMP002', name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210', dept: 'Finance' },
    { id: 'EMP003', name: 'Alice Johnson', email: 'alice@example.com', phone: '1112223333', dept: 'IT' },
    { id: 'EMP004', name: 'Bob Brown', email: 'bob@example.com', phone: '4445556666', dept: 'Admin' },
    { id: 'EMP005', name: 'Charlie Green', email: 'charlie@example.com', phone: '7778889999', dept: 'Marketing' },
    { id: 'EMP006', name: 'David Lee', email: 'david@example.com', phone: '8887776666', dept: 'Sales' },
    { id: 'EMP007', name: 'Eva Adams', email: 'eva@example.com', phone: '2223334444', dept: 'Support' },
    { id: 'EMP008', name: 'Frank White', email: 'frank@example.com', phone: '5554443333', dept: 'IT' },
    { id: 'EMP009', name: 'Grace Hall', email: 'grace@example.com', phone: '6665554444', dept: 'Legal' },
    { id: 'EMP010', name: 'Hank Ford', email: 'hank@example.com', phone: '3332221111', dept: 'R&D' }
  ];

  rowsPerPage = 10;
  currentPage = 1;

  get paginatedData() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.employeeData.slice(start, start + this.rowsPerPage);
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.employeeData.length / this.rowsPerPage)).fill(0).map((_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  confirmDelete(index: number) {
    const globalIndex = (this.currentPage - 1) * this.rowsPerPage + index;
    this.employeeData.splice(globalIndex, 1);
    if ((this.currentPage - 1) * this.rowsPerPage >= this.employeeData.length) {
      this.currentPage = Math.max(this.currentPage - 1, 1);
    }
  }
}
