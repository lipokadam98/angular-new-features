import { ResolveFn } from '@angular/router';
import {Lesson} from "../models/lesson.model";
import {inject} from "@angular/core";
import {LessonsService} from "../services/lessons.service";

export const courseLessonsResolver: ResolveFn<Lesson[] | null> = (route, state) => {

  const lessonsService = inject(LessonsService);

  const courseId = route.paramMap.get("courseId");
  if(!courseId){
    return null;
  }

  return lessonsService.loadLessons({courseId});
};
