// arquivo com as configurações base para o Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCgMdiX9dRu2qMhEVk0W9p8fRwMs0emOzE",
    authDomain: "lojadobem-439b7.firebaseapp.com",
    projectId: "lojadobem-439b7",
    storageBucket: "lojadobem-439b7.appspot.com",
    messagingSenderId: "697033291477",
    appId: "1:697033291477:web:c0824c26723ca75597545c"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
