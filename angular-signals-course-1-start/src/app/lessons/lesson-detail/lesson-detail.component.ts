import {Component, inject, input, output} from '@angular/core';
import {Lesson} from "../../models/lesson.model";
import {ReactiveFormsModule} from "@angular/forms";
import {LessonsService} from "../../services/lessons.service";
import {MessagesService} from "../../messages/messages.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'lesson-detail',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './lesson-detail.component.html',
    styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {

  lesson = input.required<Lesson | null>();
  lessonUpdated = output<Lesson>();
  cancel = output();

  lessonsService = inject(LessonsService);

  messagesService = inject(MessagesService);

  onCancel() {
    this.cancel.emit();
  }

  async onSave(description: string) {
    const lesson: Partial<Lesson> ={
      description
    }
    try {
      const lessonId = this.lesson()?.id

      if (!lessonId){
        this.messagesService.showMessage('Lesson id is missing','error');
        return;
      }
      const updatedLesson = await this.lessonsService.saveLesson(lessonId,lesson);
      this.lessonUpdated.emit(updatedLesson);
    }catch (err){
      this.messagesService.showMessage('There was an error during lesson saving','error');
    }
  }
}
