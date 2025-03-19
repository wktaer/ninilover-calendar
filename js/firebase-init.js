// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getDatabase, ref, set, get, push, onValue } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

// Configurar el proveedor de Google
provider.setCustomParameters({
    prompt: 'select_account'
});

// Función de autenticación
async function handleAuth() {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Autenticación exitosa:", result.user.displayName);
        return result.user;
    } catch (error) {
        console.error('Error de autenticación:', error);
        alert('Error al iniciar sesión: ' + error.message);
        throw error;
    }
}

// Función para cerrar sesión
async function handleSignOut() {
    try {
        await auth.signOut();
        console.log("Sesión cerrada exitosamente");
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión: ' + error.message);
    }
}

// Hacer las funciones disponibles globalmente
window.handleAuth = handleAuth;
window.handleSignOut = handleSignOut;

// Exportar funciones y objetos necesarios
export { 
    auth,
    database,
    storage,
    ref,
    set,
    get,
    push,
    onValue,
    storageRef,
    uploadBytes,
    getDownloadURL,
    onAuthStateChanged,
    handleAuth,
    handleSignOut
};
