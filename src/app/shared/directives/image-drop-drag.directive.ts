import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DropAndDragColor } from './../enums';
import { ImageFileInterface } from './../interfaces/image-file.interface';

@Directive({
  selector: '[imageDropDrag]',
})
export class ImageDropDragDirective {
  constructor(private domSanitizer: DomSanitizer) {}
  @Output() handleImageFile: EventEmitter<ImageFileInterface> =
    new EventEmitter<ImageFileInterface>();
  @HostBinding('style.background') backgroundColor = DropAndDragColor.DEFAULT;

  @HostListener('dragover', ['$event']) dragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = DropAndDragColor.OVER;
  }

  @HostListener('dragleave', ['$event']) dragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = DropAndDragColor.DEFAULT;
  }

  @HostListener('drop', ['$event']) drop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = DropAndDragColor.DEFAULT;
    const fileList = event.dataTransfer?.files;
    if (fileList) {
      const imageFile: ImageFileInterface = {
        file: fileList[0],
        url: this.domSanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(fileList[0])
        ),
      };
      this.handleImageFile.emit(imageFile);
    }
  }
}
