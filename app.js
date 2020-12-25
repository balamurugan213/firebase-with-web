var firebaseConfig = {
    apiKey: "AIzaSyCwCSS_clzxnGjZlGnti8_TXaxIXrC2UKY",
    authDomain: "firestore-book.firebaseapp.com",
    projectId: "firestore-book",
    storageBucket: "firestore-book.appspot.com",
    messagingSenderId: "477849225499",
    appId: "1:477849225499:web:ceba66dc80aa8542ae6bbe",
    measurementId: "G-JQYH61K9EW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db=firebase.firestore();
db.settings({timestampsInSnapshots: true});


const bookList=document.querySelector('#cafe-list');
const form =document.querySelector('#add-cafe-form');

//Snapshoting the db
db.collection('Books').get().then((snapshot)=>{
    snapshot.forEach(doc =>{
        console.log(doc.data());
        renderList(doc)
    })
})

// 

// getting data
function renderList(doc){
    let li = document.createElement('li');
    li.setAttribute('data-id',doc.id);
    let name = document.createElement('span');
    name.textContent=doc.data().name;
    let type = document.createElement('span');
    type.textContent=doc.data().type;

    li.appendChild(name);
    li.appendChild(type);
    bookList.appendChild(li)
    
}

// adding data
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    db.collection('Books').add({
        name:form.name.value,
        type:form.type.value
    })
    form.name.value=''
    form.type.value=''
})