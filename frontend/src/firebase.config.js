import { getApp ,getApps ,initializeApp} from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage}  from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyDDYAPtUyD4MNE3B6TwJzH-A6KVT5vRcfg",
    authDomain: "kitchen-ae467.firebaseapp.com",
    databaseURL: "https://kitchen-ae467-default-rtdb.firebaseio.com",
    projectId: "kitchen-ae467",
    storageBucket: "kitchen-ae467.appspot.com",
    messagingSenderId: "361574808244",
    appId: "1:361574808244:web:c56134c054835d4a2575e1"
  };
  


  const app = getApps.length > 0  ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app)
  const storage =  getStorage(app)

  export {app , firestore ,storage};