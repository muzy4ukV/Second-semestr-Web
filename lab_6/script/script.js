// Task 1
function changeText(element1, element2){
    let x = document.getElementById(element1).innerHTML;
    let y = document.getElementById(element2).innerHTML;
    document.getElementById(element2).innerText = x;
    document.getElementById(element1).innerText = y;
}

// Task 2

function getRadius(input_name){
    let radius = Number(document.getElementById(input_name).value);
    if (radius >= 0){
        let area = Math.PI * Math.pow(radius, 2);
        let child = document.createElement("h3");
        child.innerHTML = `Коло з радіусом ${radius}cm має площу = ${area}cm2`;
        document.getElementsByClassName("center")[0].appendChild(child);
    } else {
        alert('Радіус повинен бути додатнім');
    }
}

// Task 3


window.addEventListener('load', (event) => {
    let maxNumber = getCookie("maxNumber");
    if (maxNumber != "") {
        if (confirm("cookies: " + document.cookie + "\nClear cookies?")) {
            document.cookie = "maxNumber=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            location.reload();
        } else {
            alert("Cookies haven't been deleted, please reload the web page");
        }
    }
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function getMax(className) {
    let arr = document.getElementsByClassName(className);
    let maxValue = Number(arr[0].value);
    for (let i = 1; i < arr.length; i++){
        if(Number(arr[i].value) > maxValue){
            maxValue = Number(arr[i].value);
        }
    }
    document.cookie = "maxNumber=" + maxValue + ";expires=Thu, 26 Jan 2023 00:00:00 UTC; path=/;";
    alert("Максимальне значення це " + maxValue + "\n" + document.cookie);
}

// Task 4

const block = document.getElementsByClassName('topmenu');

window.addEventListener('focus', (event) => {
    block[0].style.backgroundColor = '#333';
});

window.addEventListener('blur', (event) => {
    let backColor;
    if(localStorage.getItem('color') != ''){
        backColor = localStorage.getItem('color');
    } else {
        backColor = '#333';
    }
    block[0].style.backgroundColor = backColor;
});

function saveColor(elementId){
    localStorage.setItem('color', document.getElementById(elementId).value);
}

// Task 5

var flag = false;

function createForm(parentName){
    // Check if not create
    if(flag) return;
    flag = true;

    let parent = document.getElementsByClassName(parentName)[0];

    let form = document.createElement("div");
    form.className = "form";

    // Create textArea
    let textArea = document.createElement("textarea");
    textArea.placeholder = "Введіть код сюди";
    textArea.className = "texts";
    form.append(textArea);

    // Create add button

    let addButton = document.createElement("button");
    addButton.onclick = function () { addElem(parent, textArea.value); }; 
    addButton.innerHTML = "Змінити блок";
    form.append(addButton);

    // Create delete button

    let deleteButton = document.createElement("button");
    deleteButton.onclick = function() {
        // remove new items
        while(parent.firstChild.className == "extra") {
            parent.removeChild(parent.firstChild);
        }
        //show old items
        let childs = parent.children;
        for(let i = 0; childs[i].style.display == "none"; i++){
            childs[i].style.display = "block";
        }
    };
    deleteButton.innerHTML = "Відновити початковий зміст";
    form.append(deleteButton);

    // Create remove button

    let removeButton = document.createElement("button");
    removeButton.onclick = function() {
        parent.removeChild(document.getElementsByClassName("form")[0]);
        flag = false;
    };
    removeButton.innerHTML = "Приховати";
    form.append(removeButton);

    parent.appendChild(form);
}

function addElem(parent, code) {
    let child = parent.children;

    for(let i = 0; child[i].className != "edit"; i++){
        if (child[i].className != "extra"){
            child[i].style.display = "none";
        }
    }

    localStorage.setItem(parent.className + 'newHTML', code);

    let newItem = document.createElement('div');
    newItem.className = "extra";
    newItem.innerHTML += localStorage.getItem(parent.className + 'newHTML');

    parent.insertBefore(newItem, parent.firstChild);

    parent.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Lab 6

var num_of_section = 1;

function createParagraph() {
    let parent = document.getElementById('accordion');

    let element = document.createElement("button");
    element.className = "accordion-element";
    element.innerHTML = "Секція " + num_of_section;
    parent.appendChild(element);

    let text = document.createElement("p");
    text.className = "accordion-text";
    text.innerHTML = 'Просто текст цього заголовку. Для редагування тексту клацніть 2 рази по ньому.';
    parent.appendChild(text);
    num_of_section += 1;

    element.addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.margin = "0px";
            panel.style.maxHeight = null;
        } else {
            panel.style.margin = "16px";
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    
    });

    text.addEventListener("dblclick", function() {
        this.innerHTML = "";

        let block = document.createElement("div");
        block.className = "form";
        
        let textArea = document.createElement("textarea");
        textArea.placeholder = "Введіть новий текст сюди";
        block.appendChild(textArea);

        let addButton = document.createElement("button");
        addButton.onclick = function () {
            this.parentNode.innerHTML = textArea.value;
        }; 
        addButton.innerHTML = "Змінити блок";
        block.appendChild(addButton);

        this.appendChild(block);
        this.style.maxHeight = block.scrollHeight + "px";
    });
}

function deleteParagraph() {
    if(num_of_section <= 1) return;
    var parent = document.getElementById('accordion');
    parent.removeChild(parent.lastChild);
    parent.removeChild(parent.lastChild);
    num_of_section -= 1;
}