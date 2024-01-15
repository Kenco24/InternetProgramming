// student.component.ts
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student: Student | undefined;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    // Subscribe to the observable to get updates when the student data changes
    this.studentService.getStudent().subscribe(student => {
      this.student = student;
    });
  }
}
