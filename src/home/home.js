import {Component, View, If} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {status, text} from '../utils/fetch'
import {JSONPipe} from '../utils/pipes/json'

@Component({
  selector: 'home',
})
@View({
  templateUrl: 'home/home.html',
  directives: [If]
})
export class Home {
  jwt: string;
  decodedJwt: string;

  constructor() {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && jwt_decode(this.jwt);
  }

  callAnonymousApi() {
    this._callApi('Anonymous', 'http://localhost:3001/api/random-quote');
  }

  callSecuredApi() {
    this._callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
  }

  _callApi(type, url) {
    this.response = null;
    this.api = type;
    fetch(url, {
      method: 'GET',
    })
    .then(status)
    .then(text)
    .then((response) => {
      this.response = response;
    })
    .catch((error) => {
      this.response = error.message;
    });
  }
}
