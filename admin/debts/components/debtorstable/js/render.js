import {authLogin} from "./auth.js";
import {addTableScripts} from "./table.js";

function renderDebtorsTable(){
    let debtorsTable= `
    <div class="row">
        <div class="col-md-6 debtorsSelectBlock">
            <div class="debtorsSelectHeader">№ Дома:</div>
            <select id="debtorsHouseSelector" class="debtorsHouseSelect">
            <option value="" selected disabled hidden>--Выберите дом--</option>
            </select>
        </div>
        <div class="col-md-6 debtorsSelectBlock">
            <div class="debtorsSelectHeader">Месяцы задолженности:</div>
            <input class="debtorsMonthsInput" id="debtorsMonthsInput" type="number">
        </div>
    </div>

    <div class="row debtorsTableBlock">
        <table id="debtorsTable" class="debtorsTable col-xs-12">
            <thead>
                <th>№ п/п</th>
                <th>Фамилия</th>
                <th>Месяцы</th>
                <th>Задолженность</th>
            </thead>
            <tbody id="debtorsTableBody"></tbody>
        </table>
    </div>
    `
    document.getElementById('debtorsTableContainer').innerHTML=debtorsTable
    document.getElementById('debtorsMonthsInput').addEventListener("keypress", function (evt) {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
        {
            evt.preventDefault();
        }
    });
    addTableScripts();
}

function renderTableData(data){
    let tableData = data.map(value => {
        return (
            `<tr>
       <td>${value.rec_id}</td>
       <td>${value.username}</td>
       <td>${value.quant_month}</td>
       <td>${value.quant_bal}</td>
            </tr>`
        );
    }).join('');

    let table = document.getElementById("debtorsTableBody");
    table.innerHTML=tableData
}

function renderLoginForm(){
    let loginForm= `
    <form id="debtorsLoginForm">
        <div class="debtorsLoginForm">
            <h2 class="debtorsLoginHeader">
                Логин
            </h2>
            
            <div class="debtorsLoginError">
            </div>
            
            <label class="debtorsFormLabel" for="email">Логин</label>
            <input class="debtorsFormInput" required placeholder="Введите ваш логин..." id="debtorsLogin" />
            <label class="debtorsFormLabel" for="password">Пароль</label>
            <input class="debtorsFormInput" required placeholder="Введите ваш пароль..." type="password" id="debtorsPassword" />
            
            <button disabled class="debtorsLoginButton" id="debtorsLoginButton">Войти</button>
        </div>
    </form>
    `
    document.getElementById('debtorsTableContainer').innerHTML=loginForm
    document.getElementById('debtorsLoginButton').addEventListener('click',async function(event){
        authLogin(event);
    })
    let form=document.getElementById('debtorsLoginForm')
    let loginButton=document.getElementById('debtorsLoginButton')
    let loginInput=document.getElementById('debtorsLogin')
    let passwordInput=document.getElementById('debtorsPassword')
    function changeFormHandler() {
        // console.log(form.checkValidity());
        if (form.checkValidity()) {
            loginButton.removeAttribute('disabled');
        }
        if (form.checkValidity()===false) {
            loginButton.setAttribute('disabled',"true");
        }
    }
    form.addEventListener('change',function(){
        changeFormHandler()
    });
    loginInput.addEventListener('input',function (){
        changeFormHandler()
    })
    passwordInput.addEventListener('input',function (){
        changeFormHandler()
    })

}

function renderLoader(){
    let loader=`
    <div>
        <div class="debtorsLoading"></div>
    </div>
    `
    document.getElementById('debtorsTableContainer').innerHTML=loader
}

function renderTableFetchLoader(){
    let loader=`
    <div>
        <div class="debtorsLoading"></div>
    </div>
    `
    document.getElementById('debtorsTableBody').innerHTML=loader
}

function renderLoginError(error){
    document.querySelector('.debtorsLoginError').innerHTML=`<div>${error}</div>`
}

export {renderLoginForm,renderDebtorsTable,renderLoader,renderLoginError,renderTableFetchLoader,renderTableData}