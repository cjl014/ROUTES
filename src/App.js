import React, {useState, useEffect} from 'react';
import img1 from './assets/img/04.png';
import logo from './logo.svg';
import './App.css';
import {Header} from './components/Header';
import {LeftMenu} from './components/LeftMenu';
import {RightMenu} from './components/RightMenu';
import {IconsMenu} from './components/IconsMenu';
import {Dashboard} from './components/Dashboard';
import {ModalPopUp} from './components/ModalPopUp';
var findAnd = require("find-and");

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [icons, setIcons] = useState([]);
  const [iconsMenu, setIconsMenu] = useState('');
  const [activeIcon, setActiveIcon] = useState({name: '', excerpt: '', details: '', src: '', children: '[]'});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [saveVisible, setSaveVisible] = useState(true);
  const [startPoint, setStartPoint] = useState({x:0, y:0});
  const spacing = 80;


  // Check if logged in?
  useEffect(()=>{
    let username = localStorage.getItem("username");
    console.log(username);

    if(username) {
      setLoggedIn(true);

      let url = 'https://demoroutes.lassitek.com/php/getData.php';

      fetch(url, {
        method:'POST', 
        body:JSON.stringify({username: username})
      })
          .then(res => {
              console.log(res);
              return res.json();
          })
          .then(data => {
              console.log(data);
              let status = data.status;
              let msg = data.msg;
              let err = data.err;
              if (status == 'ok') {
                let icons = JSON.parse(data.data);
                setIcons(icons);
              }else {
                  console.log('get data failed');
              }
              
          });
    }
    

   // let url = 'https://demoroutes.lassitek.com/php/checkLogin.php';
/*
    fetch(url)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(data => {
            console.log(data);
            //let status = data.status;
            //let msg = data.msg;
            //let err = data.err;
            /*if (status == 'ok') {
                results.innerText = 'You Have Logged In Successfully';
                props.setLoggedIn(true);
            }else {
                console.log('failed');
            }
            
        });*/
  },[]);

  useEffect(()=>{
    let dashboard = document.getElementById('dashboard');
    setStartPoint({x: dashboard.offsetLeft + spacing, y: dashboard.offsetTop + spacing}); 

    let isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (isMobile) {
      //document.body.style.zoom = "50%";
    }
},[])

  function leftMenuClick(e) {
    let id = e.currentTarget.id;
    setIconsMenu(id);
  }

  function iconClick(e) {
    let iconId = e.target.getAttribute('id');
    let iconName = e.target.getAttribute('name');
    let iconExcerpt = e.target.getAttribute('data-excerpt');
    let iconDetails = e.target.getAttribute('data-details');
    let iconSrc = e.target.getAttribute('src');
    let iconChildren = e.target.getAttribute('data-children');
    let iconObj = {
      id: iconId,
      name: iconName,
      excerpt: iconExcerpt,
      details: iconDetails,
      src: iconSrc,
      children: iconChildren
    }
    setActiveIcon(iconObj);
  }

  function registerAccClick() {
    setModalName('register');
    setModalOpen(true);
  }

  function loginClick() {
    setModalName('login');
    setModalOpen(true);
  }

  function logoutClick() {
    localStorage.removeItem("username");
    setLoggedIn(false);
  }

  function saveClick() {
    let username = localStorage.getItem("username");
    console.log(username);
    console.log(icons);
    if(loggedIn) {
      //localStorage.setItem('routes_data', usr);
      let url = 'https://demoroutes.lassitek.com/php/setData.php';

      fetch(url, {
        method:'POST', 
        body:JSON.stringify({username: username, data: icons})
      })
          .then(res => {
              console.log(res);
              return res.json();
          })
          .then(data => {
              console.log(data);
              let status = data.status;
              let msg = data.msg;
              let err = data.err;
              if (status == 'ok') {
                alert('Your design has been saved');
              }else {
                  console.log('failed');
              }
              
          });
    }else {
      setLoginVisible(true);
      setRegisterVisible(true);
      setSaveVisible(false);
      //alert('You must login first');
      
    }
  }
  function closeModal() {
    setModalOpen(false);
  }

  const dropHandler = (e) => {
    let data;
    console.log(e);
if(e.dataTransfer) {
  try {
    data = JSON.parse(e.dataTransfer.getData("text/plain"));
  }
  catch {
      return;
  }
} else {
  try {
    data = JSON.parse(e.data);
  }
  catch {
      return;
  }
}


    let dropZone = e.target; 
    let slotId = parseInt(dropZone.getAttribute('data-icon-id'));
    let slotParentId = parseInt(dropZone.getAttribute('data-parent-id'));
    let iconX = parseInt(dropZone.getAttribute('data-icon-x'));
    let iconY = parseInt(dropZone.getAttribute('data-icon-y'));
    let isSlotRight = dropZone.getAttribute('data-slot-right') == "true";
    let isSlotBottom = dropZone.getAttribute('data-slot-bottom') == "true";
    
    console.log('dropzone:'); 
    console.log(dropZone);



    // Set initial icon
    if (icons.length === 0) {
        let parentId = -1;
        let iconId = 0;
        setIcons(()=>(
            [{type:'dashboard', key:iconId, id: iconId, name: data.name, src: data.src, details: data.details, excerpt: data.excerpt, parentId: parentId, level: 0, children: [], x: startPoint.x, y: startPoint.y, spacing: spacing, direction: 'right',childrenDirection: 'right', slotRight: false, slotBottom: true, isStacked: false, draggable: false, isVisible: true }]
        ));
    } else {  // Check if slot is available & which slot?
        if (dropZone.className == 'slot_right' && !isSlotRight) {
            if (dropZone.getAttribute('data-direction') == 'right') {
                let maxId = icons.reduce(getMaxId, -1);
                let id = maxId + 1;
                let parentId = slotParentId;
                if (slotParentId == -1) { // if root
                    parentId = slotId;
                }

                let found = searchRecursivePosition(icons, iconX + spacing, iconY);
                console.log(found);
                if (found) {
                    console.log('occupied');
                    return;
                }
                
                //let testNewIcon = {id: 333, test: 'test' };
                let newIcon = {type:'dashboard', key:id, id: id, name: data.name, src: data.src, details: data.details, excerpt: data.excerpt, parentId: parentId, level: 0, children: [], x: iconX + spacing, y: iconY, spacing: spacing, direction: 'right',childrenDirection: 'right', draggable: false, slotRight: false, slotBottom: false, isStacked: false, isVisible: true, prevIconId: slotId, dropZoneClass: 'slot_right' };

                // find parent id and push to children []
                console.log(
                    searchRecursive(icons, parentId)
                );
                

                setIcons((prevIcons)=>{
                    // Set the slotRight or slotBottom
                    let newIcons = findAnd.changeProps(prevIcons, { id: slotId }, { slotRight: true });
                    let parentIcon = searchRecursive(newIcons, parentId);
                    parentIcon.children.push(newIcon);
                    // Set the children
                    return(findAnd.changeProps(newIcons, { id: parentId }, { children: parentIcon.children  }));
                });
                
            } else if (dropZone.getAttribute('data-direction') == 'bottom') {
                let maxId = icons.reduce(getMaxId, -1);
                let id = maxId + 1;
                let parentId = slotId;
                if (slotParentId == -1) { // if root
                    parentId = slotId;
                }
                // find parent id and push to children []
                console.log(
                    searchRecursive(icons, parentId)
                );

                let found = searchRecursivePosition(icons, iconX + spacing, iconY);
                console.log(found);
                if (found) {
                    console.log('occupied');
                    return;
                }

                //let testNewIcon = {id: 333, test: 'test' };
                let newIcon = {type:'dashboard', key:id, id: id, name: data.name, src: data.src, details: data.details, excerpt: data.excerpt, parentId: parentId, level: 0, children: [], x: iconX + spacing, y: iconY, spacing: spacing, direction: 'right', childrenDirection: 'bottom', draggable: false, slotRight: false, slotBottom: false, isStacked: false, isVisible: true, prevIconId: slotId, dropZoneClass: 'slot_right' };

                // find icon id and push to children []
                let icon = searchRecursive(icons, parentId);
                icon.children.push(newIcon);

                setIcons((prevIcons)=>{
                    // Set the slotRight or slotBottom
                    let newIcons = findAnd.changeProps(prevIcons, { id: slotId }, { slotRight: true });

                    // Set children
                    return(findAnd.changeProps(newIcons, { id: parentId }, { children: icon.children  }));
                });
                
                return;
            }

        }
        // Check if slot is available & which slot?
        else if (dropZone.className == 'slot_bottom' && !isSlotBottom) {
            if (dropZone.getAttribute('data-direction') == 'right') {
                let maxId = icons.reduce(getMaxId, -1);
                let id = maxId + 1;
                let parentId = slotId;
                if (slotParentId == -1) { // if root
                    parentId = slotId;
                }
                // find parent id and push to children []
                console.log(
                    searchRecursive(icons, parentId)
                );

                let found = searchRecursivePosition(icons, iconX, iconY + spacing);
                console.log(found);
                if (found) {
                    console.log('occupied');
                    return;
                }

                //let testNewIcon = {id: 333, test: 'test' };
                let newIcon = {type:'dashboard', key:id, id: id, name: data.name, src: data.src, details: data.details, excerpt: data.excerpt, parentId: parentId, level: 0, children: [], x: iconX, y: iconY + spacing, spacing: spacing, direction: 'bottom', childrenDirection: 'right', draggable: false, slotRight: false, slotBottom: false, isStacked: false, isVisible: true, prevIconId: slotId, dropZoneClass: 'slot_bottom' };

                // find icon id and push to children []
                let icon = searchRecursive(icons, parentId);
                icon.children.push(newIcon);

                setIcons((prevIcons)=>{
                    // Set the slotRight or slotBottom
                    let newIcons = findAnd.changeProps(prevIcons, { id: slotId }, { slotBottom: true });

                    // Set children
                    return(findAnd.changeProps(newIcons, { id: parentId }, { children: icon.children  }));
                });
            } else if (dropZone.getAttribute('data-direction') == 'bottom') {
                let maxId = icons.reduce(getMaxId, -1);
                let id = maxId + 1;
                let parentId = slotParentId;
                if (slotParentId == -1) { // if root
                    parentId = slotId;
                }
                // find parent id and push to children []
                console.log(
                    searchRecursive(icons, parentId)
                );
               
                let found = searchRecursivePosition(icons, iconX, iconY + spacing);
                console.log(found);
                if (found) {
                    console.log('occupied');
                    return;
                }

                //let testNewIcon = {id: 333, test: 'test' };
                let newIcon = {type:'dashboard', key:id, id: id, name: data.name, src: data.src, details: data.details, excerpt: data.excerpt, parentId: parentId, level: 0, children: [], x: iconX , y: iconY + spacing, spacing: spacing, direction: 'bottom',childrenDirection: 'right', draggable: false, slotRight: false, slotBottom: false, isStacked: false, isVisible: true, prevIconId: slotId, dropZoneClass: 'slot_bottom' };

                

                setIcons((prevIcons)=>{
                    // Set the slotRight or slotBottom
                    let newIcons = findAnd.changeProps(prevIcons, { id: slotId }, { slotBottom: true });
                    let parentIcon = searchRecursive(newIcons, parentId);
                    parentIcon.children.push(newIcon);
                    // Set children
                    return(findAnd.changeProps(newIcons, { id: parentId }, { children: parentIcon.children  }));
                });
            }

        }
    }
}

