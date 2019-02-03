
/* global $ */
// var $ = require("jquery");
// import $ from "jquery"
// var request = require('request')

let state = {
  contCount: 1,
  locCount: 1,
  medCount: 1
}

let modalShowing = true

const contDiv = `<div class="col-md-5 mb-3">
<small id="role-help" class="text-hidden"></small>
<input type="text" class="form-control form-control-sm" id="c-name" aria-describedby=""
    placeholder="Name">
</div>
<div class="col-md-5 mb-3">
<small id="role-help" class="text-muted"></small>
<input type="text" class="form-control form-control-sm" id="c-role" aria-describedby=""
    placeholder="Artist" value="Artist">
</div>
<button type="button" class="btn del-btn btn-margin" onclick="delItem(this)">X</button>`

const locDiv = `<div class="col-md-4 mb-3">
    <input type="text" class="form-control form-control-sm" id="l-name" aria-describedby=""
        placeholder="Site Name">
</div>
<div class="col-md-5 mb-3">
    <input type="text" class="form-control form-control-sm" id="l-url" aria-describedby=""
        placeholder="Site specific project url">  
</div>
<button type="button" class="btn del-btn btn-margin" onclick="delItem(this)">X</button>`

const medDiv = `<div class="col-md-4 mb-3">
<input type="text" class="form-control form-control-sm" id="am-title" aria-describedby=""
    placeholder="Title">
</div>
<div class="col-md-5 mb-3">
<input type="text" class="form-control form-control-sm" id="am-url" aria-describedby=""
    placeholder="Link to media">
</div>
<div class="dropdown">
<div class="btn custom-dropdown dd-menu-margin small-btn-custom dropdown-toggle dropdownMenudiv"
    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Media Type
</div>
<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" onclick="selectMedia(this)">Text Documemnt</a>
    <a class="dropdown-item" onclick="selectMedia(this)">Video</a>
    <a class="dropdown-item" onclick="selectMedia(this)">Image</a>
    <a class="dropdown-item" onclick="selectMedia(this)">Audio</a>
    <a class="dropdown-item" onclick="selectMedia(this)">Online work</a>
    <a class="dropdown-item" onclick="selectMedia(this)">None</a>
</div>
</div>
<button type="button" class="btn del-btn del-btn btn-margin" onclick="delItem(this)">X</button>
</div>`

document.addEventListener('DOMContentLoaded', getProjects())

function addField(name) {
  let toAppend
  name === 'loc'
    ? (toAppend = locDiv)
    : name === 'cont'
    ? (toAppend = contDiv)
    : name === 'med'
    ? (toAppend = medDiv)
    : false
  state[`${name}Count`]++
  const field = $(`#${name}-container`)
  const d = document.createElement('div')
  field.append(d)
  d.className = `form-row ${name}-row`
  d.id = `${name}${state[`${name}Count`]}`
  $(`#${name}${state[`${name}Count`]}`).append(toAppend)
}

function delItem(item) {
  const contFields = $(`#${item.parentElement.id}`)
  contFields.remove()
}

function toggleCat(id) {
  const cat = $(`#${id}`)
  cat[0].className.includes('cat-selected')
    ? (cat.removeClass('cat-selected'), removeHover(cat))
    : (cat.css('background', 'white'),
      cat.css('color', 'magenta'),
      cat.addClass('cat-selected'))
}

function removeHover(cat) {
  setTimeout(() => {
    cat.css('color', '')
    cat.css('background', '')
  }, 1000)
}

function selectMedia(media) {
  const text = media.innerText
  if (media.innerText === 'None') {
    media.parentElement.previousElementSibling.innerText = 'Media Type'
  } else {
    media.parentElement.previousElementSibling.innerText = text
  }
}

function toggleModal() {
  const modIcon = $(`#modal-icon`)
  modIcon[0].className.includes('modal-true')
    ? (modIcon.removeClass('modal-true'),
    modIcon.addClass('modal-false'),
      modIcon.attr('src', 'chev-up.png'))
    : (modIcon.removeClass('modal-false'),
    //   modalCont.css('display', ''),
    modIcon.addClass('modal-true'),
    modIcon.attr('src', 'chev-down.png'))
}

function selectForm(type) {
  const title = $(`#form-title`)
  type === 'edit'
    ? ((title[0].innerText = 'Edit Project'),
      $(`#edit-header`).addClass('title-selected'),
      $(`#new-header`).removeClass('title-selected'))
    : ($(`#new-header`).addClass('title-selected'),
      $(`#edit-header`).removeClass('title-selected'),
      (title[0].innerText = 'New Project'))
}

function selectTitle() {}

function makeJson(formData) {
  console.log(formData)
}

function getProjects() {}

function login(creds) {
  const baseUrl = 'http://localhost:5984'
    const loginReq = {
        name: creds[0].value,
        password: creds[1].value
    }
    // let errDiv = document.getElementById('login-err')
    $.ajax({
        type: "POST",
        url: "https://localhost:5984/_session",
        body: JSON.stringify(loginReq),
        contentType: "application/json",
        // crossDomain: true,
        // dataType: "json",
        beforeSend: function(request) {
          request.setRequestHeader("Access-Control-Allow-Origin", '*'
          )},
        success: function (data, status, jqXHR) {
            console.log(data, status, jqXHR)
        },
        error: function (jqXHR, status) {
            console.log(jqXHR, status)
            // alert('fail' + status.code)
        }
     })
    //  console.log(JSON.stringify(loginReq))
//   request.post({
//   url: `${baseUrl}/_session`,
//   body: {name: usr, password: psw},
//   headers: [{
//     name: 'content-type',
//     value: 'application/json'
//   }]
// }, (err, response, body) =>
// console.log(err, response, body))
}


// module.exports = {
//   addField,
//   delItem,
//   getProjects,
//   login,
//   makeJson,
//   removeHover,
//   selectForm,
//   selectMedia,
//   selectTitle,
//   toggleCat,
//   toggleMedia,
// }