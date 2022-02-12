const user = "http://localhost:3000/user";

//store the reference
const submitBtn = document.getElementById("submitBtn");
const pageContent1 = document.querySelector(".Rp-1");
const pageContent2 = document.querySelector(".Rp-2");

//hide page 2 content
pageContent2.classList.add("d-none");

//Display error while filling the form
const setError = (id, message) => {
  element = document.getElementById(id);
  element.innerHTML = message;
};

//validation function check the form validation i.e input field after that it check for duplicate value and if pass all conditions then store the new data in database
function validateForm(e) {
  e.preventDefault();
  console.log("validation input field firred");

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
  if (email.length == 0) {
    setError("emailErr", "Please fill the value");
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

  /* Now Check for duplicate email and if not update value in database*/
  if (validateForm) {
    console.log("check dupliacte email field firred");
    axios
      .get(user)
      .then((response) => {
        return response.data;
      })
      .then((data) => data.some((val) => val.id == email))
      .then((dupliacte) => {
        if (!dupliacte) {
          console.log("Your email id is not duplicate");
          alert("Are you sure, you want to sumbit");

          //display page 2
          // pageContent1.classList.add('d-none');
          // pageContent2.classList.remove('d-none');
          axios
            .post(user, {
              id: email,
              name: userName,
              mobile: mobile,
              city: city,
              state: state,
              zipcode: zipcode,
              password: password,
            })
            .then((response) => {
              alert("Your Data has been successfully saved");
              // console.log("After successfull post", response);
            })
            .catch((error) => {
              console.log("Error while post", error);
            });
        } else {
          alert("Email id already in use");
        }
      })
      .catch((err) => console.log(err));
  }
  /* End of Check for duplicate email and update value in database*/
}

//call validation function when click on the submit button
submitBtn.addEventListener("click", validateForm);
