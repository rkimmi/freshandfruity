const tempData = {
  "_id": "d2191621ffb360a211d836dc4c011b6d",
  "_rev": "10-a8148dc554ced985a8fc919a4a084ecf",
  "title": "Blame it on the rain: a one night only film screening",
  "description": "Blame it on the rain. A one night only film screening presented by Fresh and Fruity and JPEG2000 as part of Till the World Ends",
  "year": "2017",
  "text": "Plants in water asymmetrically climbing and twisting towards the light. Break. Broken. Fall. Smash. Shatter. Spill the tea. Know yourself & love urself. My heart is so broken. I need to 3D print a new one. What purpose does art have? Blame it on the rain. Performing self management rituals. ASMR videos of baby animals interacting. Having empathy. The water became too warm the algae vomited itself out of the coral. Helplessness. Brains spill out like spaghetti. Mom’s spaghetti. Spaghetti on top. Spaghetti on pizza. Kill the poor SPAGHETT. Aliens emerging from Papatuanuku’s womb coming to save us. Performing or serving?",
  "assocMedia": [
    {
      "title": "Media",
      "url": "Media url",
      "type": "Text Document"
    }
  ],
  "startDate": "10/10/2017",
  "endDate": "20/12/2017",
  "contributors": [
    {
      "name": "Orr Amran",
      "role": "artist"
    },
    {
      "name": "Sophie Cassar",
      "role": "artist"
    },
    {
      "name": "Christian Noelle Charles",
      "role": "artist"
    },
    {
      "name": "Hannah Hallam-Eames",
      "role": "artist"
    },
    {
      "name": "Claire Estermann",
      "role": "artist"
    },
    {
      "name": "Ana Iti",
      "role": "artist"
    },
    {
      "name": "Nunzio",
      "role": "artist"
    },
    {
      "name": "Maddy Plimmer",
      "role": "artist"
    },
    {
      "name": "Autumn Royal",
      "role": "artist"
    },
    {
      "name": "Talia Smith",
      "role": "artist"
    },
    {
      "name": "Kalinda Vary",
      "role": "artist"
    },
    {
      "name": "Layne Waerea",
      "role": "artist"
    },
    {
      "name": "Nicole Webber",
      "role": "artist"
    },
    {
      "name": "JPEG2000",
      "role": "facilitator"
    },
    {
      "name": "Fresh and Fruity",
      "role": "facilitator"
    }
  ],
  "categories": [
    "film screening",
    "text",
    "workshop / hui",
    ""
  ],
  "locations": [{
    "name": "The Physics Room",
    "url": "url here"
  }
  ],
  "images": [
    "link1",
    "link2",
    "link3"
  ],
  "scope": "online-onsite"
}

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
const baseUrl = 'http://localhost:5984'

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

// document.addEventListener('', getInfo())
// document.addEventListener('load', console.log('yea loaded'))

$(document).ready(() => {
  console.log('mounted')
  window.location === 'Users/kimmi/Documents/Workspace/freshandfruity/admin/admin.html' ?
  window.location = 'Users/kimmi/Documents/Workspace/freshandfruity/admin/login.html' :
  // change / admin then /login
  loginPublic()
})

function loginPublic() {
  const publicUser =
  {
    username: 'publicUser',
    password: 'iampublic'
  }
  login(publicUser)
}

function getNavInfo() {
  // projectId = createGuid()
  const req = {
    selector: {
      year: { $gt: 2010 }
    },
    fields: ["_id", "_rev", "year", "title"]
  }
  getProjects(req)
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
  type === 'edit'
    ? ((formTitle[0].innerText = 'Edit Project'),
      $(`#edit-header`).addClass('title-selected'),
      $(`#new-header`).removeClass('title-selected'),
      $(`#edit-title`)[0].innerText = title,
      editing = true,
      projectId = id,
      getProjectInfo(id))
    : ($(`#new-header`).addClass('title-selected'),
      $(`#edit-title`)[0].innerText = '',
      $(`#edit-header`).removeClass('title-selected'),
      editing = false,
      // projectId = createGuid()
        (formTitle[0].innerText = 'New Project'))
  clearFormFields()
}

function clearFormFields() {

}

function getProjectInfo(id) {
  // combine all /_find queries, send req, and callback
  populateEdit()
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
      "Access-Control-Request-Method": "OPTIONS",
      "Access-Control-Request-Headers": "Origin, Accept, Content-Type",
    },
    success: function (data, status, jqXHR) {
      console.log('success', data, status, jqXHR)
      // populateEdit(data)
    },
    error: function (jqXHR, status) {
      // console.log('error', jqXHR, status.code)
      console.log('get projects post failed' + jqXHR, status)
      // alert('fail' + status.code)
    }
  })
}

