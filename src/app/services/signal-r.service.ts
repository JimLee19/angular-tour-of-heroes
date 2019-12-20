import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: ChartModel[];

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:52751/hub')
      .configureLogging(signalR.LogLevel.Debug)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('messageReceived', (data, message) => {
      this.data = data;
      console.log(data, message);
    });
  }
  public send = () => {
    const sv = setInterval(() => {
      if (this.hubConnection.state === 1) {
        this.hubConnection.send('SendMessageToAll', 123, 'value').then(() => console.log('send success'));
      }
    }, 3000);

  }
}

export interface ChartModel {
  data: [];
  label: string;
}
