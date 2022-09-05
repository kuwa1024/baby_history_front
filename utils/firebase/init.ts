// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDF8tDo0L3SIbb89eRNJlcvox2SySj0y9g',
  authDomain: 'baby-history.firebaseapp.com',
  projectId: 'baby-history',
  storageBucket: 'baby-history.appspot.com',
  messagingSenderId: '1044710268481',
  appId: '1:1044710268481:web:ef591eb0f41a7aec8370c0',
  measurementId: 'G-KN4SETMSGP',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
