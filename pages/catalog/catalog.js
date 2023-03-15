let request = new XMLHttpRequest();
request.open('get', 'products.json', true);
request.send();
request.onload = function(){

if(this.readyState == 4 && this.status == 200){
      let products = JSON.parse(this.responseText);
        products.sort(compare);
      let output = "";
      for(let item of products){
         output += `
            <li class="product">
               <img src="${item.image}" alt="${item.description}">
               <h2 id="title"><a href="${item.page}">${item.title}</a></h2>
               <p class="description">${item.description}</p>
               <p class="date">
                  <p class="date">Date of creation: ${item.date}</p>
               </p>
            </li>
         `;
      }
      document.querySelector("#products").innerHTML = output;
   }
}

function compare (a, b) {
    partsA = a.date.split(".");
    partsB = b.date.split(".");
    if (partsA[2] > partsB[2]) {
        return -1;
    } else if (partsA[2] < partsB[2]) {
        return 1;
    } else {
        if (partsA[1] > partsB[1]) {
            return -1;
        } else if (partsA[1] < partsB[1]) {
            return 1;
        } else {
            if (partsA[0] > partsB[0]) {
                return -1;
            } else if (partsA[0] < partsB[0]) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}
