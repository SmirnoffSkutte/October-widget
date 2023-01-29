import { APP_API, APP_URL } from "./config.js";
import {checkAccessToken, getTokensFromStorage} from "./fetch.js";
import {renderDebtorsTable, renderLoader, renderLoginError, renderLoginForm} from "./render.js";

async function authLogin(event){
    event.preventDefault()
    let username=document.getElementById('debtorsLogin').value;
    let userPassword=document.getElementById('debtorsPassword').value;

    let user = {
        "username": username,
        "password": userPassword
    };
    let responce=await fetch(`${APP_API}/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res=>{
            // if(res.status > 304){
            //     return res.json();
            // }
            return res.json()
        })
        .then(res=>{
            if(res.hasOwnProperty('error')){
                console.log(res.error)
                renderLoginError(res.error);
            } else {
                localStorage.setItem("debtorsTableAccessToken",res.tokens.accessToken);
                localStorage.setItem("debtorsTableRefreshToken",res.tokens.refreshToken);
                renderDebtorsTable();
            }
        })
        .catch(err=>console.log(err));
};

window.addEventListener('load',async function(){
    let tokens=getTokensFromStorage();
    if (tokens){
        renderLoader();
        let isValidToken=await checkAccessToken(tokens.accessToken)
        console.log(`isValidToken :  ${isValidToken}`)
        isValidToken ? renderDebtorsTable() : renderLoginForm()
    } else {
        renderLoginForm()
    }
})

export {authLogin}