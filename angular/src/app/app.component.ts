import {Component, OnInit} from '@angular/core';
import {SwPush} from "@angular/service-worker";
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-notifications';
  notif: Observable<any>;

  constructor(
    private _swPush: SwPush,
    private socket: Socket
  ) {
    this.notif = this.socket.fromEvent('notif');
  }

  ngOnInit() {
    this.requestSubscription();

  }

  requestSubscription() {
    if (!this._swPush.isEnabled) {
      console.log("Notification is not enabled.");
      return;
    }

    this._swPush.requestSubscription({
      serverPublicKey: 'BDMG-ztoyDGOTQa_6xHwgsYIb_6GYERWKAoh8mBxUvlubZJYW9bss86QFsaEjMb6b8p4JTf0RUjOWjFrfFan0K8'
    }).then((_) => {
      console.log(JSON.stringify(_));
    }).catch((_) => console.log);
  }
}
