import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// Función común de autenticación
window.handleAuth = async () => {
    try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        
        const result = await signInWithPopup(auth, provider);
        console.log("Autenticación exitosa:", result.user.displayName);
    } catch (error) {
        console.error('Error de autenticación:', error);
        alert('Error al iniciar sesión: ' + error.message);
    }
};

// Exportar para uso en otros archivos
export { auth, database, storage };
