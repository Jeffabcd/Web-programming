window.onload=function(){
    var members=document.getElementById("members");
    var plus_button=document.getElementById("plus_button");
    var detail=document.getElementById("detail");
    src_list=["DingDing.jpg","Dexi.jpg","Lala.jpg","Xiauboe.jpg","Sun.png",
              "pikachu1.jpg","pikachu2.jpg","pikachu3.jpg","pickachu4.jpg","pikachu5.jpg",
              "pikachu6.jpg","pikachu7.png","pickachu8.jpg","pickachu9.jpg","me.jpg"];
    name_list=["丁丁","迪西","拉拉","小波","太陽",
                "皮卡丘","皮卡丘","皮卡丘","皮卡丘","皮卡丘",
                "皮卡丘","皮卡丘","皮卡丘","皮卡丘","你"];
    member_list=[];
    member_num=15;
    display_list=[];
    display_num=0;
    mode="main";

    function move( element ,x1,y1,second){
        console.log(element);
        let id=null;
        let x=element.offsetLeft;
        console.log("pape");
        console.log(x);
        let y=element.offsetTop;
        let dx=(x1-x)/100;
        let dy=(y1-y)/100;
        let x0_vector=x1-x;
        let y0_vector=y1-y;
        
        clearInterval(id);
        id=setInterval(gogo,second);
        function gogo(){
            if((x1-x)*x0_vector<0){
                element.style.top=y1+"px";
                element.style.left=x1+"px";
                clearInterval(id);
            }else{
                x+=dx;
                y+=dy;
                element.style.top=y+"px";
                element.style.left=x+"px";
            }
        }
    }

    function create_member_element(index){
        var a=document.getElementById("member_1");
        var b=a.cloneNode(true);
        b.id="member"+(index+1);
        b.childNodes[5].src=src_list[index];
        b.childNodes[7].innerHTML=name_list[index];

       /* console.log("aaaaaaaaaaaa");
        for(let i=0 ;i<b.childNodes.length;i++){
            if(b.childNodes[i]!=null || this.container.childNodes[i]!=undefined){
                console.log(b.childNodes[i]);
                console.log(i);
            }
        }*/
        members.appendChild(b);
        var cb=new member(index,b.id);
        cb.container.style.display="none";
        return cb;
    }
    function show_display_list(){
        var text='';
        for(let i=0;i<display_list.length;i++){
            if(display_list[i]==1){
                text+=i+" ";
            }
        }
        console.log(text);
    }

    
    class member{
        constructor(index,ID){
            this.index=index;
            this.order=display_num;
            this.x=this.offsetLeft;
            this.y=this.offsetTop;
            member_list.push(this);
            this.container=document.getElementById(ID);
            this.cancel_button=this.container.childNodes[3];
           /* console.log(this.cancel_button);
            console.log(this.container.childNodes.length);
            for(let i=0 ;i<this.container.childNodes.length;i++){
                if(this.container.childNodes[i]!=null || this.container.childNodes[i]!=undefined){
                    console.log(this.container.childNodes[i]);
                    console.log(i);
                }
            }
            console.log(index);*/
            if(this.index!=14){
                this.cancel_button.addEventListener(
                    "click",
                    ()=>{
                        
                        if(mode=="main"){
                            if(display_num==14){
                                plus_button.style.opacity=1;
                                plus_button.style.cursor="pointer";
                            }
                        }
                        if(mode=="block"){
                            if(display_num==15){
                                plus_button.style.opacity=1;
                                plus_button.style.cursor="pointer";
                            }
                        }
                        
                        var c=this;
                   //     console.log(c);
                        this.container.style.display="none";
                        display_num--;
                        display_list[this.index]=0;
                        console.log("display_num: "+display_num);
                        show_display_list();
                        
                        layout();
               //         setTimeout(function(){this.contianer.style.display="block";},3000);

                        
                    }
                );
            }else{
                this.cancel_button.style.display="none";
            }

            this.mbutton=this.container.childNodes[9];
            this.mbutton.addEventListener(
                "click",
                ()=>{
                    var c=this;
                   
                    this.container.style.display="none";
                 //   console.log(c.parentNode);
                    display_num--;
                    display_list[this.index]=0;
                    console.log("display_num: "+display_num);
                    new_me.change_me(this.index);
                    layout();
                }
            );
          //  console.log("apple");
            this.container.style.display="none";
            
        }
        
        show(){

            this.container.style.display="block";
            display_num++;
            display_list[this.index]=1;
            console.log("display_num: "+display_num);
            layout();
        }

        
    }

    class main_member{
        constructor(index){
            this.index=index;
            this.container=document.getElementById("member_me");
    
            this.cancel_button=this.container.childNodes[3];
            this.cancel_button.addEventListener(
                "click",
                function(){
                    var c=this;
                    console.log(c);
                    c.parentNode.style.display="none";
                    mode="block";
                    layout();
                //    setTimeout(function(){c.parentNode.style.display="block";},3000);

                }
            );
            if(index==14)
            {
                this.cancel_button.style.display="none";
            }
            this.mbutton=this.container.childNodes[7];
            console.log(this.mbutton);
            this.mbutton.addEventListener(
                "click",
                ()=>{
                    this.container.style.display="none";
                    member_list[this.index].show();
                    mode="block";
                    console.log("display_num: "+display_num);
                    layout();
                }
            );
            /*
            for(let i=0;i<this.container.childNodes.length;i++){
                console.log(this.container.childNodes[i]);
                console.log(i);
            }*/
        }

        change_me(index){
            if(index==14){
                this.cancel_button.style.display="none";
            }else{
                this.cancel_button.style.display="block";
            }
            this.container.childNodes[5].src=src_list[index];
            var name=document.getElementById("myname");
            name.innerHTML=name_list[index];
            this.show();
            if(mode=="main"){
                member_list[this.index].show();
            }
            this.index=index;
            mode="main";
            layout();
        }


        show(){
            this.container.style.display="block";
        }
    }

    var new_me=new main_member(14);
    for(let i=0;i<5;i++){
        let id="member_"+(i+1);
        let a=document.getElementById(id);
        a.style.display="none";
    }
    for(let i=0;i<member_num;i++){
        display_list.push(0);
       let new_member= create_member_element(i);
          
    }
    var first_show=Math.floor(Math.random()*member_num);
    if(first_show==0)
        layout();
    for(let i=0;i<first_show;i++){
        member_list[i].show();
    }

    plus_button.addEventListener(
        "click",
        ()=>{
            if((mode=="main"&&display_num<14)||(mode=="block" && display_num<15)){
                plus_button.style.opacity=1;
                plus_button.style.cursor="pointer";
                var a=[];
                var b=14;
                if(mode=="main"){
                    b=new_me.index;
                }
                for(let i=0;i<member_num;i++){
                    if(display_list[i]==0 && i!=b){
                        a.push(i);
                    }
                }
                var result=a[Math.floor(Math.random()*(a.length))];
                member_list[result].show();
                if((mode=="main"&&display_num>=14)||(mode=="block" && display_num>=15)){
                    plus_button.style.opacity=0.3;
                    plus_button.style.cursor="not-allowed";
                }
            }
            
            
           
        }
    );
    setInterval(() => {
        let d=new Date();
        let text=d.getHours();
        if(text>18){
           // text-=12;
            detail.innerHTML="晚上 ";
        }else if(text<=18 && text>12){
            text="下午 "+(text-12);
        }else if(text<=12 && text>6){
            text="早上 "+text;
        }else{
            text="凌晨 "+text;
        }
           
        detail.innerHTML=
         d.getHours()+" : "+
        d.getMinutes()+
        " | Web-programming";
    }, 1000);
   /* for(let i=0;i<members.childNodes.length;i++)
    {
        console.log(members.childNodes[i]);
        console.log(i);
    }*/
 //   move(member_list[0],200,300,5);
    function layout(){
        var index_list=[];
        for(let i=0;i<display_list.length;i++){
            if(display_list[i]==1){
                index_list.push(i);
            }
        }
        console.log(mode);
        index_list.sort(function(a,b){return a-b});
        if(mode=="main"){
            members.style.width='30%';
            new_me.container.style.width="70%";
            for(let i=0;i<display_num;i++){
                member_list[index_list[i]].container.childNodes[5].style.width="70px";
                member_list[index_list[i]].container.childNodes[5].style.height="70px";
                member_list[index_list[i]].container.childNodes[7].style.left="9%";
                member_list[index_list[i]].container.style.borderRadius="8%";
            }
            switch(display_num){
                case 14:
                    members.style.width='40%';
                    new_me.container.style.width="60%";
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="22%";
                        member_list[index_list[i]].container.style.height="22%";
                        member_list[index_list[i]].container.style.borderRadius="4%";
                        if(i>=12){
                            member_list[index_list[i]].container.style.width="35%";
                        }
                    }
                    break;
                case 13:
                    members.style.width='40%';
                    new_me.container.style.width="60%";
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="22%";
                        member_list[index_list[i]].container.style.height="22%";
                        member_list[index_list[i]].container.style.borderRadius="4%";
                        if(i>=12){
                            member_list[index_list[i]].container.style.width="40%";
                        }
                    }
                    break;
                case 12:
                    members.style.width='40%';
                    new_me.container.style.width="60%";
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="30%";
                        member_list[index_list[i]].container.style.height="22%";
                        member_list[index_list[i]].container.style.borderRadius="4%";
                    }
                    break;
                case 11:
                    members.style.width='40%';
                    new_me.container.style.width="60%";
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="30%";
                        member_list[index_list[i]].container.style.height="22%";
                        member_list[index_list[i]].container.style.borderRadius="4%";
                        if(i>=9){
                            member_list[index_list[i]].container.style.width="40%";
                        }
                    }
                    break;
                case 10:
                    members.style.width='40%';
                    new_me.container.style.width="60%";
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="30%";
                        member_list[index_list[i]].container.style.height="22%";
                        member_list[index_list[i]].container.style.borderRadius="4%";
                        if(i>=9){
                            member_list[index_list[i]].container.style.width="50%";
                        }
                    }
                    break;
                case 9:
                    members.style.width='40%';
                    new_me.container.style.width="60%";
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="30%";
                        member_list[index_list[i]].container.style.height="30%";
                        member_list[index_list[i]].container.style.borderRadius="4%";
                    }
                    break;
                case 8:
                    members.style.width='40%';
                    new_me.container.style.width="60%";
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="30%";
                        member_list[index_list[i]].container.style.height="30%";
                        member_list[index_list[i]].container.style.borderRadius="4%";
                        if(i>=6){
                            member_list[index_list[i]].container.style.width="40%";
                        }
                    }
                    break;
                case 7:
                    members.style.width='40%';
                    new_me.container.style.width="60%";
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="30%";
                        member_list[index_list[i]].container.style.height="30%";
                        member_list[index_list[i]].container.style.borderRadius="4%";
                        if(i>=3){
                            member_list[index_list[i]].container.style.width="40%";
                        }
                    }
                    break;
                case 6:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="47%";
                        member_list[index_list[i]].container.style.height="30%";
                    }
                    break;
                case 5:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="47%";
                        member_list[index_list[i]].container.style.height="30%";
                    }
                    member_list[index_list[display_num-1]].container.style.width="60%";
                    break;
                case 4:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="47%";
                        member_list[index_list[i]].container.style.height="40%";
                    }
                    break;
                case 3:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.childNodes[5].style.width="80px";
                        member_list[index_list[i]].container.childNodes[5].style.height="80px";
                        member_list[index_list[i]].container.style.width="47%";
                        member_list[index_list[i]].container.style.height="45%";
                        if(i==display_num-1)
                            member_list[index_list[i]].container.style.width="70%";
                    }
                    break;
                case 2:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.childNodes[5].style.width="80px";
                        member_list[index_list[i]].container.childNodes[5].style.height="80px";
                        member_list[index_list[i]].container.style.width="70%";
                        member_list[index_list[i]].container.style.height="45%";
                    }
                    break;
                case 1:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.childNodes[5].style.width="90px";
                        member_list[index_list[i]].container.childNodes[5].style.height="90px";
                        member_list[index_list[i]].container.style.width="80%";
                        member_list[index_list[i]].container.style.height="90%";
                    }
                    break;
                case 0:
                    members.style.width='0%';
                    new_me.container.style.width="100%";
                    
    

            }
        }else{
            members.style.width='100%';
            new_me.container.style.width="0%";
            for(let i=0;i<display_num;i++){
                member_list[index_list[i]].container.childNodes[5].style.width="100px";
                member_list[index_list[i]].container.childNodes[5].style.height="100px";
                member_list[index_list[i]].container.childNodes[7].style.left="3%";
                member_list[index_list[i]].container.style.borderRadius="4%";
            }
            switch(display_num){
                case 15:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="19%";
                        member_list[index_list[i]].container.style.height="31%";
                    }
                    break;
                case 14:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="19%";
                        member_list[index_list[i]].container.style.height="31%";
                        if(i>=10){
                            member_list[index_list[i]].container.style.width="22%";
                        }
                    }
                    break;
                case 13:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="19%";
                        member_list[index_list[i]].container.style.height="31%";
                        if(i>=10){
                            member_list[index_list[i]].container.style.width="30%";
                        }
                    }
                    break;
                case 12:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="24%";
                        member_list[index_list[i]].container.style.height="31%";
                    }
                    break;
                case 11:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="24%";
                        member_list[index_list[i]].container.style.height="31%";
                        if(i>=8){
                            member_list[index_list[i]].container.style.width="30%";
                        }
                    }
                    break;
                case 10:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="24%";
                        member_list[index_list[i]].container.style.height="31%";
                        if(i>=4){
                            member_list[index_list[i]].container.style.width="30%";
                        }
                    }
                    break;
                case 9:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="32%";
                        member_list[index_list[i]].container.style.height="31%";
                    }
                    break;
                case 8:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="24%";
                        member_list[index_list[i]].container.style.height="40%";
                    }
                    break;
                case 7:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="24%";
                        member_list[index_list[i]].container.style.height="40%";
                        if(i>=4){
                            member_list[index_list[i]].container.style.width="30%";
                        }
                    }
                    break;
                case 6:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="32%";
                        member_list[index_list[i]].container.style.height="40%";
                    }
                    break;
                case 5:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="32%";
                        member_list[index_list[i]].container.style.height="40%";
                        if(i==display_num-1 || i==display_num-2){
                            member_list[index_list[i]].container.style.width="47%";
                        }
                    }
                    break;
                case 4:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="48%";
                        member_list[index_list[i]].container.style.height="42%";
                    }
                    break;
                case 3:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="47%";
                        member_list[index_list[i]].container.style.height="45%";
                        if(i==display_num-1)
                            member_list[index_list[i]].container.style.width="60%";
                    }
                    break;
                case 2:
                    for(let i=0;i<display_num;i++){
                        member_list[index_list[i]].container.style.width="85%";
                        member_list[index_list[i]].container.style.height="50%";
                    }
                    break;
                case 1:
                    member_list[index_list[0]].container.style.display="none";
                    display_num--;
                    display_list[index_list[0]]=0;
                    new_me.change_me(index_list[0]);
                    layout();
                

            }

        }
    }

}