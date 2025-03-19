// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYOaYnUxqjWzqwWj9edvkaqayCXs2BEsk",
    authDomain: "ninilover-app.firebaseapp.com",
    projectId: "ninilover-app",
    storageBucket: "ninilover-app.appspot.com",
    messagingSenderId: "1067612365943",
    appId: "1:1067612365943:web:52cefbd8a8691987e7c3e",
    measurementId: "G-JR18EWKJFB",
    databaseURL: "https://ninilover-app-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

// Auth functions
window.handleAuth = () => {
    console.log('Iniciando proceso de autenticación...');
    signInWithRedirect(auth, provider)
        .catch((error) => {
            console.error('Error de autenticación:', error);
            let errorMessage = 'Error al iniciar sesión: ' + error.message;
            if (error.code === 'auth/unauthorized-domain') {
                errorMessage = 'Este dominio no está autorizado. Por favor, verifica la configuración en la consola de Firebase.';
            }
            alert(errorMessage);
        });
};

window.handleSignOut = () => {
    auth.signOut()
        .then(() => {
            console.log('Usuario cerró sesión exitosamente');
        })
        .catch((error) => {
            console.error('Error al cerrar sesión:', error);
            alert('Error al cerrar sesión: ' + error.message);
        });
};

// Verificar resultado de redirección
getRedirectResult(auth)
    .then((result) => {
        if (result && result.user) {
            console.log('Usuario autenticado:', result.user);
        }
    })
    .catch((error) => {
        console.error('Error en redirección:', error);
    });

// Observar cambios en la autenticación
onAuthStateChanged(auth, (user) => {
    const loginBtn = document.getElementById('loginBtn');
    if (user) {
        console.log('Usuario conectado:', {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid
        });
        loginBtn.textContent = 'Cerrar Sesión';
        loginBtn.onclick = handleSignOut;
        document.getElementById('userInfo').textContent = `¡Hola, ${user.displayName}! 💖`;
    } else {
        console.log('Usuario no conectado');
        loginBtn.textContent = 'Iniciar Sesión';
        loginBtn.onclick = handleAuth;
        document.getElementById('userInfo').textContent = '';
    }
});

// Export everything needed
export {
    auth,
    database,
    storage,
    onAuthStateChanged
};
