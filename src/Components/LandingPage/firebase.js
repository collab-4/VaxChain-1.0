import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBx0MrWQHV7n9N4ozuv96uEqmoB541lweo",
  authDomain: "vaxchain-12bdf.firebaseapp.com",
  projectId: "vaxchain-12bdf",
  storageBucket: "vaxchain-12bdf.appspot.com",
  messagingSenderId: "597082532945",
  appId: "1:597082532945:web:99c3291b72a89edcff9c70",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
