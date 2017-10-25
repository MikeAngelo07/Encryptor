import CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable()
export class Cryptography {

      public Encrypt (textToEncrypt: string, password: string, pinCode: number ): string {
            if (pinCode.toString().length > 4) {
                  throw 'PIN Code must be max 4 characteres';
            }

            let keyAndPin: KeyAndIV = { Password: password, PinCode: pinCode };

            let standardKeyAndPin = this._GetKeyAndIV(keyAndPin);

            let encryptedText = this._Encrypt(
                  textToEncrypt,
                  standardKeyAndPin.key.toString(), 
                  standardKeyAndPin.iv.toString());

            return encryptedText;
      }

      public Decrypt (encryptedText: string, password: string, pinCode: number ): string {
            if (pinCode.toString().length > 4) {
                  throw 'PIN Code must be max 4 characteres';
            }

            let keyAndPin: KeyAndIV = { Password: password, PinCode: pinCode };

            let standardKeyAndPin = this._GetKeyAndIV(keyAndPin);

            let decryptedText = this._Decrypt(
                  encryptedText,
                  standardKeyAndPin.key.toString(), 
                  standardKeyAndPin.iv.toString());

            return decryptedText;
      }

      public b64DecodeUnicode(str: string) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
      }

      private _Encrypt (messagetoEncrypt: string, key: string, IV: string) : string
      {
            let encrypted = CryptoJS.AES.encrypt(messagetoEncrypt, key,
            {
                iv: IV,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            return encrypted.ciphertext;
      }

      private _Decrypt (messagetoEncrypt: string, key: string, IV: string) : string
      {
            let decrypted = CryptoJS.AES.decrypt(messagetoEncrypt, key,
            {
                iv: IV,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            return decrypted.toString();
      }

      private _GetKeyAndIV (KeyAndIV: KeyAndIV) {
            var keyBitLength = 256;
            var ivBitLength = 128;
            var iterations = 29;

            var bytesInSalt = 128 / 8;
            var salt = CryptoJS.MD5(KeyAndIV.Password+KeyAndIV.PinCode).toString();

            var iv128Bits = CryptoJS.PBKDF2(
                  KeyAndIV.Password,
                  salt,
                  { keySize: 128 / 32, iterations });

            var key256Bits = CryptoJS.PBKDF2(
                  KeyAndIV.PinCode.toString(),
                  salt, 
                  { keySize: 256 / 32, iterations });

            return {
                  iv: iv128Bits,
                  key: key256Bits
            };
      };
}

interface KeyAndIV {
      Password: string;
      PinCode: number;
}