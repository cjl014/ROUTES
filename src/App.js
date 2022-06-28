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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [icons, setIcons] = useState([]);
  const [iconsMenu, setIconsMenu] = useState('');
  const [activeIcon, setActiveIcon] = useState({name: '', excerpt: '', details: '', src: '', children: '[]'});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalName, setModalName] = useState('');

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
      alert('You must login first');
    }
  }
  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className="App">
      
      <Header />
      <main>
        <LeftMenu onClick={leftMenuClick} activeMenu={iconsMenu} />
        <IconsMenu menu={iconsMenu} />
        <Dashboard iconClick={iconClick} activeIcon={activeIcon} icons={icons} setIcons={setIcons} />
        <RightMenu activeIcon={activeIcon} registerAccClick={registerAccClick} loginClick={loginClick} logoutClick={logoutClick} saveClick={saveClick} loggedIn={loggedIn} />
        <ModalPopUp modalOpen={modalOpen} modalName={modalName} closeModal={closeModal} setLoggedIn={setLoggedIn} />
      </main>
    </div>
  );
}

export default App;
