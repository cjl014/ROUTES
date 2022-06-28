import React, {useState, useEffect} from 'react';
import {Icon} from './Icon';
var findAnd = require("find-and");

const styles = {
    width : '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}
const spacing = 80;

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


export const Dashboard = (props) => {
    const [iconCounter, setIconCounter] = useState(1);
    const [startPoint, setStartPoint] = useState({x:0, y:0});
    let icons = props.icons;

    useEffect(()=>{
        let dashboard = document.getElementById('dashboard');
        setStartPoint({x: dashboard.offsetLeft + spacing, y: dashboard.offsetTop + spacing}); 
    },[])
    useEffect(()=>{
    
        console.log(icons);
    },[icons])

    const checkOverlap = () => {

    }
    const clickHandler = (e) => {
        let icon = e.target;
        let iconId = parseInt(icon.id);
        let isStacked = icon.getAttribute('data-is-stacked') == "true";
        let children = JSON.parse(icon.getAttribute('data-children'));
        let iconObj = searchRecursive(icons, iconId);
        
        console.log(iconId);

        let ids = [];

      
        
        if (children.length > 0) {
            if (!isStacked) {
                let newIcons = findAnd.changeProps(icons, { id: iconId }, { isStacked: true });
                loop(iconObj);
                //loop(iconObj, "isVisible", false);
                if (ids.length > 0){
                    ids.forEach((id)=>{ 
                        newIcons = findAnd.changeProps(newIcons, { id: id }, { isVisible: false });
                    })
                }
    
                props.setIcons((prevIcons)=>{
                    return newIcons;
                })
    
                console.log(ids);
                console.log(iconObj);
                console.log(newIcons);
            }
            else {
                let newIcons = findAnd.changeProps(icons, { id: iconId }, { isStacked: false });
                loop(iconObj);
                //loop(iconObj, "isVisible", false);
                if (ids.length > 0){
                    ids.forEach((id)=>{ 
                        newIcons = findAnd.changeProps(newIcons, { id: id }, { isVisible: true });
                    })
                }
    
                props.setIcons((prevIcons)=>{
                    return newIcons;
                })
    
                console.log(ids);
                console.log(iconObj);
                console.log(newIcons);
            }
        }
        
        
        function loop(a) {
            a.children.forEach((obj)=>{

                ids.push(obj.id);
                
                if (obj.children.length > 0 && !obj.isStacked) {
                    loop(obj);
                }
            })
        }
/*
        if (!isStacked) {
            props.setIcons((prevIcons)=>{
                let newIcons = findAnd.changeProps(prevIcons, { id: iconId }, { isStacked: true });
            })
        } else {
            props.setIcons((prevIcons)=>{
                let newIcons = findAnd.changeProps(prevIcons, { id: iconId }, { isStacked: false });
            })
        }*/
    }
    
    const deleteHandler = (e) => {
        let iconId = parseInt(e.target.getAttribute('data-icon-id'));
        let parentId = parseInt(e.target.getAttribute('data-parent-id'));
        let iconDir = e.target.getAttribute('data-direction');
        let prevIconId = parseInt(e.target.getAttribute('data-prev-icon-id'));
        let iconX = parseInt(e.target.getAttribute('data-x'));
        let iconY = parseInt(e.target.getAttribute('data-y'));
        let prevIconIdArr = [];

        console.log(icons);
        loop6(icons[0]);
        
        function loop6(a) {
            console.log(a);
            console.log(a.children);
            
            a.children.forEach((obj)=>{

                if (obj.prevIconId == iconId){
                    prevIconIdArr.push(obj.id);
                }
                
                if (obj.children.length > 0) {
                    loop6(obj);
                }
            })
        }
        
        console.log(prevIconIdArr);


        props.setIcons((prevIcons)=>{
            let newIcons
            // Set the slotRight or slotBottom
            if (iconDir == 'right') {
                newIcons = findAnd.changeProps(prevIcons, { id: prevIconId }, { slotRight: false });
            }
            if (iconDir == 'bottom') {
                newIcons = findAnd.changeProps(prevIcons, { id: prevIconId }, { slotBottom: false });
            }
           


            //let parentIcon = findAnd.returnFound(newIcons, { id: parentId });
            newIcons = findAnd.removeObject(newIcons, { id: iconId });

            function loop8(prevIcs) {
                let prevIc = findAnd.returnFound(newIcons, { prevIconId: prevIcs.id });
                console.log(prevIc);
                
                if (prevIc != undefined){
                    newIcons = findAnd.removeObject(newIcons, { id: prevIc.id });
                    loop8(prevIc);
                }
            }
            
            let prevIc = findAnd.returnFound(newIcons, { prevIconId: iconId });
            if (prevIc != undefined){
                newIcons = findAnd.removeObject(newIcons, { id: prevIc.id });
                loop8(prevIc);
            }
            
            
            

            console.log(parentId);
            //console.log(parentIcon);
            //console.log(parentIcon.children.length);

            //let prevIcon = findAnd.returnFound(newIcons, { prevIconId: prevIconId });
            //prevIcon.x = iconX;
            //prevIcon.y = iconY;
            //newIcons = findAnd.replaceObject(newIcons, { id: prevIconId });
            
    
            // Remove icon object
            return(newIcons);
        });
    }

    const dragOverHandler = (e) => {
        e.preventDefault(); // or dropHandler won't work
    }
    const dropHandler = (e) => {
        let data;

        try {
            data = JSON.parse(e.dataTransfer.getData("text/plain"));
        }
        catch {
            return;
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
            props.setIcons(()=>(
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
                    

                    props.setIcons((prevIcons)=>{
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

                    props.setIcons((prevIcons)=>{
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

                    props.setIcons((prevIcons)=>{
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

                    

                    props.setIcons((prevIcons)=>{
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


    let iconEl = [];

    // array deep loop
    function loopIcons(a) {
        for (var i = 0, l = a.length; i < l; i++) {
            if (a[i].children instanceof Array) {

                let icon = a[i];

                iconEl.push(<Icon type='dashboard' key={icon.key} id={icon.id} name={icon.name} src={icon.src} details={icon.details} excerpt={icon.excerpt} parentId={icon.parentId} level={icon.level} children={JSON.stringify(icon.children)} x={icon.x} y={icon.y} spacing={icon.spacing} direction={icon.direction} childrenDirection={icon.childrenDirection} slotRight={icon.slotRight} slotBottom={icon.slotBottom} isStacked={icon.isStacked} isVisible={icon.isVisible} draggable={icon.draggable} onClick={clickHandler} onDelete={deleteHandler} prevIconId={icon.prevIconId} iconClick={props.iconClick} activeIcon={props.activeIcon} />);
        
                loopIcons(a[i].children);
                
            } else {
                console.log(a[i]);
            }
        }
    }

    // hide/show icons
    function setStackVisibility(a) {
        for (var i = 0, l = a.length; i < l; i++) {
            if (a[i].children instanceof Array) {

                let icon = a[i];
                //let newIcons = findAnd.changeProps(a, { id: icon.id }, { visible: false });
                a[i].visible = false;

                setStackVisibility(a[i].children);
                
            } else {
                console.log(a[i]);

                
            }
        }
    }
    
    function dashboardClickHandler() {
        /*let ops = document.getElementsByClassName('icon_options');
  
        for (let i=0; i<ops.length; i++) {
            ops[i].style.display = 'none';
        }*/
    }

    loopIcons(icons);

    return(
        <div id="dashboard" style={styles}  onDragOver={dragOverHandler} onDrop={dropHandler} onClick={dashboardClickHandler}>
            {iconEl.length ? iconEl : (
                <div id="introText">
                    <h1 style={{color: '#00b6b8'}}>No Campaigns yet.</h1>
                    <p>Start by selecting Ad Platform and dragging a platform into this window.</p>
                </div>
            )}
        </div>
    );
}