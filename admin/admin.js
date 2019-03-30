
const catAbr = [
  { name: 'Text', id: 'cat-T' },
  { name: 'Installation', id: 'cat-W' },
  { name: 'Performance', id: 'cat-P' },
  { name: 'Sculpture', id: 'cat-S' },
  { name: 'Audio', id: 'cat-A' },
  { name: 'Jewellery', id: 'cat-J' },
  { name: 'Video', id: 'cat-V' },
  { name: 'Fashion', id: 'cat-F' },
  { name: 'Film Screening', id: 'cat-FS' },
  { name: 'Workshop / Hui', id: 'cat-WH' },
]

let state = {
  contCount: 1,
  locCount: 1,
  medCount: 1
}

let modalShowing = true
const baseUrl = 'http://192.168.1.227:5984'
// change to deployed db url 

let editing = false
let projectId = null

const contDiv = `<div class="col-md-5 mb-3">
<small id="role-help" class="text-hidden"></small>
<input type="text" class="form-control form-control-sm c-name" id="c-name" aria-describedby=""
    placeholder="Name">
</div>
<div class="col-md-5 mb-3">
<small id="role-help" class="text-muted"></small>
<input type="text" class="form-control form-control-sm c-role" id="c-role" aria-describedby=""
    placeholder="Artist" value="Artist">
</div>
<button type="button" class="btn del-btn btn-margin" onclick="delItem(this)">X</button>`

const locDiv = `<div class="col-md-4 mb-3">
    <input type="text" class="form-control form-control-sm l-name" id="l-name" aria-describedby=""
        placeholder="Site Name">
</div>
<div class="col-md-5 mb-3">
    <input type="text" class="form-control form-control-sm l-url" id="l-url" aria-describedby=""
        placeholder="Site specific project url">  
</div>
<button type="button" class="btn del-btn btn-margin" onclick="delItem(this)">X</button>`

const medDiv = `<div class="col-md-4 mb-3">
<input type="text" class="form-control form-control-sm am-title" id="am-title" aria-describedby=""
    placeholder="Title">
</div>
<div class="col-md-5 mb-3">
<input type="text" class="form-control form-control-sm am-url" id="am-url" aria-describedby=""
    placeholder="Link to media">
</div>
<div class="dropdown">
<div id='medbtn'class="medbtn btn custom-dropdown dd-menu-margin small-btn-custom dropdown-toggle dropdownMenudiv"
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

const publicUser =
{
  username: 'publicUser',
  password: 'iampublic'
}

const exampleReq = {
  selector: {
    year: { $gt: 2010 }
  }
}

$(document).ready(() => {

  window.location.toString().includes('/fnfadmin') && !localStorage.getItem('freshnfruitygallery@gmail.com') 
  ? window.location = '/freshandfruity/login' 
    : !window.location.toString().includes('login') && !window.location.toString().includes('/fnfadmin') && !localStorage.getItem('publicUser') 
    ? login(publicUser, getAllProjects, exampleReq) // FOR SEAN TO CHANGE
    // change 2nd and 3rd arg 
    // Above login is called when no publicUser in localStorage (we assume user isnt authorised with public login)
    // 2nd arg to login fnc will be the first api request to be called on successful login,
    // 3rd arg is the request body aka selector
    // see example getAllProjects below
    : window.location.toString().includes('/fnfadmin') && localStorage.getItem('freshnfruitygallery@gmail.com') 
    ? getNavInfo() 
    : getAllProjects(exampleReq) // FOR SEAN TO CHANGE
    // this will be called if all goes well / user is authorised and not on admin routes
    // Replace getAllProjects() with first api request
    // see example getAllProjects() below

$('#admin-form').on('submit', function (e) {
  e.preventDefault()
  formatForm(e.currentTarget)
})
})

function getAllProjects(req) {
  // Call _find for all db queries, just change selectors / req body
  _find(req)
  // to populate nav, best to specify only required fields 
  // e.g;
  // const sampleReq2 = {
  //   selector: {
  //     year: { $gt: 2010 }
  //   },
  //   fields: ["_id", "title"]
  // }
  // this will return with { docs: [{project} {project} {project}] }
  // then on click of project, make additional request specifying project by id
  // e.g;
  // const sampleReq1 = {
  //   selector: {
  //     _id: {
  //       "$eq": id
  //     }
  //   }
  // }
  // this will return with { docs: [{project}] }
  // more info on couchdb selectors:
  // https://docs.couchdb.org/en/stable/api/database/find.html#find-selectors
}


function getNavInfo() {
  resetForm()
 // projectId = createGuid()
   const req = {
    selector: {
      year: { $gt: 2010 }
    },
    fields: ["_id", "_rev", "year", "title"]
  }
  _find(req)
}

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
  if (type === 'edit') {
    formTitle[0].innerText = 'Edit Project'
    $(`#edit-header`).addClass('title-selected')
    $(`#new-header`).removeClass('title-selected')
    $(`#edit-title`)[0].innerText = title
    editing = true
    projectId = id
    const req = {
      selector: {
        _id: {
          "$eq": id
        }
      }
    }
    _find(req)
  } else {
    ($(`#new-header`).addClass('title-selected'),
      $(`#edit-title`)[0].innerText = '',
      $(`#edit-header`).removeClass('title-selected'),
      editing = false,
      (formTitle[0].innerText = 'New Project'))
    clearFormFields()
  }
}

