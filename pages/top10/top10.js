let request = new XMLHttpRequest();
request.open('get', '../catalog/products.json', true);
request.send();
request.onload = function(){

if(this.readyState == 4 && this.status == 200){
    
      let products = JSON.parse(this.responseText);
      for(let item of products){
      var productdata=localStorage.getItem(item.title);
      if(productdata){
            var data=JSON.parse(productdata);
            item.averageGrade=data.averageGrade;
        }
        products.item=item;
      }

        products.sort((a, b) => b.averageGrade - a.averageGrade);
        var count=0;
      let output = "";
      for(let item of products){
        if(count<10){
         output += `
            <li class="product">
               <img src="../catalog/${item.image}" alt="${item.description}">
               <h2 id="title"><a href="../catalog/${item.page}">${item.title}</a></h1>
               <p class="description">${item.description}</p>
               <p class="date">
                  Date of creation: <p class="date">${item.date}</p>
               </p>
            </li>
         `;
        }
         count++;
      }
      document.querySelector("#products").innerHTML = output;
   }
}