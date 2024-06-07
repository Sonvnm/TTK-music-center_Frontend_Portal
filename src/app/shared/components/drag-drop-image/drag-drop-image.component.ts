import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-drag-drop-image',
  templateUrl: './drag-drop-image.component.html',
  styleUrls: ['./drag-drop-image.component.scss'],
})
export class DragDropImageComponent {
  @Output() handleImage: EventEmitter<any> = new EventEmitter<any>();
  @Output() isRemoveImage: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() imageFile: any;
  constructor(private sanitizer: DomSanitizer) {}

  handleFile(file?: any): void {
    this.imageFile = file;
    this.handleImage.emit(this.imageFile);
  }

  importFile(event: any) {
    const file = event.target.files[0];

    this.imageFile = file
      ? {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          ),
        }
      : undefined;
    this.handleImage.emit(this.imageFile);
  }

  handleRemoveImage(fileInput: any) {
    this.imageFile = undefined;
    fileInput.value = '';
    this.isRemoveImage.emit(true);
  }
}
