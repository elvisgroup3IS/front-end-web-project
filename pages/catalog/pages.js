const title=document.title
let request = new XMLHttpRequest();
request.open('get', 'products.json', true);
request.send();
request.onload = function(){
    // проверяваме заявката дали е изпълнена
   if(this.readyState == 4 && this.status == 200){
      let products = JSON.parse(this.responseText);
      let output = "";
      for(var item of products){
        if(item.title==title)
         {
            output = `
            <div class="product">
                <section id="productSection">
                    <img id="img" src="${item.image}" alt="${item.description}">
                    <div id="information">
                     <artical>
                        <h2 id="title">${item.title}</h2>
                        <p class="description">${item.description}</p>
                        <div id=posts>
                            <p id="postGrade"></p>
                            <p class="date">   Date of creation:${item.date}</p>
                        </div>
                     </artical>
                     </div>
                </section>
                        <form id="comentForm">
                            <div class="input-control">
                                <div class="textarea">
                                    <textarea cols="30" id="comment" placeholder="Describe your experience.."></textarea>
                                    <div class="error"></div>
                                </div>
                            </div>
                            
                        <section>
    
                                <select id="grade">
                                    <option value="0">grade</option>
                                    <option value="6">6 &#128525;</option>
                                    <option value="5">5 &#128527;</option>
                                    <option value="4">4 &#128528;</option>
                                    <option value="3">3 &#128529;</option>
                                    <option value="2">2 &#128533;</option>
                                    <option value="1">1 &#128534;</option>
                                </select>
                        </section>
                            <div class="btn">
                                <button type="submit">Post comment</button>
                            </div>
                        </form>
               </p>
            </div>
         `;}
      }
      document.querySelector("#product").innerHTML = output;
   }
}

var script = document.createElement('script');
script.src = "./scriptt.js";
script.async = true;
document.head.appendChild(script);