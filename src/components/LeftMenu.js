import React from 'react';
//import menuImg1 from '../assets/img/Menu - Ad Campaigns/Menu-Ad-Campaigns.svg';
//import menuImg2 from '../assets/img/Menu - Ecommerce/Menu - Ecommerce.png';
//import menuImg3 from '../assets/img/Menu - Mail Services/Menu - Mail Services.png';
//import menuImg4 from '../assets/img/Menu - Text Services/Menu - Text Services.png';
import { ReactComponent as MenuImg1 } from '../assets/img/Menu - Ad Campaigns/Menu-Ad-Campaigns.svg';
import { ReactComponent as MenuImg2 } from '../assets/img/Menu - Ecommerce/Menu-Ecommerce.svg';
import { ReactComponent as MenuImg3 } from '../assets/img/Menu - Mail Services/Menu-Mail-Services.svg';
import { ReactComponent as MenuImg4 } from '../assets/img/Menu - Text Services/Menu-Text-Services.svg';
import '../assets/css/LeftMenu.css';

const asideStyles = {
    background: '#485364',
    width: 50,
    height: '100vh',
    padding: '10px 0 0 0'
}
const menuImgStyles = {
    width: 28,
    //color: '#fff',
    //filter: 'invert(1)',
    cursor: 'pointer'
}
const menuLiStyles = {
    padding: '0 10px 18px 10px'
}
//const menuImgs = [<MenuImg1/>,<MenuImg2/>,<MenuImg3/>,<MenuImg4/>];
const menuImgs = [<MenuImg1/>,<MenuImg2/>,<MenuImg3/>,<MenuImg4/>];

export const LeftMenu = (props) => {
    return(
        <aside id="leftMenu" style={asideStyles} data-active-menu={props.activeMenu}>
            <ul>
                {menuImgs.map((svg, i)=>(
                    <li key={i}  style={menuLiStyles} data-active={props.activeMenu == 'menu'+i ? true : false}>
                        <div id={'menu'+i} style={menuImgStyles} onClick={props.onClick}>
                            {svg}            
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
        /*
        <aside style={asideStyles} >
            <ul>
                {menuImgs.map((src, i)=>(
                    <li key={i}  style={menuLiStyles}><img id={'menu'+i} src={src} style={menuImgStyles} onClick={props.onClick} /><menuImg1 /></li>
                ))}
            </ul>
        </aside>
        */
    );
}