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

