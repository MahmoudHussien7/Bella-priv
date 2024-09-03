    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";
    import { getStorage } from "firebase/storage";

    const firebaseConfig = {
    apiKey: "AIzaSyBs2qtFQw2GvXSIuGsnpXJQsCMp-KTxe2U",
    authDomain: "bella-store-8f6b0.firebaseapp.com",
    projectId: "bella-store-8f6b0",
    storageBucket: "bella-store-8f6b0.appspot.com",
    messagingSenderId: "650432167129",
    appId: "1:650432167129:web:dd4269c7451bb16cd452c8",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

    export { db, auth, app, storage };
