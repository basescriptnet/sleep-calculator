import React, { useState } from 'react';
import { IonDatetime, IonButton, IonText, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonLabel, IonList, IonItem } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
// import './Tab1.css';

const Tab2: React.FC = function () {
  let [selectedDate, setDate] = useState<string>('06:00');
  let times: any = ["2:25", "1:15", "11:45", "10:15", "8:45"];
  let calculate = function () {
    times = [];
    let t = selectedDate.split(':');
    let skipFirstHours = 2;
    for (let i = skipFirstHours; i < skipFirstHours+5; i++) { // 5 results
      let timeInMinutes: number = parseFloat(t[0]) * 60 + parseFloat(t[1]);
      timeInMinutes -= i * 90;
      timeInMinutes -= 15; // 15 minutes time to fall asleep
      let hours = ~~(timeInMinutes / 60);

      let minutes = timeInMinutes % 60;
      if (minutes < 0) {
        hours -= 1;
        minutes = Math.abs(60 + minutes)
      }
      if (hours < 0) {
        hours = Math.abs(24 + hours)
      }
      let final = amPm(`${hours}:${minutes}`)
      times.push(
        <IonButton key={i}>
          {final}
        </IonButton>
      )
    }
    return times.reverse();
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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>When to Sleep</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">When to Sleep</IonTitle>
            </IonToolbar>
          </IonHeader>
        <IonGrid>
          <IonRow>
            {/* <IonButton onClick={e => e.preventDefault()}> */}
              <IonLabel>Choose the time.</IonLabel>
              <IonDatetime
                onIonChange={e => {
                  // times = [];
                  // let n = e.detail.value!;
                  setDate(e.detail.value!);
                  // return times;
                }}
                display-format="hh:mm A"
                picker-format="hh:mm A"
                value={selectedDate}
                mode="ios"
                minute-values="0,5,10,15,20,25,30,35,40,45,50,55"
              />
              {/* </IonButton> */}
          </IonRow>
          <IonRow>In order to wake up at<IonText color="success"> {amPm(selectedDate)} </IonText>energized, you will need to
            go to sleep at <IonText color="success"></IonText>
            
            <div>{ calculate() }</div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
