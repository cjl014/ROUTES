import React, {useState, useEffect} from 'react';
import img1 from './assets/img/04.png';
import logo from './logo.svg';
import './App.css';
import {Header} from './components/Header';
import {LeftMenu} from './components/LeftMenu';
import {RightMenu} from './components/RightMenu';
import {IconsMenu} from './components/IconsMenu';
import {Dashboard} from './components/Dashboard';

function App() {
  const [iconsMenu, setIconsMenu] = useState('');
  const [activeIcon, setActiveIcon] = useState({name: '', excerpt: '', details: '', src: '', children: '[]'});

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

  return (
    <div className="App">
      
      <Header />
      <main>
        <LeftMenu onClick={leftMenuClick} activeMenu={iconsMenu} />
        <IconsMenu menu={iconsMenu} />
        <Dashboard iconClick={iconClick} activeIcon={activeIcon} />
        <RightMenu activeIcon={activeIcon} />
      </main>
    </div>
  );
}

export default App;
