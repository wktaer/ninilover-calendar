// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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
async function handleAuth() {
    try {
        console.log("Intentando iniciar sesión...");
        const result = await signInWithPopup(auth, provider);
        console.log("Inicio de sesión exitoso:", result.user.displayName);
        return result.user;
    } catch (error) {
        console.error("Error completo:", error);
        
        let errorMessage = "Error al iniciar sesión";
        if (error.code === 'auth/popup-blocked') {
            errorMessage = 'Por favor permite las ventanas emergentes para iniciar sesión';
        } else if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Ventana de inicio de sesión cerrada';
        } else if (error.code === 'auth/unauthorized-domain') {
            errorMessage = 'Este dominio no está autorizado. Por favor contacta al administrador.';
        } else if (error.code === 'auth/cancelled-popup-request') {
            errorMessage = 'Solicitud de inicio de sesión cancelada';
        } else if (error.code === 'auth/network-request-failed') {
            errorMessage = 'Error de red. Por favor verifica tu conexión';
        } else if (error.code === 'auth/api-key-not-valid') {
            errorMessage = 'Error de configuración. Por favor contacta al administrador.';
            console.log("API Key utilizada:", firebaseConfig.apiKey);
        }
        
        alert(errorMessage);
        console.error("Código de error:", error.code);
        console.error("Mensaje de error:", error.message);
    }
}

async function handleSignOut() {
    try {
        await auth.signOut();
        console.log("Sesión cerrada exitosamente");
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert('Error al cerrar sesión: ' + error.message);
    }
}

// Make functions globally available
window.handleAuth = handleAuth;
window.handleSignOut = handleSignOut;

// Export everything needed
export {
    auth,
    database,
    storage,
    handleAuth,
    handleSignOut,
    onAuthStateChanged
};
