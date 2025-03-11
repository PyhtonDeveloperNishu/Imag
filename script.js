let search = document.querySelector(".search_bar");
let btn = document.querySelector(".search-btn");
let form = document.getElementsByTagName("form");
let fragment = document.createDocumentFragment();
const accessKey = "CJFnFdF4tiklL4Ae5SxB8cNM4tdBLP9MZwN0K9jOUHE";
search.focus();
// function to print image in on ui and fetch data
btn.addEventListener("click",searchImage);

async function searchImage(e){
    fragment.innerHTML="";
    e.preventDefault();
    
    let query = search.value.trim();
    search.value="";
    if(!query){
        alert("Please enter a serch term");
        return;
    }
     // create fragment
    let DisplayImgCon = document.createElement("div"); // image container
    DisplayImgCon.classList.add("img-con");
    
   try{
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}`);
      if(!res.ok){
        throw new Error("Failed to fetch image")
      }
      
      const imageData = await res.json();
      console.log(imageData.results);
      
      if(imageData.results.length===0){
        DisplayImgCon.innerHTML="<p>No images found. Try a different search./p>"
      }else{
        
        imageData.results.forEach(data=>{
            let imageCon = document.createElement("div");
            let imgURL = document.createElement("img");
            let des = document.createElement("p");
           
            imageCon.classList.add("image-con")
            imgURL.classList.add("img-URL");
            des.classList.add("pera");

            imgURL.src=data.urls.small;  
            des.innerText = data.alt_description || "No description available";
            imageCon.append(imgURL,des); 
            DisplayImgCon.append(imageCon);  
        })
        
        fragment.append(DisplayImgCon);
        document.body.insertBefore(fragment,form.nextSibling);
      }


  
   }catch(error){
       console.error("Error featching Image",error);
   }

};

    
