// Firebase configuration (ensure this matches your firebaseConfig)
const firebaseConfig = {
  apiKey: "AIzaSyDBk7jj3Wk8kMfI8tuK9pC53O21VU08OG0",
  authDomain: "club-management-portal-e0511.firebaseapp.com",
  projectId: "club-management-portal-e0511",
  storageBucket: "club-management-portal-e0511.firebasestorage.app",
  messagingSenderId: "320079517969",
  appId: "1:320079517969:web:8692bcc4f23591647354b0",
  measurementId: "G-KPTNGEPEFM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get elements
const signUpForm = document.getElementById('sign-up-form');
const signInForm = document.getElementById('sign-in-form');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');
const signInEmail = document.getElementById('sign-in-email');
const signInPassword = document.getElementById('sign-in-password');
const userName = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');

// Set up authentication
const auth = firebase.auth();

// Sign up function
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = signUpEmail.value;
  const password = signUpPassword.value;
  
  // Create a new user with email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      console.log("User signed up: ", user);

      // Redirect to sign-in page after sign-up
      document.getElementById('sign-up').style.display = 'none';
      document.getElementById('sign-in').style.display = 'block';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Sign in function
signInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = signInEmail.value;
  const password = signInPassword.value;
  
  // Sign in the user with email and password
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      console.log("User signed in: ", user);
      
      // Show profile and hide sign-in form
      document.getElementById('profile').style.display = 'block';
      document.getElementById('sign-in').style.display = 'none';
      userName.textContent = user.email;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Log out functionality
logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    // Sign-out successful, show sign-up form again
    document.getElementById('profile').style.display = 'none';
    document.getElementById('sign-up').style.display = 'block';
    signUpEmail.value = '';
    signUpPassword.value = '';
  });
});

// Toggle between sign up and sign in forms
document.getElementById('to-login').addEventListener('click', () => {
  document.getElementById('sign-up').style.display = 'none';
  document.getElementById('sign-in').style.display = 'block';
});

document.getElementById('to-signup').addEventListener('click', () => {
  document.getElementById('sign-in').style.display = 'none';
  document.getElementById('sign-up').style.display = 'block';
});
