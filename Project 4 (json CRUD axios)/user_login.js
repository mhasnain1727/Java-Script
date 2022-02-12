// const user = "http://localhost:3000/user";

//getting details for page sections
// const pageContent1 = document.querySelector(".p-1");
// const pageContent2 = document.querySelector(".p-2");
// const pageContent3 = document.querySelector(".p-3");
const pageContent2_inputFieldEdit = document.getElementById("editID");
const pageContent2_inputFieldDelete = document.getElementById("deleteData");

//initially hide pageContent2 and pageContent3
// pageContent2.classList.add("d-none");
// pageContent3.classList.add("d-none");

//getting details for user login
const userId = document.getElementById("exampleInputEmail1");
const userPassword = document.getElementById("exampleInputPassword1");
const userLoginbtn = document.getElementById("btnSubmit1");
const editDataBtn = document.getElementById("editBtn");
const editformSubmitBtn = document.getElementById("submitBtnEditedForm");
const deleteDataBtn = document.getElementById("deleteBtn")


//function to check credentials and if true then display the employee detail table
var indexValue;
async function checkcredentialsForUser() {
  if (userId.value == "" || userPassword.value == "") {
    alert("Please fill the credentials");
  } else {
    await axios
      .get(user)
      .then((response) => {
        // console.log(response);
        let data = response.data;
        return data.some(
          (element) =>
            element.id == userId.value && element.password == userPassword.value
        );
      })
      .then((credential) => {
        if (credential) {
          /* get data */
          axios
            .get(user)
            .then((response) => response.data)
            .then((data) => {
              data.forEach((key, value) => {
                if (key.id == userId.value) {
                  document.getElementById(
                    "welcomenote"
                  ).innerHTML = `Welcome ${key.name}`;
                  document.getElementById("table_row").innerHTML = `<tr>
                <th scope="row">${parseInt(value) + 1}</th>
                <td>${key.name}</td>
                <td>${key.id}</td>
                <td>${key.mobile}</td>
                <td>${key.city}</td>
                <td>${key.state}</td>
                <td>${key.zipcode}</td>
                <td>${key.password}</td>
            </tr>`;

                  indexValue = value;
                  //   editData(value);
                }
              });
            });
          pageContent1.classList.add("d-none");
          pageContent2.classList.remove("d-none");
          pageContent2_inputFieldEdit.classList.add("d-none");
          pageContent2_inputFieldDelete.classList.add('d-none');
        } else {
          alert("Invalid Credentials");
        }
      });
  }
}

userLoginbtn.addEventListener("click", checkcredentialsForUser);

//for editing the value of details
editDataBtn.addEventListener("click", editData);

function editData() {
  console.log(indexValue);
  pageContent2.classList.toggle("d-none");
  pageContent3.classList.toggle("d-none");
  axios
    .get(user)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      return data[indexValue];
    })
    .then((data) => {
      document.forms["myForm"]["name"].value = data.name;
      document.forms["myForm"]["email"].value = data.id;
      document.forms["myForm"]["password"].value = data.password;
      document.forms["myForm"]["mobile"].value = data.mobile;
      document.forms["myForm"]["city"].value = data.city;
      document.forms["myForm"]["state"].value = data.state;
      document.forms["myForm"]["zipcode"].value = data.zipcode;
    })
    .catch((error) => {
      console.log(error);
    });
}

//after editing the form
editformSubmitBtn.addEventListener("click", submitEditedForm);

//Display error while filling the form
const setError = (id, message) => {
  element = document.getElementById(id);
  element.innerHTML = message;
};

function submitEditedForm(e) {
  e.preventDefault();
  /*check for form input field validation */
  var validateForm = true;
  var userName = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;
  var password = document.forms["myForm"]["password"].value;
  var mobile = document.forms["myForm"]["mobile"].value;
  var city = document.forms["myForm"]["city"].value;
  var state = document.forms["myForm"]["state"].value;
  var zipcode = document.forms["myForm"]["zipcode"].value;

  if (userName.length == 0) {
    setError("nameErr", "Please fill the value");
    validateForm = false;
  }
  if (email != userId.value) {
    setError("emailErr", "*(Non editable) Email id must be same");
    console.log("*(Non editable) Email id must be same");
    validateForm = false;
  }

  if (mobile.length != 10) {
    setError("mobileErr", "Must be of 10 digit");
    validateForm = false;
  }
  if (password.length == 0) {
    setError("passwordErr", "Please fill the value");
    validateForm = false;
  }
  if (city.length == 0) {
    setError("cityErr", "Please fill the value");
    validateForm = false;
  }
  if (state == "Choose...") {
    setError("stateErr", "Please choose state");
    validateForm = false;
  }
  if (zipcode.length == 0) {
    setError("zipcodeErr", "Please fill the value");
    validateForm = false;
  }
  /* End of form input validation */

  if (validateForm) {
    alert("Are you sure you want to update");
    console.log("redy to update");
    axios
      .put(`http://localhost:3000/user/${userId.value}`, {
        id: email,
        name: userName,
        mobile: mobile,
        city: city,
        state: state,
        zipcode: zipcode,
        password: password,
      })
      .then((response) => {
        alert("Data updated successfully!. Please login again");
      })
      .catch((error) => console.log(error));
  }
}


//for editing data by admin user
deleteDataBtn.addEventListener("click", deleteData);

function deleteData(){
    alert("Are you sure you want to delete");
    axios.delete(`http://localhost:3000/user/${userId.value}`);
    alert("Data deleted successfully");
}