// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKHKFIxgvDvRJxBBIVUaJ7OFtFnAcxYZc",
    authDomain: "ninilover-calendar.firebaseapp.com",
    projectId: "ninilover-calendar",
    storageBucket: "ninilover-calendar.appspot.com",
    messagingSenderId: "1063597046269",
    appId: "1:1063597046269:web:cf3706e14381f6ca5d3c8f",
    measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
} catch (error) {
    console.error("Error inicializando Firebase:", error);
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
    
    return auth.signInWithPopup(provider)
        .then((result) => {
            console.log("Autenticación exitosa:", result.user.displayName);
        })
        .catch(error => {
            console.error('Error de autenticación:', error);
            alert('Error al iniciar sesión: ' + error.message);
        });
}
