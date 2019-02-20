
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
<button type="button" class="btn del-btn del-btn dd-margin" onclick="delItem(this)">X</button>
</div>`

// document.addEventListener('', getInfo())
// document.addEventListener('load', console.log('yea loaded'))

$(document).ready(() => {
  getInfo()
})


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

function showModal() {
  const modalTrue = $(`#modal-container`)
  modalTrue.removeClass('modal-false')
  modalTrue.addClass('modal-true')
  $(`#modal`).css('display', 'flex')
}

function hideModal() {
  const modalTrue = $(`#modal-container`)
  modalTrue.removeClass('modal-true')
  modalTrue.addClass('modal-false')
  $(`#modal`).css('display', 'none')
}

function selectForm(type, id, title) {
  const formTitle = $(`#form-title`)
  type === 'edit'
    ? ((formTitle[0].innerText = 'Edit Project'),
      $(`#edit-header`).addClass('title-selected'),
      $(`#new-header`).removeClass('title-selected'),
      $(`#edit-title`)[0].innerText = title,
      getProjectInfo(id))
    : ($(`#new-header`).addClass('title-selected'),
      $(`#edit-title`)[0].innerText = '',
      $(`#edit-header`).removeClass('title-selected'),
      (formTitle[0].innerText = 'New Project'))
}

function getProjectInfo(id) {
  // combine all /_find queries, send req, and callback
    const baseUrl = 'http://localhost:5984'
    const req = {
      selector: {
        _id: {
          "$eq": id
        }
      }
    }
  $.ajax({
    type: "POST",
    url: `${baseUrl}/_find`,
    data: JSON.stringify(req),
    contentType: "application/json",
    crossDomain: true,
    dataType: 'json',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Method": "POST",
        // "Access-Control-Allow-Methods": "POST, GET, PUT, UPDATE, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Credentials": "true"
    },
    success: function (data, status, jqXHR) {
        console.log('success', data, status, jqXHR)
        populateProjects(data)
    },
    error: function (jqXHR, status) {
        // console.log('error', jqXHR, status.code)
        console.log('get projects post failed' + jqXHR, status)
        // alert('fail' + status.code)
    }
 })
}

function makeJson(formData) {
  console.log(formData)
  console.log(formData.length)
  const form = {}
  const contributors = []
  const locations = []
  const assocMedia = []
  const idFields = [
    'title', 
    'description', 
    'year', 'startDate', 
    'endDate', 
    'text',
    'images'
  ]
  // online, onsite, online/onsite - .checked
  // l-name l-url c-name c-role am-title am-url plus media select
  for (let i = 0; i < formData.length; i++) {
    console.log(formData[i].id)
    for (let j = 0; j < idFields.length; j++) {
    }
  }
}

function readCookie(name) { // return fruity-cookie value
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null
}

function getInfo() {
  // combine login, logout && getuser -> send params eg method
  // _session feed
  // const cookie = readCookie('fruity-cookie')
  // cookie ? 
  // getUser(cookie) : 
  // window.location = '/admin/login.html'
  }

function getUser(cookie) {
  console.log('nice one, now verify token -->' + cookie)
  // GET SESSION
  getProjectList()
  const baseUrl = 'http://localhost:5984'
  $.ajax({
    type: "GET",
    url: `${baseUrl}/_session`,
    data: JSON.stringify(loginReq),
    contentType: "application/json",
    crossDomain: true,
    dataType: 'json',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Method": "POST",
        // "Access-Control-Allow-Methods": "POST, GET, PUT, UPDATE, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Cookie": `fruity-cookie=${cookie}`
    },
    success: function (data, status, jqXHR) {
        console.log('success', data, status, jqXHR)
      //  getProjectList()
    },
    error: function (jqXHR, status) {
        // console.log('error', jqXHR, status.code)
        console.log(jqXHR, status)
        // alert('fail' + status.code)
    }
 })
}

