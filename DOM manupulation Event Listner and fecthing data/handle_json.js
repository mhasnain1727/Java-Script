fetch("db.json")
  .then(response => response.json())
  .then(val => {
      var data= val.data;
      for(i in data){ 
          console.log();
          document.getElementById("tbody").innerHTML +=
          `<tr id="${parseInt(i)}"">
          <td class="border border-dark border-2">
          <button class="btn btn-danger btn-sm" type="button" onclick="changeColor(this)" > </button>
          </td>
          <td class="border border-dark border-2">${data[i].id}</td>
          <td class="border border-dark border-2">${data[i].name}</td>
          <td class="border border-dark border-2">${data[i].age}</td>
          <td class="border border-dark border-2">${data[i].course}</td>
          <td class="border border-dark border-2">${data[i].tech}</td>
          <td class="border border-dark border-2">
          <button class="btn btn-danger" type="button" onclick="delRow(this)">  Delete </button>
          </td>
        </tr>`
      }
    })
  .catch(err => console.error(err));
  



function delRow(n){
  var i = n.parentNode.parentNode.rowIndex;
  console.log(i);
  document.getElementById('tbody').deleteRow(i-1);
}



function changeColor(n) {
  var i = n.parentNode.parentNode.rowIndex;
  console.log(i);
  document.getElementById(i-1).style.backgroundColor = '#EAB9AE';
}  

