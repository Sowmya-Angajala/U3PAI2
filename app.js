import { db } from "./firebase-config.js";
import { ref, push, set, onValue, remove }
    from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const form = document.getElementById('itemForm');
const list = document.getElementById('list');
const totalItemsE1 = document.getElementById('totalItems')
const grandCostE1 = document.getElementById('grandCost');
const filterBtns = document.querySelectorAll('#files button')


//Local state 
let items = []
let filter = "All"
let lastDeleteBtn = null;

//Firebase Refrences
const itemsRef = ref(db, 'items');

function savetoLocal() {
    localStorage.setItem('quickcart_items',
        JSON.stringify(items));
}

function loadFromLocal() {
    const local = localStorage.getItem('quickcart_items');
    if (local) {
        items = JSON.parse(local);
        renderItems();
    }
}
function renderItems() {
    list.innerHTML = ''
    let totalQty = 0;
    let totalCost = 0;
    items.filter(item => filter === 'All' || item.category === filter)
        .forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.qty} * ${item.price}
           (${item.category})`;
            const delBtn = document.createElement('button')
            delBtn.textContent = 'Delete'
            delBtn.onclick = () => deleteItem(item, id);
            li.appendChild(delBtn)
            list.appendChild(li);

            totalQty += item.qty;
            totalCost += item.qty * item.price;

        });
    totalItemsE1.textContent = totalQty;
    grandCostE1.textContent = totalCost.toFixed(2);
    savetoLocal();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const qty = parseInt(document.getElementById('qty').value);
    const price = parseInt(document.getElementById('price').value);
    //  const category= parseFloat(document.getElementById('category').value);
    const category = parseInt(document.getElementById('category').value);
    if (isNaN(category)) {
        alert("Invalid category entered.");
        return;
    }

    // const category=document.getElementById('category').value.trim().toLowerCase();
    // const validCategories=['products','diary','snacks'];

    // if(!validCategories.includes(category)){
    //     alert("Invalid category entered..");
    //     return;
    // }
    set(ref(db, 'items/' + id), {
        name: nameInput.value,
        category: category
    });

    const newRef = push(itemsRef);
    const newItem = {
        id: newRef.key, name, qty, price, category
    };

    set(newRef, newItem);
    form.reset()

});

onValue(itemsRef, (snapshot) => {
    items = []
    snapshot.forEach(child => {
        items.push(child.val())
    });
    renderItems()
})
function deleteItem(id) {
    const itemRef = ref(db, 'items/' + id);
    lastDeletedItem = items.find(item => item.id === id);
    remove(itemRef)
    showUndoToast();
}
function showUndoToast() {
    const toast = document.createElement('div');
    toast.className = 'undo-toast';
    toast.textContent = 'Item deleted';
    const undoBtn = document.createElement('button')
    undoBtn.textContent = 'undo';
    undoBtn.onclick = () => {
        if (lastDeletedItem) {
            const newRef = ref(db, 'items/' + lastDeletedItem.id);
            set(newRef, lastDeletedItem);
            lastDeletedItem = null;
            toast.remove()
        }
    };
    toast.appendChild(undoBtn)
    document.body.appendChild(toast);
    setTimeout(() => toast, remove(), 5000);
}
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filter = btn.dataset.filter;
        renderItems();
    })
})
loadFromLocal();