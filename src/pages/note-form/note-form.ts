import { ApiPostProvider } from './../../providers/api-post/api-post';
import { NoteInterface } from './../../app/services/api.service';
import { NotesPage } from './../notes/notes';
import { StorageService } from './../../app/services/storage.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NotificationService } from '../../app/services/notification.service';

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
  public params;
  public note: NoteInterface;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera,
    public viewCtrl: ViewController,
    private apiPost: ApiPostProvider,
    private notificationSrv: NotificationService  
    ) {
  }

  ionViewDidLoad() {
    this.system = StorageService.read('system');
    this.showCameraButton = this.system.camera;
    this.params = this.navParams.get('params');
    this.comment = this.params.data.content;
    this.note = {
      asset_id: this.params.asset_id,
      resource: "assets",
      resource_id: this.params.asset_id,
      parent_id: this.params.data.parent_id,
      content: this.params.data.content,
      id: this.params.id
    }
  }

  
  submit() {
    console.log(this.comment);
    const data: NoteInterface = {
      asset_id: this.params.asset_id,
      resource: "assets",
      resource_id: this.params.asset_id,
      parent_id: this.params.data.parent_id,
      content: this.comment,
      id: this.params.id
    }
    this.apiPost.updateComment(data).subscribe( (res: any) => {
      this.notificationSrv.notify('Notice', 'Updated Successfully', null, 'toast');
      this.navCtrl.popTo(NotesPage);
    }, (error) => {
      console.log(error);
    });
  }

  cancel() {
    // Check for deletion
    // delete the comment if there is nothing in it
    this.notifyBackend(this.comment);
    this.navCtrl.popTo(NotesPage);
  }

  notifyBackend(comment?) {
    console.log("NOTIFY BACKEND, SO CLEANER CAN KICK IN")
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


