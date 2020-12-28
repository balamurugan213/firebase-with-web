// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAPxw9MdZVs4_Gc6If2iKWtQSTzcWpgRnc",
    authDomain: "auth-book-guide.firebaseapp.com",
    projectId: "auth-book-guide",
    storageBucket: "auth-book-guide.appspot.com",
    messagingSenderId: "271002204195",
    appId: "1:271002204195:web:4a524285f7af6c31d1d996"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth= firebase.auth();
const db= firebase.firestore();

// update setting
db.settings({timestampsInSnapshots: true});


// listen for auth status change
auth.onAuthStateChanged(user =>{
    
    if(user){
        console.log("user loged-in",user)
        // get data
        setupUI(user);
        db.collection('guids').onSnapshot(snapshot =>{
            // console.log(snapshot.docs)\
            setupGuides(snapshot.docs);
        }, err => console.log(err.message));

    }
    else{
        console.log("user loged-out")
        setupUI()
        setupGuides([]);
    }
})

// create guide
const createForm=document.querySelector('#create-form');
createForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const title=
    db.collection('guids').add({
        title:createForm['title'].value,
        content:createForm['content'].value
    }).then(()=>{
          // close the model
          const addModal=document.querySelector('#modal-create');
          M.Modal.getInstance(addModal).close();
          createForm.reset();
    }).catch(err=>{
        console.log(err.message)
    })
})

//signup
const signUpForm=document.querySelector('#signup-form');

signUpForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const mail=signUpForm['signup-email'].value
    const password=signUpForm['signup-password'].value

    console.log(mail,password)

    // signup user
    auth.createUserWithEmailAndPassword(mail,password).then(cred =>{
        // console.log(cred.user)
        return db.collection('users').doc(cred.user.uid).set({
            bio:signUpForm['signup-bio'].value
        })
       
    }).then(()=>{
        const signupModal=document.querySelector('#modal-signup');
        M.Modal.getInstance(signupModal).close();
        signUpForm.reset();
    })

})

// logout
const logout=document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut();
})

// login
const loginForm=document.querySelector('#login-form');
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