import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  handleError(error: any): void {
    const { status } = error;
    let message = '';

    switch(status) {
      case 0:
        message = 'Servicio no disponible';
        break;
      case 400:
      case 422:
        message = error.error.message;
        break;
      case 500:
      default:
        message = 'Ocurrió un error no identificado.'
    }

    alert(message);

  }

}