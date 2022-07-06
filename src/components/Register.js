import React, {useState} from 'react';
import '../assets/css/Register.css';


export const Register = (props) => {
    function registerUser(e) {
        //e.preventDefault();
        console.log(e);
        let formData = new FormData(document.getElementById('form'));
        let url = 'https://demoroutes.lassitek.com/php/createUser.php';
        let submitBtn = document.querySelector('#formContainer #submit');
        let loader = document.querySelector('#formContainer .loader');
        let results = document.querySelector('#formContainer .results');
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
                if (status == 'ok') {
                    results.innerText = 'User Created Successfully';
                    props.setSaveVisible(true);
                }else {
                    results.innerText = err;
                }
                
            });
    }

    return(
        <div id="formContainer">
          <form id="form" action="javascript:void(0)" method="POST" onSubmit={registerUser} >
            <fieldset>
              <h1>Registration Form</h1>
              <div id="otherInputs">
                <input type="email" name="email" id="email" placeholder="Email Address" required />
                <input type="password" name="password" id="password" placeholder="Password" minLength='6' required />
                <input type="password" name="password2" id="password2" placeholder="Password" minLength='6' required />
                
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