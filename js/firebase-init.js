// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzZyICYOaVdVmjWZwW9j0WOkk8aQvVX2SBEsN",
    authDomain: "ninilover-app.firebaseapp.com",
    projectId: "ninilover-calendar",
    storageBucket: "ninilover-calendar.appspot.com",
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
        const result = await signInWithPopup(auth, provider);
        console.log("Usuario autenticado:", result.user.displayName);
        return result.user;
    } catch (error) {
        console.error("Error de autenticación:", error);
        alert('Error al iniciar sesión');
    }
}

async function handleSignOut() {
    try {
        await auth.signOut();
        console.log("Sesión cerrada");
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert('Error al cerrar sesión');
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
