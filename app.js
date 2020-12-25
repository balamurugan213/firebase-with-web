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

// //Snapshoting the db
// db.collection('Books').where('catagory', '!=', 'essay').orderBy('catagory').get().then((snapshot)=>{
//     snapshot.forEach(doc =>{
//         console.log(doc.data());
//         renderList(doc)
//     })
// }).catch(function(error) {
//     console.log("Error getting documents: ", error);
// });


// Snapshoting the db
db.collection('Books').orderBy('catagory').onSnapshot(snapshot =>{
    let changes=snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added')
        {
            console.log(change)   
            renderList(change.doc) 
        }
        else if(change.type == 'removed')
        {
            let li =bookList.querySelector('[data-id='+change.doc.id +']');
            bookList.removeChild(li);
        }
       
    });
})


// getting data
function renderList(doc){
    let li = document.createElement('li');
    li.setAttribute('data-id',doc.id);

    let name = document.createElement('span');
    name.textContent=doc.data().name;

    let catagory = document.createElement('span');
    catagory.textContent=doc.data().catagory;

    let cross=document.createElement('div');
    cross.textContent="x";


    li.appendChild(name);
    li.appendChild(catagory);
    li.appendChild(cross);


    bookList.appendChild(li)

    // adding functionality
    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id =e.target.parentElement.getAttribute('data-id');
        db.collection('Books').doc(id).delete();
    })
    
}



// adding data
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    db.collection('Books').add({
        name:form.name.value,
        catagory:form.catagory.value
    })
    form.name.value=''
    form.catagory.value=''
})