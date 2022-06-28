import React, {useState} from 'react';
import Modal from 'react-modal';
import {Register} from './Register';
import {Login} from './Login';
import '../assets/css/Modal.css';


export const ModalPopUp = (props) => {
    console.log(props)
    let content = '';
    switch(props.modalName){
        case 'register':
            content = <Register/>;
            break;
        case 'login':
            content = <Login setLoggedIn={props.setLoggedIn}/>;
            break;
    }
    
    function closeCallBack() {
        props.closeModal();
    }

    return(
        <div id='modal' >
            <Modal 
            isOpen={props.modalOpen}
            onRequestClose={closeCallBack}
            contentLabel="Modal">
                <button onClick={props.closeModal} style={{float: 'right'}} >Close</button>
                {content}
            
            </Modal>
        </div>
    );
}