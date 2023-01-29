import {authedFetchGet} from "./fetch.js";
import {renderTableData, renderTableFetchLoader} from "./render.js";

async function addTableScripts(){
    let housesData=await authedFetchGet('houses');
    const housesAmount = housesData.map(value => {
        return (
            `
            <option value="${value.id}">
                ${value.id}
            </option>
            `
        );
    }).join('');

    const tableHouseSelector = document.getElementById("debtorsHouseSelector");
    tableHouseSelector.insertAdjacentHTML('beforeend',housesAmount)

    document.getElementById('debtorsHouseSelector').addEventListener('change',async function(){
        renderTableFetchLoader()
        let houseId=document.getElementById('debtorsHouseSelector').value
        let data=await authedFetchGet(`debts-by-house/${houseId}`)
        console.log(document.getElementById('debtorsMonthsInput').value)
        renderTableData(data)
    })

    document.getElementById('debtorsMonthsInput').addEventListener('input',async function(){
        let houseId=document.getElementById('debtorsHouseSelector').value
        let months=document.getElementById('debtorsMonthsInput').value
        if(houseId && months){
            renderTableFetchLoader()
            let data=await authedFetchGet(`debts-by-house-and-months/${houseId}/${months}`)
            renderTableData(data)
        }
    })
}

export {addTableScripts}

