browser.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    var url = tabs[0].url;
    
    if(url.includes('about:')){
        if(url.length>40){
            url = url.substring(0,35)
            url+='...'   
        }
        document.getElementById("text").innerText=url;
        document.getElementById("loader-line").style.display="none";
        return;
    }
        
    const apiUrl = "https://pescatore-381503.el.r.appspot.com/verify?url="+url;
    fetch(apiUrl)
        .then(response => {
            // Check if the response status is OK
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the response JSON data
            return response.json();
        })
            .then(data => {
            // Do something with the data
            console.log(data.result);
            if(data.result==="safe"){
                document.getElementById("loader-line").style.display="none";
                document.getElementById("message").textContent="Status : Safe";
                document.getElementById("location").textContent="Locaton : "+data.country;
                document.getElementById("registrar").textContent="Registrar : "+data.registrar;
                document.getElementById("message").style.color="#a2fea7";
            }
            else{
                document.getElementById("loader-line").style.display="none";
                document.getElementById("message").textContent="Status : Unsafe";
                document.getElementById("location").textContent="Locaton : "+data.country;
                document.getElementById("registrar").textContent="Registrar : "+data.registrar;
                document.getElementById("message").style.color="red";
            }
            })
                .catch(error => {
                // Handle any errors that occur during the fetch request
                console.error(error);
                });
    if(url.length>40){
        url = url.substring(0,40)
        url+='...'
    }
    document.getElementById("text").innerText=url
    // use `url` here inside the callback because it's asynchronous!
});

