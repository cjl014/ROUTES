import React from 'react';
import '../assets/css/RightMenu.css';
import menuImg1 from '../assets/img/Menu - Ad Campaigns/Menu - Ad Campaigns.png';
import menuImg2 from '../assets/img/Menu - Ecommerce/Menu - Ecommerce.png';
import menuImg3 from '../assets/img/Menu - Mail Services/Menu - Mail Services.png';
import menuImg4 from '../assets/img/Menu - Text Services/Menu - Text Services.png';

const asideStyles = {
    background: '#485364',
    width: 215,
    height: '100vh',
    padding: '10px 10px 0'
}
const menuImgStyles = {
    width: 28,
    color: '#fff',
    filter: 'invert(1)',
    cursor: 'pointer'
}
const menuLiStyles = {
    padding: '0 10px 10px 10px'
}
const menuImgs = [menuImg1,menuImg2,menuImg3,menuImg4];

export const RightMenu = (props) => {
    const iconName = (<b className='icon_Name'>{props.activeIcon.name}</b>);
    const iconDetails = (<div className='icon_details'>{props.activeIcon.details}<hr /></div>);
    const iconExcerpt = (<div className='icon_excerpt'>{props.activeIcon.excerpt}<hr /></div>);
    const iconImg = (<div className='icon_img'>{props.activeIcon.src}</div>);
    let iconChildren = [];
    if (props.activeIcon.children && props.activeIcon.children != '[]') {
        iconChildren = (
            <div className='icon_children'>
                {JSON.parse(props.activeIcon.children).map((child, i)=>{
                    return (
                        <div key={'child_icon_' + i} className='child_container'>
                            <img className='child_img' src={child.src} />
                            <span className='child_name'>{child.name}</span>
                            
                        </div>
                    );
                })}  
                <hr />
            </div>
        );
    }

    return(
        <aside id='rightMenu' style={asideStyles} >
            <div style={{color: 'white', fontSize: 10, fontWeight: 'bold', background: '#6d7a8f', padding: '2px'}}>ASSETS PANEL</div>
            <div style={{color: 'white', fontSize: 10, padding: '10px', textAlign: 'left'}}>
                {!props.activeIcon.name ? 'Nothing selected' : iconName }
                {!props.activeIcon.details ? '' : iconDetails }
                {!props.activeIcon.children ? '' : iconChildren }
                {!props.activeIcon.excerpt ? '' : iconExcerpt }
            
            </div>
        </aside>
    );
}