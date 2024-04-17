const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');         
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]');         

const LOCAL_STORAGE_LIST_KEY = 'task.lists'; //storing the list values in the localstroge of browser
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedlistId'; //to know which item is selected
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)



listsContainer.addEventListener('click',e =>{
    if(e.target.tagName.toLowerCase() === 'li'){
        selectedListId = e.target.dataset.listId;
        saveAndrender();
    }
})


deleteListButton.addEventListener('click',e =>{
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = null;
    saveAndrender();
});


newListForm.addEventListener('submit', e =>{
    e.preventDefault();
    const listName =  newListInput.value;
    lists.push(list);
    if(listName == null || listName === '') return;
    const list = createList(listName);
    newListInput.value = null; //gives the empty todo
    lists.push(list);
    saveAndrender();
    
})

function createList(name){
    return {id: Date.now().toString(),/*to get the unique id */name:name,task: []};
}
function saveAndrender(){
    save();
    render(); 
}
function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY,selectedListId);
}

function render(){
    //another function def
    clearElement(listsContainer);

    lists.forEach(list =>{
        const listElement = document.createElement('li');
        listElement.dataset.listId = list.id;
        listElement.classList.add("list-name");
        listElement.innerText = list.name;
        if(list.id === selectedListId){
            listElement.classList.add('active-list');
        }
        listsContainer.appendChild(listElement);
    })
}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}
render()