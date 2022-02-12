const admin = "http://localhost:3000/admin";
const user = "http://localhost:3000/user";

//getting details for page sections
const pageContent1 = document.querySelector(".p-1");
const pageContent2 = document.querySelector(".p-2");
const pageContent3 = document.querySelector(".p-3");

//initially hide pageContent2 and pageContent3
pageContent2.classList.add("d-none");
pageContent3.classList.add("d-none");

//getting reference for admin login
const adminId = document.getElementById("exampleInputEmail2");
const adminPassword = document.getElementById("exampleInputPassword2");
const adminLoginbtn = document.getElementById("btnSubmit2");

//function to check credentials and if true then display the employee detail table
const checkcredentialsForAdmin = () => {
  if (adminId.value == "" || adminPassword.value == "") {
    alert("Please fill the credentials");
  } else {
    axios
      .get(admin)
      .then((response) => {
        // console.log(response);
        let data = response.data;
        return data.some(
          (element) =>
            element.id == adminId.value && element.pass == adminPassword.value
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
                document.getElementById("table_row").innerHTML += `<tr>
        <th scope="row">${parseInt(value)+1}</th>
        <td>${key.name}</td>
        <td>${key.id}</td>
        <td>${key.mobile}</td>
        <td>${key.city}</td>
        <td>${key.state}</td>
        <td>${key.zipcode}</td>
        <td>${key.password}</td>
    </tr>`;
              });
            });

          pageContent1.classList.add("d-none");
          pageContent2.classList.remove("d-none");
        } else {
          alert("Invalid Credentials");
        }
      });
  }
};

adminLoginbtn.addEventListener("click", checkcredentialsForAdmin);


//for editing the data

       