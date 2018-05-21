import * as jquery from 'jquery';
import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { Cryptography } from '../core/Cryptography';
import { EncryptorFile } from '../core/EncryptorFile';

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
  templateUrl: './utilities.component.html'
})
export class UtilitiesComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  private jsonPreview: string;
  private encryptorFile: EncryptorFile;
  private fileLoaded: boolean;
  private showPulseClass: string;
 

  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState, 
    public cryptography: Cryptography
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');

    let self = this;

    self.jsonPreview = '';
    self.encryptorFile = new EncryptorFile();
    self.fileLoaded  = false;
    self.showPulseClass = 'pulse';

    /**
     * this.title.getData().subscribe(data => this.data = data);
     */

    setTimeout(() => {
      self.showPulseClass = '';
    }, 5000);
  }

  public readFile(fileInput: any) {
      let self = this;

      if (fileInput.target.files && fileInput.target.files[0]) {
          let reader = new FileReader();

          reader.onload =  (e: any) => {

             let base64result = e.target.result.split(',')[1];
             self.jsonPreview = self.cryptography.b64DecodeUnicode(base64result);
             Object.assign(self.encryptorFile, JSON.parse( self.jsonPreview));

             self.fileLoaded = true;

          };

          reader.readAsDataURL(fileInput.target.files[0]);
      }
  }
 
}
