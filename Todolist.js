const addUserBtn = document.getElementById('addUser')
const userNameTextField = document.getElementById('username')
const recordsDisplay = document.getElementById('records')
let edit_id = null;
const btnText = addUserBtn.innerText

let userAarry = []; // data store
// get data

let objstr = localStorage.getItem('users')
// console.log(objstr)

if (objstr != null) {
    userAarry = JSON.parse(objstr)  //convert string to object
}
// console.log(userAarry)

displayData()

addUserBtn.onclick = () => {
    const name = userNameTextField.value;
    // update user
    if (edit_id != null) {
        userAarry.splice(edit_id, 1, {
            'name': name
        })
        edit_id = null
    }
    else {
        userAarry.push({ 'name': name });
        // console.log(userAarry)
    }
    saveData(userAarry)
    userNameTextField.value = "";
    addUserBtn.innerText = btnText
}

function saveData(userAarry) {
    // console.log(userAarry)

    let str = JSON.stringify(userAarry);  //convert object to string
    // console.log(str)
    localStorage.setItem('users', str);
    displayData()
}

function displayData() {
    let data = '';
    userAarry.forEach((user, i) => {
        // console.log(user)
        data += `<tr>
        <th>${i + 1}</th>
        <td>${user.name}</td>
        <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i></td>
        </tr>`
        console.log(data)
    })
    recordsDisplay.innerHTML = data;
}

function EditInfo(id) {
    // alert(i)
    edit_id = id
    userNameTextField.value = userAarry[id].name;
    addUserBtn.innerText = 'Update User';

}

function DeleteInfo(id) {
    userAarry.splice(id, 1);
    saveData(userAarry);
}
