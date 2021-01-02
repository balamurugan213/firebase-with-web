const functions = require('firebase-functions');
const admin=require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.addAdminRole= functions.https.onCall((data,context)=>{
    // get user and add custom claim
    return admin.auth().getUserByEmail(data.email).then(user =>{
        return admin.auth().setCustomUserClaims(user.uid,{
            admin:true
        });
    }).then(() =>{
        return {
            message:`success! ${data.email} has been made on admin`
        }
    }).catch(err =>{
        return err;
    })
})