function resetForm() {
  document.getElementById("admin-form").reset()
}

function populateEdit(project) {
  const idFields = [
    'title',
    'description',
    'year', 'startDate',
    'endDate',
    'text'
  ]
  for (let i = 0; i < idFields.length; i++) {
    const inputName = idFields[i]
    const input = document.getElementById(idFields[i])
    input.value = project[inputName]
  }
  $(`#${project.scope.replace('/', '-')}`)[0].checked = true
  project.contributors.forEach((contributor, idx) => {
	  populateMultiple(contributor, 'cont', idx, 'c-name', 'c-role')
  })
  project.locations.forEach((location, idx) => {
	  populateMultiple(location, 'loc', idx, 'l-name', 'l-url')
  })
  project.assocMedia.forEach((media, idx) => {
    populateMultiple(media, 'med', idx, 'am-title', 'am-url', 'medbtn')
  })
  $(`#images`)[0].value = project.images.toString()
  for (let i = 0; i < catAbr.length; i++) {
    for (let j = 0; j < project.categories.length; j++) {
      let category = project.categories[j]
      if (category === catAbr[i].name.toLowerCase()) {
        $(`#${catAbr[i].id}`).addClass('cat-selected')
      }
    }
  }
}

function populateMultiple(item, short, idx, field1, field2, field3) {
  let inputCount = $(`.${field1}`).length
  if (idx === 0) {
    $(`.${field1}`)[idx].value = item[field1.split('-')[1]]
    $(`.${field2}`)[idx].value = item[field2.split('-')[1]]
    field3 ? $(`.${field3}`)[idx].innerText = item.type : '' // only for media select
    inputCount++
  }
  else if (idx <= inputCount) { // previndex
    addField(short)
    $(`.${field1}`)[idx].value = item[field1.split('-')[1]]
    $(`.${field2}`)[idx].value = item[field2.split('-')[1]]
    field3 ? $(`.${field3}`)[idx].innerText = item.type : ''
  }
}

function formatForm(formData) {
const form = {
    contributors: [],
    locations: [],
    assocMedia: [],
    images: [],
    categories: [],
    scope: ''
  }
  const idFields = [
    'title',
    'description',
    'year', 'startDate',
    'endDate',
    'text'
  ]
  let contributor = {}
  let location = {}
  let assocMedia = {}
  for (let i = 0; i < formData.length; i++) {
    const input = formData[i]
    switch (input.id) {
      case 'images':
        form.images = (input.value.split(', ') || input.value.split(','))
        break;
      case 'c-name':
        contributor.name = input.value
        break;
      case 'c-role':
        contributor.role = input.value
        const newCont = Object.assign({}, contributor)
        form.contributors.push(newCont)
        break;
      case 'l-name':
        location.name = input.value
        break;
      case 'l-url':
        location.url = input.value
        const newLoc = Object.assign({}, location)
        form.locations.push(newLoc)
        break;
      case 'am-title':
        assocMedia.title = input.value
        break;
      case 'am-url':
        assocMedia.url = input.value
        break;
      case 'medbtn':
        input.innerText === 'Media Type ' ?
          assocMedia.type = ''
          : assocMedia.type = input.innerText
        const newAssocMed = Object.assign({}, assocMedia)
        form.assocMedia.push(newAssocMed)
        break;
    }
    if (input.id.includes('cat') && input.className.includes('cat-selected')) {
      form.categories.push(input.innerText)
    }
    else if (input.className.includes('form-check-input') && input.checked) {
      form.scope = input.id
    }
    for (let j = 0; j < idFields.length; j++) {
      if (formData[i].id === idFields[i]) {
        form[input.id] = input.value
      }
    }
  }
  const formatted = JSON.stringify(form)
  sendProject(formatted, editing, projectId)
}