function searchRecursive(data, id) {
  let found = data.find(d => d.id === id);
  if (!found) {
    let i = 0;
    while(!found && i < data.length) {
      if (data[i].children && data[i].children.length) {
        found = searchRecursive(data[i].children, id);
      }
      i++;
    }
  }
  return found;
}

function searchRecursivePosition(data, x, y) {
  console.log(x);console.log(y);
  let found = data.find(d => {
      console.log(d);
      return ((d.x == x) && (d.y == y));
  }
      );
  console.log(found);
  if (!found) {
    let i = 0;
    while(!found && i < data.length) {
      if (data[i].children && data[i].children.length) {
        found = searchRecursivePosition(data[i].children, x, y);
      }
      i++;
    }
  }
  return found;
}
// from array
function getMaxId(maxSoFar, el) {
  return Math.max(maxSoFar, el.id, el.children && el.children.reduce(getMaxId, maxSoFar));
}


  return (
    <div className="App">
      
      <Header />
      <main>
        <LeftMenu onClick={leftMenuClick} activeMenu={iconsMenu} />
        <IconsMenu menu={iconsMenu} dropHandler={dropHandler} />
        <Dashboard iconClick={iconClick} activeIcon={activeIcon} icons={icons} setIcons={setIcons} dropHandler={dropHandler} />
        <RightMenu activeIcon={activeIcon} registerAccClick={registerAccClick} loginClick={loginClick} logoutClick={logoutClick} saveClick={saveClick} loggedIn={loggedIn} loginVisible={loginVisible} registerVisible={registerVisible} saveVisible={saveVisible} />
        <img id='iconDragImg' src='' />  
        <ModalPopUp modalOpen={modalOpen} modalName={modalName} closeModal={closeModal} setLoggedIn={setLoggedIn} setSaveVisible={setSaveVisible} />
      </main>
    </div>
  );
}

export default App;
