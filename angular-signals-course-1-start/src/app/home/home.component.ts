import {Component, computed, effect, ElementRef, inject, Injector, signal, viewChild} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagesService} from "../messages/messages.service";
import {catchError, from, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";
import {CoursesServiceWithFetch} from "../services/courses-fetch.service";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";
import {LoadingService} from "../loading/loading.service";
import {MatTooltip} from "@angular/material/tooltip";

type Counter = {
  value: number
}

@Component({
    selector: 'home',
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent,
    MatTooltip
  ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
  #courses = signal<Course[]>([])

  beginnerCourses = computed(()=>{
    const courses = this.#courses();
    return courses.filter(course => course.category === "BEGINNER")
  })

  advancedCourses = computed(()=>{
    const courses = this.#courses();
    return courses.filter(course => course.category === "ADVANCED")
  })

  coursesService = inject(CoursesService);
  messagesService = inject(MessagesService)
  matDialog = inject(MatDialog);
  beginnersList = viewChild('beginnersList',{
    read: MatTooltip
  });

  constructor() {

    effect(() => {
      const beginnersList = this.beginnersList();
      console.log(beginnersList);
    });

    effect(() => {
      console.log(`Beginner courses: `, this.beginnerCourses());
      console.log(`Advanced courses: `, this.advancedCourses());
    });
    this.loadCourses().then(()=> {
      console.log(`All courses loaded: `, this.#courses())
    });

  }

  async loadCourses(){
    try{
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    }catch (err){
      this.messagesService.showMessage('Error loading courses!',"error");
      console.error(err);
    }
  }

  onCourseUpdated(updatedCourse: Course) {
    if(updatedCourse){
      const courses = this.#courses();

      const newCourses = courses.map(course => (course.id === updatedCourse.id ? updatedCourse : course));
      this.#courses.set(newCourses);
    }
  }

  async onCourseDeleted(courseId: string) {
    try {
      await this.coursesService.deleteCourse(courseId);

      const courses = this.#courses();
      const newCourses = courses.filter(course => course.id !== courseId);
      this.#courses.set(newCourses);
    }catch (error){
      console.error(error);
      alert('Error deleting course');
    }

  }

  async onAddCourse() {
    const newCourse = await openEditCourseDialog(this.matDialog,{
      mode: 'create', title: "Create course"
    });
    if (newCourse){
      this.#courses.update(courses=> [...courses, newCourse]);
    }
  }
}
