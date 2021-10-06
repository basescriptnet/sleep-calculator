import React, { useState } from 'react';
import { IonDatetime, IonButton, IonText, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonLabel, IonList, IonItem } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';

const Tab1: React.FC = function () {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes()
  let [selectedDate, setDate] = useState<string>(`${hours}:${(''+minutes).length == 1 ? '0'+minutes : minutes}`);
  let times: any = [];

  let calculate = function () {
    times = [];
    let t = selectedDate.split(':');
    let skipFirstHours = 1;
    for (let i = skipFirstHours; i < skipFirstHours+6; i++) { // 6 results
      let timeInMinutes: number = parseFloat(t[0]) * 60 + parseFloat(t[1]);
      timeInMinutes += i * 90;
      timeInMinutes += 15; // 15 minutes time to fall asleep
      // debugger
      let hours = ~~(timeInMinutes / 60);

      let minutes = timeInMinutes % 60;
      if (minutes > 60) {
        hours += 1;
        minutes = Math.abs(minutes - 60)
      }
      if (hours > 24) {
        hours = Math.abs(24 - hours)
      }
      let fixMinutes = ''+minutes;
      if (fixMinutes.length == 1) {
        fixMinutes = '0'+fixMinutes;
      }
      let final = amPm(`${hours}:${fixMinutes}`)
      times.push(
        <IonButton key={i}>
          {final}
        </IonButton>
      )
    }
    return times;
  }
  let amPm = (time: string):string => {
    let t = time.split(':');
    let hours = +t[0];
    let amOrPm = 'AM';
    if (+t[0] >= 12) {
      hours -= 12;
      amOrPm = 'PM'
    };
    return `${
      (hours +'').length == 1 ? '0'+hours : hours
    }:${(''+t[1]).length == 1 ? '0'+t[1] : t[1]}\u00a0${amOrPm}`
  }
  setInterval(function () {
    setDate(`${new Date().getHours()}:${new Date().getMinutes()}`)
  }, 5e3)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quick Calc</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Quick Calc</IonTitle>
            </IonToolbar>
          </IonHeader>
        <IonGrid>
          <IonRow
            >Now it is <IonText color="success">{amPm(selectedDate)}</IonText>.
          </IonRow>
          <IonRow>If you take a power nap,
            than you will need to wake up at: <br/>{calculate()[0]}<br/>
            Otherwise, wake up at:
            <div>{ calculate().slice(1) }</div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
