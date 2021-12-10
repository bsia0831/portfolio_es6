const sections = document.querySelectorAll("section");  
const lis = document.querySelectorAll("ul li"); 
const lis_arr = Array.from(lis); 
const len = sections.length; 
const speed = 500; 
let posArr =[]; 
const base = 0; 

setPos(); 

window.addEventListener("resize", ()=>{
   setPos(); 
   let activeItem = document.querySelector("ul li.on"); 
   let activeIndex = lis_arr.indexOf(activeItem); 
   
   //모션없이 해당위치로 바로 이동 .scroll(가로위치값,세로위치값)
   window.scroll(0, posArr[activeIndex]);
}); 
 

window.addEventListener("mousewheel", e=>{
   e.preventDefault(); 

   let activeItem = document.querySelector("ul li.on"); 
   let activeIndex = lis_arr.indexOf(activeItem); 
   let targetIndex; 

   //마우스휠을 올리면 (-100)
   if(e.deltaY < 0){
      if(activeIndex == 0) return; 
      targetIndex = activeIndex -1; 
   }else{
      if(activeIndex == len-1) return;
      //마우스휠을 내리면 (100)
      targetIndex = activeIndex +1; 
   }

   new Anim(window,{
      prop :"scroll", 
      value : posArr[targetIndex], 
      duration : speed
   })
},{passive : false})





//브라우저 스크롤시  
window.addEventListener("scroll", e=>{
   let scroll = window.scrollY || window.pageYOffset; 
    
   //섹션에 해당하는 버튼 활성화 
    sections.forEach((el, index)=>{
        if(scroll >= posArr[index] + base){
           lis.forEach((el, i)=>{
               el.classList.remove("on"); 
               sections[i].classList.remove("on"); 
           })          

           lis[index].classList.add("on"); 
           sections[index].classList.add("on"); 
        }
    })
}); 
 

lis.forEach((el,index)=>{
   //각 ul li버튼 클릭시 
   el.addEventListener("click", e=>{

      new Anim(window, {
         prop:"scroll", 
         value : posArr[index], 
         duration : 500
      })

      //버튼 활성화 
      for(let el of lis){
         el.classList.remove("on"); 
      }
      e.currentTarget.classList.add("on"); 
   })
});


function setPos(){
   posArr = []; 
   //section의 갯수만큼 반복을 돌면서 posArr에 세로위치값 저장 
   for(let el of sections){
      posArr.push(el.offsetTop); 
   }
   
}