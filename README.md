# firebase-with-web

All firebase implementation in web medium using javascripy

---

## Implementing firebase in web: setup

```html
<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>

<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-firestore.js"></script>
```

- this code will be available to copy one you created a web app in your console

```javascript

apiKey: "YOUR-API-kEY",
authDomain: "firestore-book.firebaseapp.com",
projectId: "firestore-book",
storageBucket: "firestore-book.appspot.com",
messagingSenderId: "477849225499",
appId: "YOUR-APP-ID",
measurementId: "G-JQYH61K9EW"
};
```

---

## Reading the database

```javascript

const db=firebase.firestore();

db.collection('Books').get().then((snapshot)=>{
    snapshot.forEach(doc =>{
        console.log(doc.data());
        renderList(doc)
    })
})
```

---

## Writing the database

```javascript

const db=firebase.firestore();

db.collection('Books').add({
        name:form.name.value,
        type:form.type.value
    })

```

---

## deleting values in the database

```javascript

e.stopPropagation();
let id =e.target.parentElement.getAttribute('data-id');
db.collection('Books').doc(id).delete();

```

---

## Query a particular data in the database

Querying can be done using the where function and orderBy function for in order.

```javascript

db.collection('Books').where('type', '!=', 'essay').orderBy('type').get().then((snapshot)=>{
    snapshot.forEach(doc =>{
        console.log(doc.data());
        renderList(doc)
    })
}).catch(function(error) {
    console.log("Error getting documents: ", error);
});

```

---

## Instant change of data in the database

onSnapshot method is used to listen the update in the database and respond respective to it.

```javascript
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
```

## Update of data in the database

Update can be done by using set function update function.Set function overwrite the data

```javascript
db.collection('Books').doc(id).update({
    name:'india'
})
db.collection('Books').doc(id).set({
    name:'india'
})
```
