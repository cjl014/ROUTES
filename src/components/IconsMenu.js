import React from 'react';
import {IconsAdCampaign} from './IconsAdCampaign';
import {IconsEcommerce} from './IconsEcommerce';
import {IconsMailServices} from './IconsMailServices';
import {IconsTextServices} from './IconsTextServices';
import {Icon} from './Icon';

const asideStyles = {
    background: '#F4FAFC',
    width: 100,
    height: '100vh',
    padding: '6px 2px 0',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
}
const menuImgStyles = {
    width: '100%',
    cursor: 'grab'
}
const menuLiStyles = {
    padding: '0 10px 10px 10px'
}
const iconContainerStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 5,
    cursor: 'grab',
    
}
const iconNameStyles = {
    fontSize: 10,
    flexBasis: '100%'
}

export const IconsMenu = (props) => {
    let iconsList;
    if (props.menu == 'menu0') {
        iconsList = IconsAdCampaign;
    }else if (props.menu == 'menu1') {
        iconsList = IconsEcommerce;
    }else if (props.menu == 'menu2') {
        iconsList = IconsMailServices;
    }else if (props.menu == 'menu3') {
        iconsList = IconsTextServices;
    }else {
        iconsList = [];
    }
    return(
        <aside style={asideStyles} >
            <ul>
                {iconsList.map((icon,i)=>(
                    <li key={'menuIcon' + i} className="icon_container" style={iconContainerStyles}>
                        <Icon type='menu' name={icon.name} src={icon.src} details={icon.details} excerpt={icon.excerpt} draggable={true}/>
                        <div style={iconNameStyles}>{icon.name}</div>
                    </li>
                    
                ))}
            </ul>
        </aside>
    );
}