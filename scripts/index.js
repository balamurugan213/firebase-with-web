  
const list =document.querySelector('.guides');

// setup guide
const setupGuides =(data)=>{
    let htm='';
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
    list.innerHTML=htm;
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

