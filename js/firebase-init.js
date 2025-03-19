// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error(error);
        alert('Error al iniciar sesión');
    }
}

async function handleSignOut() {
    try {
        await auth.signOut();
    } catch (error) {
        console.error(error);
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
    handleSignOut
};
