// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getDatabase, ref, set, get, push, onValue } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';

let auth, database, storage;
let handleAuth, handleSignOut;

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPjKpkR2k0JrQB9Oxf0oB-dQjZE6h_Ixk",
    authDomain: "ninilover-calendar.firebaseapp.com",
    databaseURL: "https://ninilover-calendar-default-rtdb.firebaseio.com",
    projectId: "ninilover-calendar",
    storageBucket: "ninilover-calendar.appspot.com",
    messagingSenderId: "1063597046269",
    appId: "1:1063597046269:web:cf3706e14381f6ca5d3c8f"
};

// Initialize Firebase
try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    auth.useDeviceLanguage(); // Usar el idioma del dispositivo

    // Configurar base de datos y almacenamiento
    database = getDatabase(app);
    storage = getStorage(app);

    // Configurar autenticación
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({
        prompt: 'select_account'
    });

    // Función de autenticación
    handleAuth = async function() {
        try {
            console.log("Iniciando autenticación...");
            const result = await signInWithPopup(auth, provider);
            console.log("Autenticación exitosa:", result.user.displayName);
            return result.user;
        } catch (error) {
            console.error('Error de autenticación:', error);
            
            let errorMessage = 'Error al iniciar sesión';
            switch (error.code) {
                case 'auth/invalid-api-key':
                    errorMessage = 'Error de configuración de Firebase. Por favor, verifica la API key.';
                    break;
                case 'auth/unauthorized-domain':
                    errorMessage = 'Este dominio no está autorizado. Por favor, agrega wktaer.github.io a los dominios autorizados en Firebase.';
                    break;
                case 'auth/popup-blocked':
                    errorMessage = 'El navegador bloqueó la ventana emergente. Por favor, permite ventanas emergentes para este sitio.';
                    break;
                case 'auth/cancelled-popup-request':
                    errorMessage = 'Operación cancelada. Por favor, intenta nuevamente.';
                    break;
                default:
                    errorMessage = error.message;
            }
            
            alert(errorMessage);
            throw error;
        }
    };

    // Función para cerrar sesión
    handleSignOut = async function() {
        try {
            await auth.signOut();
            console.log("Sesión cerrada exitosamente");
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            alert('Error al cerrar sesión: ' + error.message);
        }
    };

    // Hacer las funciones disponibles globalmente
    window.handleAuth = handleAuth;
    window.handleSignOut = handleSignOut;

} catch (error) {
    console.error("Error al inicializar Firebase:", error);
    alert("Error al inicializar Firebase. Por favor, recarga la página.");
}

// Exportar todo lo necesario
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
