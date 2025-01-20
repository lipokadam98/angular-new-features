import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Course} from "../models/course.model";


@Injectable({
  providedIn: "root"
})
export class CoursesServiceWithFetch {

  env = environment;
  //Async is useful because it wraps the return type in a promise if we didn't do it
  //"async and await make promises easier to write"
  //
  // async makes a function return a Promise
  //
  // await makes a function wait for a Promise,
  // The await keyword can only be used inside an async function.
  // The await keyword makes the function pause the execution and wait for a resolved promise before it continues:
  async loadAllCourses(): Promise<Course[]>{
    const response = await fetch(this.env.apiRoot + '/courses');
    const payload = await response.json();
    return payload.courses;
  }


}