function sendProject(form, editing, id) {
  const req = {
    selector: {
      year: { $gt: 2010 }
    },
    fields: ["_id", "_rev", "year", "title"]
  }
  // if (!editing && id) {
    $.ajax({
      type: !editing ? 'POST' : 'PUT',
      url: !editing ? `${baseUrl}/fnfprojects` : `${baseUrl}/fnfprojects/${id}`,
      data: form,
      contentType: "application/json",
      crossDomain: true,
      dataType: 'json',
      headers: {
        "Access-Control-Request-Method": "OPTIONS",
        "Access-Control-Request-Headers": "Origin, Accept, Content-Type",
      },
      success: function (data, status, jqXHR) {
        console.log('success', data, status, jqXHR)
        _find(req)
      },
      error: function (jqXHR, status) {
        // console.log('error', jqXHR, status.code)
        console.log(jqXHR, status)
        alert('fail' + status.code)
      }
    })
  return false;
}
  // else {
  //   $.ajax({
  //     type: "POST",
  //     url: `${baseUrl}/fnfprojects/${id}`,
  //     data: form,
  //     contentType: "application/json",
  //     crossDomain: true,
  //     dataType: 'json',
  //     headers: {
  //       "Access-Control-Request-Method": "OPTIONS",
  //       "Access-Control-Request-Headers": "Origin, Accept, Content-Type",
  //     },
  //     success: function (data, status, jqXHR) {
  //       // console.log('success', data, status, jqXHR)
  //       _find(req)
  //     },
  //     error: function (jqXHR, status) {
  //       // console.log('error', jqXHR, status.code)
  //       console.log(jqXHR, status)
  //       alert('fail' + status.code)
  //     }
    // })
// function createGuid() {
// var result, i, j
//  result = ''
//  for (j = 0; j < 32; j++) {
//  if (j == 8 || j == 12 || j == 16 || j == 20)
//  result = result + '-';
//  i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
//  result = result + i
// }
// return result
//}

// function readCookie(name) { // return fruity-cookie value
//   var nameEQ = name + "=";
//   var ca = document.cookie.split(';');
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i]
//     while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null
// }

function redirectAdmin() {
  window.location = '/freshandfruity/fnfadmin'
}

function loginAdmin() {
  const name = document.getElementById('secret-usr').value
  const psw = document.getElementById('secret-psw').value
  user = {
    username: name,
    password: psw
  }
  login(user, redirectAdmin, false)
}

function login(loginReq, callback, cbBody) {
  // login called if no user in localStorage OR on unauthorised request to db
  // callback = function to be called on successful login
  // callback will be initial failed query if query responded with unauthorised
  // ^ see _find() calls login with failed query params
  $.ajax({
    type: "POST",
    url: `${baseUrl}/_session`,
    data: JSON.stringify(loginReq),
    contentType: "application/json",
    crossDomain: true,
    dataType: 'json',
    headers: {
      "Access-Control-Request-Method": "OPTIONS",
      "Access-Control-Request-Headers": "Origin, Accept, Content-Type"
    },
    success: function (data, status, jqXHR) {
      $(`#login-err`).css('display', 'none')
      localStorage.setItem(data.name, 'assumedLogin=true')
      data.name === 'freshnfruitygallery@gmail.com' ? localStorage.removeItem('publicUser') : localStorage.removeItem('freshnfruitygallery@gmail.com')
      callback(cbBody)
    },
    error: function (jqXHR, status) {
      if (window.location.toString().includes('/login')) {
        $(`#login-err`).css('display', 'flex')
        $(`#login-err`)[0].innerHTML = jqXHR.responseJSON.reason
      }
    }
  })
}

function logout() {
  $.ajax({
    type: "DELETE",
    url: `${baseUrl}/_session?next=/login`,
    contentType: "application/json",
    crossDomain: true,
    dataType: 'json',
    headers: {
      "Access-Control-Request-Method": "OPTIONS",
      "Access-Control-Request-Headers": "Origin, Accept, Content-Type",
    },
    success: function (data, status, jqXHR) {
      window.location = '/freshandfruity/login'
      localStorage.removeItem('freshnfruitygallery@gmail.com')
    },
    error: function (jqXHR, status) {
      window.location = '/freshandfruity/login'
      localStorage.removeItem('freshnfruitygallery@gmail.com')
    }
  })
}

function _find(request) {
  $.ajax({
    type: "POST",
    url: `${baseUrl}/fnfprojects/_find`,
    data: JSON.stringify(request),
    contentType: "application/json",
    crossDomain: true,
    dataType: 'json',
    headers: {
      "Access-Control-Request-Method": "OPTIONS",
      "Access-Control-Request-Headers": "Origin, Accept, Content-Type"
    },
    success: function (data, status, jqXHR) {
      populateProjectList(data.docs)
    },
    error: function (jqXHR, status) {
      // console.log('get projects post failed' + jqXHR, status)
      window.location.toString().includes('/fnfadmin') 
      ? window.location = 'freshandfruity/login' 
      : login(publicUser, _find, request)
    }
  })
}

function populateProjectList(projects) {
  let div = $(`#projects-list`)
  projects.forEach(project => {
    const d = document.createElement('div')
    d.className = `modal-title title-small`
    d.id = `${project._id}`
    d.onclick = () => selectForm('edit', project._id, project.title) // need rev?
    d.innerText = `${project.title}`
    div.append(d)
  })
}
