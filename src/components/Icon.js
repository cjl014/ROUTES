import React, {useState, useEffect} from 'react';
import '../assets/css/Icon.css';

export const Icon = (props) => {
    //const [isMouseDown, setIsMouseDown] = useState(false);
    const [isDraggable, setIsDraggable] = useState(props.draggable);
    const [isStacked, setIsStacked] = useState(false);
    const [showContextMenu, setShowContextMenu] = useState(false);

    let debugMode = false;
    let positionStyles = {};
    let positionDashStyles = {};
    let slotStyles = {};
    let iconDragImg = document.getElementById('iconDragImg');
    if (props.x) {
        positionStyles = {
            left: props.x + 'px',
            top: props.y + 'px'
        }
        positionDashStyles = {
            position: 'absolute',
            left: props.x + 'px',
            top: props.y + 'px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40
        }
    }
    const slotRightStyles = {
        width: 60,
        height: 60,
        position: 'absolute',
        left: props.spacing/2 + 'px',
        top: -10 + 'px',
        border: '2px solid gray',
        opacity: debugMode ? 1 : 0
    }
    const slotBottomStyles = {
        width: 60,
        height: 60,
        position: 'absolute',
        left: -10 + 'px',
        top: props.spacing/2 + 'px',
        border: '2px solid gray',
        opacity: debugMode ? 1 : 0 
    }


    const mouseDownHandler = (e) => {
        
    }
    const contextMenuHandler = (e) => {
        e.preventDefault();
        showContextMenu ? setShowContextMenu(false) : setShowContextMenu(true);
        
    }
    const dragStartHandler = (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(props));
    }
    const touchStartHandler = (e) => {
        console.log(e);
        
        iconDragImg.src = e.target.src;
        iconDragImg.style.display = 'block';
        
        //iconDragImg.style.left = e.touches[0].clientX*2 - 20 + 'px';
        //iconDragImg.style.top = e.touches[0].clientY*2 - 20 + 'px';
        iconDragImg.style.left = e.touches[0].pageX - 20 + 'px';
        iconDragImg.style.top = e.touches[0].pageY - 20 + 'px';

        //e.dataTransfer.setData('text/plain', JSON.stringify(props));
    }
    const touchMoveHandler = (e) => {
        //console.log(e);
        //console.log(e.touches[0].clientX - 20 + 'px');
        //iconDragImg.style.left = e.touches[0].clientX*2 - 20 + 'px';
        //iconDragImg.style.top = e.touches[0].clientY*2 - 20 + 'px';
        console.log(e.touches[0]);
        console.log(e.touches[0].pageX - 20 + 'px');
        iconDragImg.style.left = e.touches[0].pageX - 20 + 'px';
        iconDragImg.style.top = e.touches[0].pageY - 20 + 'px';
        //e.dataTransfer.setData('text/plain', JSON.stringify(props));
    }
    const touchEndHandler = (e) => {
        console.log(e);
        iconDragImg.style.display = 'none';
        let el = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        console.log(el);
        let data = {
            target: el,
            data: JSON.stringify(props)
        }
        props.dropHandler(data);
        //e.dataTransfer.setData('text/plain', JSON.stringify(props));
    }
    const dragHandler = (e) => {
    }
    const dragEndHandler = (e) => {
    }
 

    if (props.type == 'menu') {
        var icon =  (<img className='icon' id={props.id} name={props.name} src={props.src} details={props.details} data-excerpt={props.excerpt} data-parentid= {props.parentId} level={props.level} data-children={props.children}  onMouseDown={mouseDownHandler} onDragStart={dragStartHandler} onDrag={dragHandler} onDragEnd={dragEndHandler} draggable={isDraggable} onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler} style={positionStyles} />)
    } else if (props.type == 'dashboard' && props.isVisible) {
        var icon =  (
            <div data-icon-id={props.id} className='icon_container' name={props.name} src={props.src} data-details={props.details} data-excerpt={props.excerpt} data-parent-id= {props.parentId} data-level={props.level} data-children={props.children} data-direction={props.direction} data-children-direction={props.childrenDirection} data-slot-right={props.slotRight} data-slot-bottom={props.slotBottom} data-is-stacked={props.isStacked} data-is-visible={props.isVisible} data-prev-icon-id={props.prevIconId} data-active={props.activeIcon.id == props.id ? true : false} style={positionDashStyles} onMouseUp={props.iconClick}  onContextMenu={contextMenuHandler} >
                <img className='icon' id={props.id} name={props.name} src={props.src} data-details={props.details} data-excerpt={props.excerpt} data-parent-id= {props.parentId} data-level={props.level} data-children={props.children} data-direction={props.direction} data-children-direction={props.childrenDirection} data-slot-right={props.slotRight} data-slot-bottom={props.slotBottom} data-is-stacked={props.isStacked} data-is-visible={props.isVisible} data-prev-icon-id={props.prevIconId} data-active={props.activeIcon.id == props.id ? true : false} onClick={props.onClick} onMouseDown={mouseDownHandler} onDragStart={dragStartHandler} onDrag={dragHandler} onDragEnd={dragEndHandler} draggable={isDraggable}  />

                <div className="slot_right" data-icon-id={props.id} data-parent-id={props.parentId}  data-direction={props.direction} data-icon-x={props.x} data-icon-y={props.y} data-slot-right={props.slotRight} data-slot-bottom={props.slotBottom} data-is-stacked={props.isStacked} data-is-visible={props.isVisible} style={slotRightStyles}>{props.id}</div>

                <div className="slot_bottom" data-icon-id={props.id}  data-parent-id={props.parentId} data-direction={props.direction} data-icon-x={props.x} data-icon-y={props.y} data-slot-right={props.slotRight} data-slot-bottom={props.slotBottom} data-is-stacked={props.isStacked} data-is-visible={props.isVisible} data-prev-icon-id={props.prevIconId} style={slotBottomStyles}>{props.id}</div>
                
                {showContextMenu ? 
                    (<div className='icon_options'>
                        <button className='delete' data-icon-id={props.id} data-parent-id={props.parentId} data-prev-icon-id={props.prevIconId} data-direction={props.direction} data-children-direction={props.childrenDirection} onClick={props.onDelete}>Remove</button> 
                    </div>)
                : ''}
              
              
            </div>
            
            
            )
    }

    return(
        icon
    )
}