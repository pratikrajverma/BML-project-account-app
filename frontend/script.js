function submitHandler(event) {
  event.preventDefault();

  const form = document.querySelector("#createForm");

  const formdata = new FormData(form);

  const formObject = {};

  formdata.forEach((value, key) => {
    formObject[key] = value;
  });

  console.log(formObject);

  createProfile(formObject);
}

async function createProfile(formData) {
  try {
    const response = await fetch("http://localhost:4000/api/v1/createProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // getProfile();
    window.location.reload();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getProfile() {
  const response = await fetch("http://127.0.0.1:4000/api/v1/getProfile");
  const data = await response.json();
  // console.log(data.data)

  const profile = document.querySelector("#profile");

  // card.classList.add("card");

  data?.data.forEach((element) => {
    // console.log(element)
    const card = document.createElement("div");

    card.innerHTML = `<div class='card' >
                    <h1>Name: ${element.name}</h1>
                    <p>Email : ${element.email}</p>
                    <p>Phone : ${element.phone}</p>
                    <p>Address : ${element.address}</p>
                    <div class="updateBtn">
                        <button onclick="deleteHandler('${element._id}')">delete</button>
                        <button onclick="editHandler('${element._id}')">edit</button>
                    </div>
                </div>`;

    profile.appendChild(card);
  });
}

getProfile();

async function deleteHandler(profileId) {
  try {
    await fetch(`http://127.0.0.1:4000/api/v1/deleteProfile/${profileId}`, {
      method: "DELETE",
    });

    // getProfile();
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

var editProfileId;
async function editHandler(profileId) {
  try{
    const editBox = document.querySelector('#editBox')
    editBox.classList.remove('hidden')
    editProfileId = profileId
  }catch(error){
    console.error(error);
  }
}

async function SubmitEditHandler(event){
  event.preventDefault();

  const form = document.querySelector("#editform");

  const formdata = new FormData(form);

  const formObject = {};

  formdata.forEach((value, key) => {
    formObject[key] = value;
  });

  formObject._id = editProfileId

  try{
    await fetch(`http://127.0.0.1:4000/api/v1/updateProfile/${editProfileId}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    
    window.location.reload();
  }catch(error){
    console.error(error);
  }

  editProfileId = '';
}

