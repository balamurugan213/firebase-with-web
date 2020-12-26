# firebase-with-we

All firebase implementation in web medium using javascripy

---

## Firebase-Authentication

---

## Firebase-Authentication :setup

need to create a object for firebase-auth and firestore.

```javascript
var firebaseConfig = {
    apiKey: "YOUR API KEY",
    authDomain: "auth-book-guide.firebaseapp.com",
    projectId: "auth-book-guide",
    storageBucket: "auth-book-guide.appspot.com",
    messagingSenderId: "271002204195",
    appId: "YOUR APP ID"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth= firebase.auth();
const db= firebase.firestore();

// update setting
db.settings({timestampsInSnapshots: true});

```

---

## Create new user: **sign up**

need to create a object for firebase-auth and firestore.

```javascript
// creaate new user with email and password
auth.createUserWithEmailAndPassword(mail,password).then(cred =>{ 

});

```

```javascript

signUpForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const mail=signUpForm['signup-email'].value
    const password=signUpForm['signup-password'].value

    console.log(mail,password)

    // signup user
    auth.createUserWithEmailAndPassword(mail,password).then(cred =>{
        // console.log(cred.user)
        const signupModal=document.querySelector('#modal-signup');
        M.Modal.getInstance(signupModal).close();
        signUpForm.reset();
    });

})

```

---

## **Login**

auth object has built-in function for signup

```javascript
// login with email and password
auth.signInWithEmailAndPassword(mail,password).then((cred)=>{

})

```

```javascript

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const mail=loginForm['login-email'].value;
    const password=loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(mail,password).then((cred)=>{
        // close the model
        const loginModal=document.querySelector('#modal-login');
        M.Modal.getInstance(loginModal).close();
        loginForm.reset();
    })
})

```

---
## **Logout**

auth object has built-in function for signup

```javascript

// logout
auth.signOut();

```

```javascript

// logout
const logout=document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut();
})

```

---

## **Listening for auth change:login, logout, signup**

By listening the auth change we can get notified whe the user login or logout so we can change the content respective to it.

```javascript
// listen for auth status change
auth.onAuthStateChanged(user =>{
})

```

```javascript

auth.onAuthStateChanged(user =>{
    
    if(user){
        console.log("user loged-in",user)
    }
    else{
        console.log("user loged-out")
    }
})
```

---
