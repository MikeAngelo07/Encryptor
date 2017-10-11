import * as jquery from 'jquery';
import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { Cryptography } from '../core/Cryptography'
import { EncryptorFile } from '../core/EncryptorFile'


@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
    Title
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './home.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  private jsonPreview: string;
  private encryptorFile: EncryptorFile;
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    public title: Title,
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    this.jsonPreview = '';
    this.encryptorFile = new EncryptorFile();
  
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */

  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public readFile(fileInput: any) {
      let self = this;

      if (fileInput.target.files && fileInput.target.files[0]) {
          let reader = new FileReader();

          reader.onload =  (e: any) => {
             //jquery('#preview').text('src', );
             let base64result = e.target.result.split(',')[1];
             self.jsonPreview = atob(base64result);
             Object.assign(self.encryptorFile, JSON.parse( self.jsonPreview));
             //TODO sacar objeto
             
          };

          reader.readAsDataURL(fileInput.target.files[0]);
      }
  }
}
