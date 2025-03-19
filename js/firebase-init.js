// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKHKFIxgvDvRJxBBIVUaJ7OFtFnAcxYZc",
    authDomain: "ninilover-calendar.firebaseapp.com",
    projectId: "ninilover-calendar",
    storageBucket: "ninilover-calendar.appspot.com",
    messagingSenderId: "1063597046269",
    appId: "1:1063597046269:web:cf3706e14381f6ca5d3c8f",
    databaseURL: "https://ninilover-calendar-default-rtdb.firebaseio.com"
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
