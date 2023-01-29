import { APP_API } from "./config.js";
import Toast from "./toast.js";
import {renderLoginForm} from "./render.js";

function saveTokens(accessToken,refreshToken){
    localStorage.setItem("debtorsTableAccessToken",accessToken);
    localStorage.setItem("debtorsTableRefreshToken",refreshToken);
}

function getTokensFromStorage(){
    let accessToken=localStorage.getItem('debtorsTableAccessToken');
    let refreshToken=localStorage.getItem('debtorsTableRefreshToken');
    if(!accessToken || !refreshToken){
        return null;
    }
    return {accessToken,refreshToken}
}

async function authedFetchGet(url){
    let accessToken=localStorage.getItem('debtorsTableAccessToken');
    let refreshToken=localStorage.getItem('debtorsTableRefreshToken');
    if(!accessToken || !refreshToken){
        renderLoginForm()
    }
    let responce=await fetch(`${APP_API}/${url}`,{
        method: 'GET',
        credentials:'include',
        headers: {
            'Authorization':`Bearer ${accessToken}`,
        },
    })
        .then(res=>{
            let refreshBody={
                "refreshToken":refreshToken
            }
            if(res.status===406){
                localStorage.removeItem('debtorsTableAccessToken')
                localStorage.removeItem('debtorsTableRefreshToken')
                renderLoginForm();
            }
            if(res.status===402){
                // NEW TOKENS
                let responce=fetch(`${APP_API}/refresh`,{
                    method: 'POST',
                    credentials:'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(refreshBody)
                })
                    .then(tokens=>{
                        return tokens.json()
                    })
                    .then(res2=>{
                        console.log('refetching...')
                        let newAccessToken=res2.accessToken;
                        let newRefreshToken=res2.refreshToken;
                        // REFETCH WITH NEW TOKENS
                        return fetch(`${APP_API}/${url}`,{
                            method: 'GET',
                            credentials:'include',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization':`Bearer ${newAccessToken}`
                            },
                        })
                            .then(res3=>{
                                return res3.json()
                            })
                            .then(res4=>{
                                if(res4.status>304){
                                    localStorage.removeItem('debtorsTableAccessToken')
                                    localStorage.removeItem('debtorsTableRefreshToken')
                                    renderLoginForm();
                                    return res4.error
                                } else {
                                    saveTokens(newAccessToken, newRefreshToken)
                                    return res4;
                                }
                            })
                            .catch(err=>console.log(err))
                    })
                return responce.json();
            }
            return res.json();
        })
        .catch(err=>console.log(err))
    return responce;
};

async function checkAccessToken(token){
    let isValidTokenResponceCode=await fetch(`${APP_API}/check-token`,{
        method: 'POST',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "accessToken":token
        })
    }).then(res=>res.status)

    if (isValidTokenResponceCode>=200 && isValidTokenResponceCode<300){
        return true
    }

    if(isValidTokenResponceCode===402){
        let refreshToken=localStorage.getItem('debtorsTableRefreshToken');
        let refreshBody={
            "refreshToken":refreshToken
        }
        let tokensCode;
        let tokensBody=await fetch(`${APP_API}/refresh`,{
            method: 'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(refreshBody)
        }).then(tokens=>{
            tokensCode=tokens.status
            return tokens.json()
        })
        if (tokensCode>299){
            return false
        }
        if (tokensCode>=200 && tokensCode<299){
            let refreshedTokenCheckCode=await fetch(`${APP_API}/check-token`,{
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "accessToken":tokensBody.accessToken
                })
            }).then(res=>res.status)
            if (refreshedTokenCheckCode>=200 && refreshedTokenCheckCode<300){
                saveTokens(tokensBody.accessToken,tokensBody.refreshToken)
                return true
            } else {
                return false
            }
        }
    }

    if (isValidTokenResponceCode>299){
        return false
    }

}

export {saveTokens,getTokensFromStorage,authedFetchGet,checkAccessToken}