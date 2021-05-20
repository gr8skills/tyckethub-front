import {Component, Input, OnInit} from '@angular/core';
import {ImageService} from '../../apis/image.service';
import {EventFacadeService} from '../../../event/facades/event-facade.service';
import {UiService} from '../../core/ui.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input('size') imageSize = 'thumb';
  @Input('url') url = '';
  @Input('label') label = '';
  // @ts-ignore
  selectedFile: ImageSnippet;

  constructor(private imageService: ImageService,
              private eventFacade: EventFacadeService,
              private uiService: UiService) {
  }

  ngOnInit(): void {
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      const type = this.imageSize === 'banner' ? 'banner' : 'thumb';
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file, this.url, type).subscribe(
        (res) => this.onSuccess(),
        (error) => this.onError()
      );
    });
    reader.readAsDataURL(file);
  }

  private onSuccess(): void {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError(): void {
    this.selectedFile.pending = true;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
    this.uiService.openSnotify('Error uploading image. Try again later.', 'Error!!!',
      'error');
  }
}

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}

}
