import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  show: boolean = false;
  type: string = 'info';
  message: string | undefined;
  timer: any;

  alert(message: string, type: string = 'info', autohide: number = 5000) {
    this.show = true;
    this.type = type;
    this.message = message;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (autohide) {
      this.timer = setTimeout(() => {
        this.close();
      }, autohide);
    }
  }

  close() {
    this.show = false;
  }


}
