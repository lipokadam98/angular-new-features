import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../models/course.model";
import {EditCourseDialogData} from "./edit-course-dialog.data.model";
import {CoursesService} from "../services/courses.service";
import {LoadingIndicatorComponent} from "../loading/loading.component";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CourseCategoryComboboxComponent} from "../course-category-combobox/course-category-combobox.component";
import {CourseCategory} from "../models/course-category.model";
import {firstValueFrom} from "rxjs";
import {createCourse} from "../../../server/create-course.route";

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {
  matDialogRef = inject(MatDialogRef);
  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);

  fb = inject(FormBuilder);
  coursesService = inject(CoursesService);

  form = this.fb.group({
    title: new FormControl("", [Validators.required]),
    longDescription: new FormControl("", [Validators.required]),
    iconUrl: new FormControl("", [Validators.required])
  })

  category = signal<CourseCategory>("BEGINNER");

  constructor() {
    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      iconUrl: this.data?.course?.iconUrl,
    })

    this.category.set(this.data?.course?.category ?? 'BEGINNER');
    effect(() => {
      const category = this.category();
      console.log(category)
    });
  }

  onClose() {
    this.matDialogRef.close();
  }

  async onSave() {
    const courseProps = this.form.value as Partial<Course>;
    courseProps.category = this.category();
    if(this.data.mode === "update"){
      await this.saveCourse(this.data?.course!.id, courseProps);
    }else {
      await this.createNewCourse(courseProps);
    }
  }

  async createNewCourse(partialCourse: Partial<Course>){
    try {
      const newCourse = await this.coursesService.createCourse(partialCourse);
      this.matDialogRef.close(newCourse);
    }catch (error){
      console.error(error);
      alert('Failed to create the course.');
    }
  }

  async saveCourse(courseId: string, changes: Partial<Course>){
    try {
      const updatedCourse = await this.coursesService.saveCourse(courseId,changes);
      this.matDialogRef.close(updatedCourse);
    }catch (error){
      console.error(error);
      alert('Failed to save the course.');
    }
  }
}

export async function openEditCourseDialog(dialog: MatDialog,data: EditCourseDialogData){
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.data = data;
  config.width = "400px";
  const afterClosed$ = dialog.open(EditCourseDialogComponent,config).afterClosed();
  return firstValueFrom(afterClosed$);
}
