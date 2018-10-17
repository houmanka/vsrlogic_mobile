import { StorageService } from './../../app/services/storage.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-note-form',
  templateUrl: 'note-form.html',
})
export class NoteFormPage {
  @ViewChild('myInput') myInput: ElementRef;
  public comment;
  public showCameraButton = false;
  private system;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera,
    
    ) {
  }

  ionViewDidLoad() {
    this.system = StorageService.read('system');
    this.showCameraButton = this.system.camera;
  }

  
  submit() {
    console.log(this.comment);
  }

  cancel() {
    this.navCtrl.pop({
      animate: true,
      animation: 'animated slideInLeft',
   });
  }

  takePhoto() {
    if (this.system.camera === true) {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
      });
    }
  }

}
