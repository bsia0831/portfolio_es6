// //step2 빈배열을 만들어 push로 myScroll 클래스를 가진 요소의 offset().top값을 저장 
// let posArr = []; //myScroll 클래스를 가진 
// const $boxs = $(".myScroll");
// const $btns = $("#navi li");
// const $bg = $("#brand");
// let len = $btns.length; //4 
// let baseLine = -200;

// /*
// baseLine : 
// 해당영역이 브라우저 끝에 닿지 않아도 네비버튼 활성화, 영역 활성화되도록 값을 빼줌   
// */


// //posArr에 myScroll 클래스를 가진 요소의 offset().top값을 저장 
// for (let i = 0; i < len; i++) {
//     posArr.push($boxs.eq(i).offset().top);
// }

// //브라우저 리사이즈 시 다시 세로위치값 갱신 
// $(window).on("resize", function () {
//     //일단 배열을 비워서 배열값이 4개만 담기도록 
//     posArr = [];
//     for (let i = 0; i < len; i++) {
//         posArr.push($boxs.eq(i).offset().top);
//     }
//     // console.log(posArr); 
// });


// //브라우저에서 스크롤 시 
// $(window).on("scroll", function () {

//     //스크롤바 위치를 변수에 저장 
//     let scroll = $(this).scrollTop();

//     //step2 반복문으로 해당 영역에 스크롤바 위치할 때 해당 네비버튼 활성화 처리  
//     for (let i = 0; i < len; i++) {
//         if (scroll >= posArr[i] + baseLine) {
//             $btns.children("a").removeClass("on");
//             $btns.eq(i).children("a").addClass("on");

//             //모든 박스에 on을 제거하여 비활성화 
//             $boxs.removeClass("on");
//             //해당 영역 박스만 활성화 
//             $boxs.eq(i).addClass("on");


//         }
//     }

// })


class MyScroll {
    constructor(option) {
        this.init(option);
        this.bindingEvent();
    }

    init(option) {
        this.boxs = $(option.panel);
        this.btns = $(option.btns);
        this.posArr;
        this.enableEvt = true;
        this.base = option.base;
    }

    bindingEvent() {
        //처음 로딩시 세로위치값 배열에 저장  
        this.setPos();
        //브라우저 리사이즈시 세로위치값 새로 저장 
        $(window).on("resize", () => {
            this.setPos();
            //let activeIndex = $("#navi li a.on").parent().index(); 
            let activeIndex = this.btns.children("a").filter(".on").parent().index();
            this.moveScroll(activeIndex);
        });

        // //마우스휠 이벤트 
        // this.boxs.on("mousewheel", e => {
        //     e.preventDefault();

        //     if (this.enableEvt) {
        //         this.enableEvt = false;
        //         let i = $(e.currentTarget).index();

        //         if (e.originalEvent.deltaY > 0) {
        //             this.moveScroll(i + 1);
        //         } else {
        //             this.moveScroll(i - 1);
        //         }
        //     }
        // });

        //네비 버튼 클릭시 해당 섹션의 세로 위치값으로 이동 
        this.btns.on("click", e => {
            e.preventDefault();

            let isOn = $(e.currentTarget).children("a").hasClass("on");
            if (isOn) return;

            if (this.enableEvt) {
                this.enableEvt = false;
                var i = $(e.currentTarget).index();
                this.moveScroll(i);
            }
        });

        //브라우저 스크롤시 스크롤 위치값에 따라서 버튼 활성화 
        $(window).on("scroll", () => {
            let scroll = $(window).scrollTop();
            this.activation(scroll);
            console.log(this);
        });
    }



    activation(scroll) {
        //스크롤값과 posArr의 값을 비교하여 버튼 활성화 
        this.boxs.each(index => {
            if (scroll >= this.posArr[index] + this.base) {
                this.btns.children("a").removeClass("on");
                this.btns.eq(index).children("a").addClass("on");

                this.boxs.removeClass("on");
                this.boxs.eq(index).addClass("on");
            }
        })
    }

    moveScroll(index) {
        $("html,body").stop().animate({
            scrollTop: this.posArr[index]
        }, 1000, () => {
            this.enableEvt = true;
        });
    }

    //posArr 배열에 섹션 세로 위치값 배열에 저장 
    setPos() {
        this.posArr = [];
        this.boxs.each(index => {
            this.posArr.push(this.boxs.eq(index).offset().top);
        });
    }
}