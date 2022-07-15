import React, {useState} from 'react';
import '../assets/css/ForgotPass.css';


export const ForgotPass = (props) => {

    function forgotPassProcess(e) {
        //e.preventDefault();
        console.log(e);
        let formData = new FormData(document.getElementById('form_password_recovery'));
        let url = 'https://demoroutes.lassitek.com/php/forgotPassword.php';
        let submitBtn = document.querySelector('#formContainer #submit');
        let loader = document.querySelector('#formContainer .loader');
        let results = document.querySelector('#formContainer .results');
        let otherInputs = document.querySelector('#otherInputs')
        console.log(formData);

        submitBtn.disabled = true;
        results.style.visibility = 'hidden';
        loader.style.visibility = 'visible';
        fetch(url, {method: 'post', body: formData})
            .then(res => {
                submitBtn.disabled = false;
                results.style.visibility = 'visible';
                loader.style.visibility = 'hidden';
                console.log(res);
                return res.json();
            })
            .then(data => {
                console.log(data);
                let status = data.status;
                let msg = data.msg;
                let err = data.err;
                //let usr = data.username;

                if (status == 'ok') {
                    otherInputs.style.display = 'none';
                    submitBtn.style.display = 'none';
                    results.innerText = 'An email has been sent to the address. Please check that email to reset your password.';
                    //localStorage.setItem('username', usr);
                    //props.setLoggedIn(true);
                    //props.setSaveVisible(true);
                }else {
                    results.innerText = err;
                }
                
            });
    }



    return(
        <div id="formContainer">
           <form id="form_password_recovery" action="javascript:void(0)" data-type="recovery" method="POST" autoComplete="on" onSubmit={forgotPassProcess}>
            <fieldset>
            <h1>Password Recovery</h1>
            <div id="otherInputs">
                <input type="email" name="username" id="username" placeholder="Email Address" required />
            </div>
            <br /><br />
            <input type="submit" name="submit" id="submit"  />
              <div className='loader'></div>
              <div className='results'></div>
            </fieldset>
           </form>
        </div>
    );
}