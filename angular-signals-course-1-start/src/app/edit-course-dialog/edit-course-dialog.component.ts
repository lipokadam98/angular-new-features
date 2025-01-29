import {Component, effect, inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../models/course.model";
import {EditCourseDialogData} from "./edit-course-dialog.data.model";
import {CoursesService} from "../services/courses.service";
import {LoadingIndicatorComponent} from "../loading/loading.component";
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CourseCategoryComboboxComponent} from "../course-category-combobox/course-category-combobox.component";
import {CourseCategory} from "../models/course-category.model";
import {firstValueFrom} from "rxjs";

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

  onClose() {
    this.matDialogRef.close();
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
