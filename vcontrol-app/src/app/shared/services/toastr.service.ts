import { Injectable } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
export const TOASTR_CONFIG = {
  timeOut: 10000,
  positionClass: 'toast-top-center',
  preventDuplicates: true,
  progressBar: true,
};
@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private ngxToastrService: NgxToastrService) {}
  success(
    messages: string | string[] | { [key: string]: string },
    title: string
  ): void {
    [...this.handleMessages(messages)].forEach((message) => {
      this.ngxToastrService.success(message, title);
    });
  }
  private handleMessages(
    messages: string | string[] | { [key: string]: string }
  ): string[] {
    if (Array.isArray(messages)) {
      return messages;
    }
    if (typeof messages === 'object') {
      return Object.keys(messages).map((messageKey) => {
        return messages[messageKey];
      });
    }
    return [messages];
  }
  error({ messages }: { messages: string | string[]; },  title: string): void {
    [...this.handleMessages(messages)].forEach((message) => {
      this.ngxToastrService.error(message, title);
    });
  }
}