function login(creds) {
  const name = document.getElementById('secret-usr').value
  const psw = document.getElementById('secret-psw').value
  const baseUrl = 'http://localhost:5984'
    const loginReq = {
        name: name,
        password: psw
    }
    // console.log(JSON.stringify(loginReq))
    let errDiv = document.getElementById('login-err')
    $.ajax({
        type: "POST",
        url: `${baseUrl}/_session?next=/admin`,
        data: JSON.stringify(loginReq),
        contentType: "application/json",
        crossDomain: true,
        dataType: 'json',
        headers: {
            "Access-Control-Allow-Origin": "*",
            //"Access-Control-Allow-Method": "POST",
            "Access-Control-Allow-Methods": "POST, GET, PUT, UPDATE, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            "Access-Control-Allow-Credentials": "true"
        },
        success: function (data, status, jqXHR) {
            console.log('success', data, status, jqXHR)
  // set cookie!
        },
        error: function (jqXHR, status) {
            // console.log('error', jqXHR, status.code)
            console.log(jqXHR, status)
            // alert('fail' + status.code)
        }
     })
document.cookie = 'fruity-cookie=authgoeshere'
// window.location = '/admin'
}

function logout() {
  // window.localStorage.removeItem('fruity_token')
  // window.location = 'http://localhost:3000/admin/login'
  const baseUrl = 'http://localhost:5984'
  const cookie = readCookie('fruity-cookie')
  $.ajax({
    type: "DELETE",
    // Accept: 'application/json',
    url: `${baseUrl}/_session?next=/admin/login`,
    contentType: "application/json",
    // Cookie: '',
    crossDomain: true,
    dataType: 'json',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Method": "POST",
        // "Access-Control-Allow-Methods": "POST, GET, PUT, UPDATE, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Cookie": cookie
    },
    success: function (data, status, jqXHR) {
        console.log('success', data, status, jqXHR)
    },
    error: function (jqXHR, status) {
        // console.log('error', jqXHR, status.code)
        console.log(jqXHR, status)
        // alert('fail' + status.code)
    }
 })
 window.location = 'http://localhost:3000/admin/login'
}

function getProjectList() {
  console.log('getProjectList called')
  populateProjectList()
//   const baseUrl = 'http://localhost:5984'
//   const req = {
//       selector: {
//           year: {$gt: 2010}
//       },
//       fields: ["_id", "_rev", "year", "title"]
// }
//   $.ajax({
//     type: "POST",
//     url: `${baseUrl}/_find`,
//     data: JSON.stringify(req),
//     contentType: "application/json",
//     crossDomain: true,
//     dataType: 'json',
//     headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Method": "POST",
//         // "Access-Control-Allow-Methods": "POST, GET, PUT, UPDATE, DELETE, OPTIONS",
//         "Access-Control-Allow-Headers": "Authorization",
//         "Access-Control-Allow-Credentials": "true"
//     },
//     success: function (data, status, jqXHR) {
//         console.log('success', data, status, jqXHR)
//         populateProjects(data)
//     },
//     error: function (jqXHR, status) {
//         // console.log('error', jqXHR, status.code)
//         console.log('get projects post failed' + jqXHR, status)
//         // alert('fail' + status.code)
//     }
//  })
}

function populateProjectList(projects) {
  const tempPro = [{
      _id: "d2191621ffb360a211d836dc4c011b6d",
      _rev: "6-c59e7122bcdf1b2c7480f55524576233",
      year: "2017",
      title: "Blame it on the rain: a one night only film screening"
    },
    {
      _id: "d21hdjkhuidjh91621ffb360a211d836dc4c00454b",
      _rev: "9-0e59c6f091bf2b223682dd8176330eff",
      year: "2017",
      title: "Blame It on the Rain Volume ii"
    }
  ]
  let div = $(`#projects-list`)
  tempPro.forEach(project => {
    const d = document.createElement('div')
    d.className = `modal-title title-small`
    d.id = `${project._id}`
    d.onclick = () => selectForm('edit', project._id, project.title)
    d.innerText = `${project.title}`
    div.append(d)
  })
}