function populateEdit(project) {
  // using tempData until project complete
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
    input.value = tempData[inputName]
  }
  $(`#${tempData.scope}`)[0].checked = true
  tempData.contributors.forEach((contributor, idx) => {
    populateMultiple(contributor, 'cont', idx, 'c-name', 'c-role')
  })
  tempData.locations.forEach((location, idx) => {
    populateMultiple(location, 'loc', idx, 'l-name', 'l-url')
  })
  tempData.assocMedia.forEach((media, idx) => {
    populateMultiple(media, 'med', idx, 'am-title', 'am-url', 'medbtn')
  })
  $(`#images`)[0].value = tempData.images.toString()
  for (let i = 0; i < catAbr.length; i++) {
    for (let j = 0; j < tempData.categories.length; j++) {
      let category = tempData.categories[j]
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

// function makeJson(formData) {
$('#admin-form').on('submit', function (e) {
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
  sendProject(formatted, editing)
})


function sendProject(form, editing, newId) {
  if (!editing && newId) {
    $.ajax({
      type: "PUT",
      url: `${baseUrl}/fnfprojects/${newId}`,
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
        getProjectList()
      },
      error: function (jqXHR, status) {
        // console.log('error', jqXHR, status.code)
        console.log(jqXHR, status)
        // alert('fail' + status.code)
      }
    })
  }
  else {
    $.ajax({
      type: "POST",
      url: `${baseUrl}/fnfprojects`,
      data: form,
      contentType: "application/json",
      crossDomain: true,
      dataType: 'json',
      headers: {
        "Access-Control-Request-Method": "OPTIONS",
        "Access-Control-Request-Headers": "Origin, Accept, Content-Type",
      },
      success: function (data, status, jqXHR) {
        // console.log('success', data, status, jqXHR)
        getProjectList()
      },
      error: function (jqXHR, status) {
        // console.log('error', jqXHR, status.code)
        console.log(jqXHR, status)
        // alert('fail' + status.code)
      }
    })
  }
}


// function createGuid() {
//   var result, i, j
//   result = ''
//   for (j = 0; j < 32; j++) {
//     if (j == 8 || j == 12 || j == 16 || j == 20)
//       result = result + '-';
//     i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
//     result = result + i
//   }
//   return result
// }

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

function login(loginReq) {
  // const name = document.getElementById('secret-usr').value
  // const psw = document.getElementById('secret-psw').value
  // const loginReq = {
  //   name: name,
  //   password: psw
  // }
  //  if not public user, then on /admin
  if (!loginReq && window.location === '/admin/login') {
    console.log('heya')
    const name = document.getElementById('secret-usr').value
    const psw = document.getElementById('secret-psw').value
    const admin = {
      name: name,
      password: psw
    } // if not public user, then on /admin
    loginReq = admin
  }
  $.ajax({
    type: "POST",
    url: `${baseUrl}/_session`,
    data: JSON.stringify(loginReq),
    contentType: "application/json",
    crossDomain: true,
    dataType: 'json',
    headers: {
      "Access-Control-Request-Method": "OPTIONS",
      "Access-Control-Request-Headers": "Origin, Accept, Content-Type",
    },
    success: function (data, status, jqXHR) {
      // console.log('success', data, status, jqXHR)
      console.log(jqXHR)
      $(`#login-err`).css('display', 'none')
      console.log(jqXHR.getResponseHeader('Set-Cookie'));
      getNavInfo()
      // window.location = '/admin'
    },
    error: function (jqXHR, status) {
      // console.log('error', jqXHR, status.code)
      $(`#login-err`).css('display', 'flex')
      $(`#login-err`)[0].innerHTML = jqXHR.responseJSON.reason
      console.log(jqXHR)
      console.log($(`#login-err`))
      // alert('fail' + status.code)
    }
  })
  // document.cookie = 'fruity-cookie=authgoeshere'
  // window.location = '/admin'
}

function logout() {
  // const cookie = readCookie('fruity-cookie')
  $.ajax({
    type: "DELETE",
    // Accept: 'application/json',
    url: `${baseUrl}/_session?next=/admin/login`,
    contentType: "application/json",
    crossDomain: true,
    dataType: 'json',
    headers: {
      "Access-Control-Request-Method": "OPTIONS",
      "Access-Control-Request-Headers": "Origin, Accept, Content-Type",
    },
    success: function (data, status, jqXHR) {
      console.log('success', data, status, jqXHR)
      // redirect
    },
    error: function (jqXHR, status) {
      console.log(jqXHR, status)
      // log error
      // redirect
    }
  })
  // window.location = 'http://localhost:3000/admin/login'
}

function getProjects(request) {
  console.log(request)
  $.ajax({
    type: "POST",
    url: `${baseUrl}/_find`,
    data: JSON.stringify(request),
    contentType: "application/json",
    crossDomain: true,
    dataType: 'json',
    headers: {
      // "Access-Control-Request-Method": "OPTIONS",
      // "Access-Control-Request-Headers": "Origin, Accept, Content-Type",
      // "Content-Type": 'application/json'
    },
    success: function (data, status, jqXHR) {
      console.log('success', data, status, jqXHR)
      populateProjectList(data)
    },
    error: function (jqXHR, status) {
      // console.log('error', jqXHR, status.code)
      console.log('get projects post failed' + jqXHR, status)
      // alert('fail' + status.code)
      // handle error
      // logout()
    }
  })
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
  projects.forEach(project => {
    // console.log(project)
    const d = document.createElement('div')
    d.className = `modal-title title-small`
    d.id = `${project._id}`
    d.onclick = () => selectForm('edit', project._id, project.title) // need rev?
    d.innerText = `${project.title}`
    div.append(d)
  })
}
