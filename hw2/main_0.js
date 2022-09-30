window.onload=function(){

    var imagesurl=[ "./images/pikachu.jpeg" ,"./images/psyduck.png","./images/squirtle.png"];
    var imageindex=0;
    var previousButton=document.getElementById('previous');
    var nextButton=document.getElementById("next");
    var mainimage=document.getElementById("display");

/*
    previousButton.onclick=changeimage(1);
    nextButton.onclick=changeimage(1);
*/
    previousButton.addEventListener(
        "click",
        function() {
            if(imageindex===0)
                return;
            console.log(111);
            imageindex-=1;
            console.log(imageindex);
            mainimage.src=imagesurl[imageindex];
            setcss();
        }
    );
    nextButton.addEventListener(
        "click",
        function() {
            if(imageindex===imagesurl.length-1)
                return;
            console.log(111);
            imageindex+=1;
            console.log(imageindex);
            mainimage.src=imagesurl[imageindex];
            setcss();
        }
    );

    function setcss(){
        previousButton.classList.remove("disabled");
        nextButton.classList.remove("disabled");
        if(imageindex<=0)
        {
            previousButton.classList.add("disabled");
        }
        if(imageindex>=(imagesurl.length-1))
        {
            nextButton.classList.add("disabled");
        }
    }


}