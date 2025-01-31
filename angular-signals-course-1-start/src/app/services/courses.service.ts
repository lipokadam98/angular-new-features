import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpContext} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {Course} from "../models/course.model";
import {GetCoursesResponse} from "../models/get-courses.response";
import {SkipLoading} from "../loading/skip-loading.component";


@Injectable({
  providedIn: "root"
})
export class CoursesService {
  env = environment;

  httpClient = inject(HttpClient);

  async loadAllCourses (): Promise<Course[]>{
    const courses$ = this.httpClient.get<GetCoursesResponse>(this.env.apiRoot + '/courses',{
      context: new HttpContext().set(SkipLoading, false)
    });
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ = this.httpClient.post<Course>(`${this.env.apiRoot}/courses`,course);
    return firstValueFrom(course$);
  }

  async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    const course$ = this.httpClient.put<Course>(`${this.env.apiRoot}/courses/${courseId}`, changes);
    return firstValueFrom(course$);
  }

  async deleteCourse(courseId: string): Promise<void> {
   const delete$ = this.httpClient.delete(`${this.env.apiRoot}/courses/${courseId}`);
   await firstValueFrom(delete$);
  }

}
