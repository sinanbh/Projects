const header = document.querySelector('header');
const title = document.querySelector('.title');
const leftTitle = document.querySelector('.left-title');
const rightTitle = document.querySelector('.right-title');
const addLists = document.querySelector('.add-list');
const addItem = document.querySelector('.add-item');
const closeBtn = document.querySelector('.close-btn');
const addBtn = document.querySelector('.close-btn');
const listInput = document.querySelector('.list-input');
const itemInput = document.querySelector('.item-input');
const noItem = document.querySelector('.empty-comment');
const cardContainer = document.querySelector('.card-container');



function popUpMenu() 
{
    header.classList.toggle('disable');
    addLists.classList.toggle('active');
    listInput.value = "";
}

let objectArray = [];

function addList()
{
    if (listInput.value !== "") 
    {
        let listObject = {
            id: Date.now(),
            listInput: listInput.value
        }

        objectArray.push(listObject);
        noItem.style.display = "none";
        createCard();
        listInput.value = "";
    } 
    else 
    {
        
    }
    popUpMenu();
}

let flag;
function popupItem(val) 
{
    if(val !== false) 
    {
        flag = val.parentNode.id;    //////id.............
        header.classList.toggle('disable');
        addItem.classList.toggle('active');
    } 
    else 
    {
        itemInput.value = "";
        header.classList.toggle('disable');
        addItem.classList.toggle('active');
    }
}


function createCard() {
    const card = document.createElement('div');
    card.setAttribute('class', 'cards');
    for (let i = 0; i < objectArray.length; i++) 
    {
        card.setAttribute("id", objectArray[i].id);
        card.innerHTML = `<div class="cardTitle">${objectArray[i].listInput}</div><hr>
                        <div class="items"></div>
                        <button onclick="deleteCard(this)" class="del-icon"><span class="material-icons md-36 icon" >delete</span></button>
                        <button onclick="popupItem(this)" class="add-icon"><span class="material-icons md-36 icon" >add_circle</span></button>`;
        cardContainer.appendChild(card);
    }
}



function deleteCard(val) 
{
    let rem = val.parentElement;
    const value = val.parentElement.id;
    for (let i = 0; i < objectArray.length; i++) 
    {
        if (objectArray[i].id === Number(value)) 
        {
            objectArray.splice(i, 1);
            break;
        }
    }
    rem.remove();
    if (objectArray.length == 0) 
    {
        noItem.style.display = "block";
    }
}


function addItems() 
{
    if(itemInput.value !== "") 
    {
        let innerDiv = document.createElement('div');
        innerDiv.setAttribute("class", "innerDiv");
        for (let i = 0; i < objectArray.length; i++) 
        {
            let cardNo = cardContainer.children[i];
            let  tasks = cardNo.children[2];
            if (objectArray[i].id === Number(flag)) 
            {
                innerDiv.innerHTML = `<span class="intext">${itemInput.value}</span>
                                    <button onclick="markDone(this)" class="mark">Mark Done</button>`;
                tasks.appendChild(innerDiv);
            }
        }
        itemInput.value = "";
    } 
    else 
    {
        
    }
    popupItem(false);
}


function markDone(param) {
    let innerDivChildren = param.parentNode.children;
    let innerDivText = innerDivChildren[0];
    let innerDivBtn = innerDivChildren[1];
    let cardId = param.parentNode.parentNode.parentNode.id;
    for(let i = 0; i < objectArray.length; i++) {
        if(objectArray[i].id === Number(cardId)) {
            innerDivBtn.style.display = "none";
            innerDivText.style.color = "red";
            innerDivText.style.textDecoration = "line-through";
            innerDivText.style.textDecorationColor = "darkred";
            break;
        }
    }
}
