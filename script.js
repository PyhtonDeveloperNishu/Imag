let search = document.querySelector(".search_bar");
let btn = document.querySelector(".search-btn");

const accessKey = "CJFnFdF4tiklL4Ae5SxB8cNM4tdBLP9MZwN0K9jOUHE";
// const Api_URL = "https://api.unsplash.com/search/photos?page=1&query="

btn.addEventListener("click",searchImage);


 async function searchImage(e){
    let fragment = document.createDocumentFragment();
    
    e.preventDefault();

    let query = search.value;
   try{
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}`);
      if(!res.ok){
        throw new Error("Failed to fetch image")
      }
      const imageData = await res.json();
      console.log(imageData);

      let imgCon = document.createElement("div");
      imgCon.classList.add("img-con");


      let imgURL = document.createElement("img");
      imgURL.src=imageData.results.urls.small;
      imgURL.classList.add("img-URL")
      
      let des = document.createElement("p");
      des.innerText = imageData.results.alt_description;

      imgCon.append(imgURL,des);
      fragment.append(imgCon);
      document.body.append(fragment);
  
   }catch(err){
       console.log("Error featching Image")
   }

};

    
