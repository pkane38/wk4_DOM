// I need a 1. Level Class  2. Class   3 Add new level, add a new member

class Member {
    constructor(name, membershipdate) {
        this.name = name;
        this.membershipdate = membershipdate;
    }
}

class Level {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.members = [];
    }

    addMember(Member) {
        this.members.push(member);
    }

    deleteMember(member) {
        let index = this.members.indexOf(member);
        this.member.splice(index, 1);
    };
}

let levels = [];
let levelId = 0;

onClick('new-level', () => {  
    levels.push(new Level(levelId++, getValue('new-level-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);  //simplifier function
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {  //simplifier function
    return document.getElementById(id).value;
}


function drawDOM() {
    let levelDiv = document.getElementById('levels');
    clearElement(levelDiv);                  //create this function-done see below
    for (level of levels) {
        let table = createLevelTable(level); //create this function-done
        let title = document.createElement('h2');//create this function-done
        title.innerHTML = level.name;
        title.appendChild(createDeleteLevelButton(level));//create this function-done
        levelDiv.appendChild(title);
        levelDiv.appendChild(table);
        for (member of level.members) {
            createMemberRow(level, table, member); //create this function
        }
  }   
}

function createMemberRow(level, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.membershipdate;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(level, member));//need to create this button-done
}

function createDeleteRowButton(level, member) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = level.members.indexOf(member);
        level.members.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteLevelButton(level) {
    let btn = document.createElement('button');
    btn.className = 'mx-3 btn btn-primary';
    btn.innerHTML = 'Delete Level';
    btn.onclick = () => {
        let index = levels.indexOf(level);
        levels.splice(index, 1);
        drawDOM();  //re-renders the dom
    };
    return btn;
}

function createNewMemberButton(level) {
    let btn =document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        level.members.push(new Member(getValue(`name-input-${level.id}`), getValue(`membershipdate-input-${level.id}`)));
        drawDOM();
    };
    return btn;
}

function clearElement(element) {  //clears/removes every 1st child as long as there is 1st child there
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    };
}
//
function createLevelTable(level) {  //builds a table off of a new team
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-light table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');//we could have used a temporal literal, but. here we see ea. attribute
    let membershipdateColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    membershipdateColumn.innerHTML = 'Membership Date';
    row.appendChild(nameColumn);
    row.appendChild(membershipdateColumn);
    let formRow = table.insertRow(1); // form that has place where we can enter new team members
    let nameTh = document.createElement('th');
    let membershipdateTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');//place where name is added
    nameInput.setAttribute('id', `name-input-${level.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let membershipdateInput = document.createElement('input');
    membershipdateInput.setAttribute('id', `membershipdate-input-${level.id}`);
    membershipdateInput.setAttribute('type', 'date');
    membershipdateInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(level);
    nameTh.appendChild(nameInput);
    membershipdateTh.appendChild(membershipdateInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(membershipdateTh);
    formRow.appendChild(createTh);
    return table;

}

