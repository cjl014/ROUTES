import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import '../assets/css/ResetPass.css';


export const ResetPass = (props) => {

    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const reset_token = urlParams.get('reset_token');
    console.log(reset_token);

    if (!reset_token) {
        return <Redirect to='/' />
    }

    
function resetPass (e) {
    let formData = new FormData(document.getElementById('form_reset'));
    let url = 'https://demoroutes.lassitek.com/php/resetPassword.php';
    let submitBtn = document.querySelector('#formContainer #submit');
    let loader = document.querySelector('#formContainer .loader');
    let results = document.querySelector('#formContainer .results');
    let otherInputs = document.querySelector('#otherInputs');
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
            let usr = data.username;
   
            if (status == 'ok') {
                otherInputs.style.display = 'none';
                submitBtn.style.display = 'none';
                results.innerText = 'Your password has been reset';
                window.setTimeout(()=>{
                    window.location.href = '/';
                }, 5000);

            }else {
                results.innerText = msg;
            }
            
        });
   }

    return(
        <div id='resetPass' >

            <div id="formContainer">
                <form id="form_reset" action="javascript:void(0)" data-type="reset" method="post" onSubmit={resetPass}>
                    <fieldset>
                        <h1>Reset Password</h1>
                        <div id="otherInputs">
                            <input type="password" name="password" id="password" placeholder="Password" minLength='6' required />
                            <input type="hidden" name="reset_token" id="reset_token" value={reset_token} />
                        </div>
                        <br />
                        <br />
                        <input type="submit" name="submit" id="submit"  />
                        
                        
                        <div className='loader'></div>
                        <div className='results'></div>
                        
                    </fieldset>
                </form>
            </div>

        </div>
    );
}