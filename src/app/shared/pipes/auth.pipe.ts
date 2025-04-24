import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loggedUserPipe',
})
export class AuthPipe implements PipeTransform {
  transform(key: string): boolean {
    console.log(localStorage.getItem(key) != null);
    return localStorage.getItem(key) != null;
  }
}
