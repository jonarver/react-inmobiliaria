import app from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config ={
    apiKey: "AIzaSyDD8KwoNQ6CmyNV41y8c1c7y9LCeFUScyU",
    authDomain: "ozean-a8357.firebaseapp.com",
    databaseURL: "https://ozean-a8357.firebaseio.com",
    projectId: "ozean-a8357",
    storageBucket: "ozean-a8357.appspot.com",
    messagingSenderId: "542079965006",
    appId: "1:542079965006:web:6350a6ab9d1453b22ef01f",
    measurementId: "G-HCYM2ZPEGF"
};

class Firebase {

    constructor()
    {
        app.initializeApp(config);
        this.db = app.firestore();
        this.auth = app.auth();
    }

    estadoIniciado() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged( resolve )
        })
    } 


}



export default Firebase; 