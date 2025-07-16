  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getDatabase,ref,push,set,onValue,remove } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCf-nrvo1Uzjhub2ReVk-cl3mNw-_rd27s",
    authDomain: "authentication-87154.firebaseapp.com",
    databaseURL: "https://authentication-87154-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "authentication-87154",
    storageBucket: "authentication-87154.firebasestorage.app",
    messagingSenderId: "447649313895",
    appId: "1:447649313895:web:17a4e5d6f9921a1780d0c2",
    measurementId: "G-HWZ0SBTK0L"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const db=getDatabase(app);
