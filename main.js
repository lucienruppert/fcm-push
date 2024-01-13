import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import "./style.css";

document.querySelector("#app").innerHTML = `
  <button>SUBSCRIBE</button>
  <p class="permission"></p>
  <p class="token"></p>
`;

const firebaseConfig = {
  apiKey: "AIzaSyCfijV4DbbD9AfxUFrJS6L4j-iOxFogER8",
  authDomain: "the-project-c2304.firebaseapp.com",
  projectId: "the-project-c2304",
  storageBucket: "the-project-c2304.appspot.com",
  messagingSenderId: "343599314245",
  appId: "1:343599314245:web:d07af408e5c3d7c80aba2c",
  measurementId: "G-SY74FLEXQT",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const button = document.querySelector("button");

const swReg = navigator.serviceWorker
  .register("/firebase-messaging-sw.js")
  .then((result) => console.log(result));

async function handleClick() {
  let permission = await Notification.requestPermission();
  if (permission === "granted") {
    document.querySelector(".permission").innerHTML = "Permission granted.";
    let token = await getToken(messaging, {
      vapidKey:
        "BB_UyAD-r2mmFBATNx_5D9yIDwq4QFcRxxah3eDky7270f2ZrW62XBBZ_Es_ma4idues55uzNN4G-tzjbNjsnuQ",
    });
    if (token) document.querySelector(".token").innerHTML = token;
  } else {
    document.querySelector("p").innerHTML =
      "Something is wrong with the permission.";
  }
}

button.onclick = handleClick;
