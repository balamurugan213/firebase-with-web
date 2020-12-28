  
const list =document.querySelector('.guides');
const loggedOutLinks =document.querySelectorAll('.logged-out');
const loggedInLinks =document.querySelectorAll('.logged-in');
const accountDetails =document.querySelector('.account-details');

// setup navigate
const setupUI =(user)=>{
  if(user){
    // accounty info
    db.collection('users').doc(user.uid).get().then(doc =>{
      const ht =`
      <div><h6>Logged in as ${user.email}</h6></div>
      <div>${doc.data().bio}</div>
      `;
    accountDetails.innerHTML=ht;
    })
    
    // hide
    loggedInLinks.forEach(item => item.style.display='block');
    loggedOutLinks.forEach(itm =>itm.style.display='none');
  }
  else{
    accountDetails.innerHTML=' '
    // hide
    loggedInLinks.forEach(item => item.style.display='none');
    loggedOutLinks.forEach(itm =>itm.style.display='block');
  }
}



// setup guide
const setupGuides =(data)=>{

    let htm='';
    if(data.length){
        data.forEach(doc => {
          const guide=doc.data();
          console.log(guide);
          const li=`
            <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white"><span>${guide.content}</span></div>
            </li>
          `;
          htm +=li;
      });
    }
    else{
      htm=`<h5 class="center-align">Login to view Guides</h5>`;
    }
    
    list.innerHTML=htm;
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

