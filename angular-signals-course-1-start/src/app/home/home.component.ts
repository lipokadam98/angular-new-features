import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagesService} from "../messages/messages.service";
import {catchError, from, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";
import {CoursesServiceWithFetch} from "../services/courses-fetch.service";

type Counter = {
  value: number
}

@Component({
    selector: 'home',
    imports: [
        MatTabGroup,
        MatTab,
        CoursesCardListComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly #courses = signal<Course[]>([])

  beginnerCourses = computed(()=>{
    const courses = this.#courses();
    return courses.filter(course => course.category === "BEGINNER")
  })

  advancedCourses = computed(()=>{
    const courses = this.#courses();
    return courses.filter(course => course.category === "ADVANCED")
  })

  coursesService = inject(CoursesService);

  constructor() {

    effect(() => {
      console.log(`Beginner courses: `, this.beginnerCourses());
      console.log(`Advanced courses: `, this.advancedCourses());
    });
    this.loadCourses().then(()=> console.log(`All courses loaded: `, this.#courses()));
  }

  async loadCourses(){
    try{
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    }catch (err){
      alert('Error loading courses!');
      console.error(err);
    }
  }
}
