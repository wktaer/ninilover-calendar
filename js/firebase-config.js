// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1wJMB11qR4wFdzrWCV0-eGYq6D9OCcVc",
    authDomain: "ninilover-calendar.firebaseapp.com",
    databaseURL: "https://ninilover-calendar-default-rtdb.firebaseio.com",
    projectId: "ninilover-calendar",
    storageBucket: "ninilover-calendar.appspot.com",
    messagingSenderId: "1063597046269",
    appId: "1:1063597046269:web:cf3706e14381f6ca5d3c8f"
};

// Initialize Firebase
if (!firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (error) {
        console.error("Error inicializando Firebase:", error);
    }
}

const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

// Función común de autenticación
function handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });
    
    auth.signInWithPopup(provider)
        .catch(error => {
            console.error('Error de autenticación:', error);
            alert('Error al iniciar sesión: ' + error.message);
        });
}
