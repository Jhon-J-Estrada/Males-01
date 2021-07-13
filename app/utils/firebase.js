import firebase from "firebase/app";


const firebaseConfig = {
	apiKey: "AIzaSyC95yTVutnlAfMNqUtLiQmkb8VjdNlrFlU",
    authDomain: "males-2f9e4.firebaseapp.com",
    projectId: "males-2f9e4",
    storageBucket: "males-2f9e4.appspot.com",
    messagingSenderId: "839905180831",
    appId: "1:839905180831:web:cef7c2d58e068c4752b6aa"
};

export const firebaseApp =  firebase.initializeApp(firebaseConfig);

