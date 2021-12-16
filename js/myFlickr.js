//로딩시
getList({
    type: "userid",
    user_id: "82828410@N02"
});


//검색창에 검색어 입력후 클릭시 
$("#searchBox button").on("click", function () {

    $("#gallery ul").removeClass("on");
    $(".loading").removeClass("off");
    var inputs = $("#searchBox input").val();
    $("#searchBox input").val("");

    getList({
        type: "search",
        tag: inputs
    });
});

//검색어 입력후 enter 이벤트
$(window).on("keypress", function (e) {
    if (e.keyCode == 13) {

        $("#gallery ul").removeClass("on");
        $(".loading").removeClass("off");
        var inputs = $("#searchBox input").val();
        $("#searchBox input").val("");

        getList({
            type: "search",
            tag: inputs
        });
    }
})

//제목 클릭시 다시 초기 상태로
$(".content h1").on("click", function () {
    $("#gallery ul").removeClass("on");
    $(".loading").removeClass("off");

    getList({
        type: "userid",
        user_id: "82828410@N02"
    })
})

//리스트 클릭시 팝업생성
$("body").on("click", "#gallery ul li", function (e) {
    e.preventDefault();
    let imgSrc = $(this).find("a").attr("href");

    $("body").append(
        $("<div class='pop'>")
        .append(
            $("<img>").attr({
                src: imgSrc
            }),
            $("<span>").text("close")
        )
    )
});

//닫기버튼 클릭시 팝업제거
$("body").on("click", ".pop span", function () {
    $(".pop").remove();
});


function getList(opt) {
    var result_opt = {};

    if (opt.type == "interest") {
        result_opt = {
            url: "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList",
            dataType: "json",
            data: {
                api_key: "d61e30a1010fe3e1dab106d3a2df0f21",
                per_page: 9,
                format: "json",
                nojsoncallback: 1,
                privacy_filter: 1
            }
        }
    }

    if (opt.type == "search") {
        result_opt = {
            url: "https://www.flickr.com/services/rest/?method=flickr.photos.search",
            dataType: "json",
            data: {
                api_key: "d61e30a1010fe3e1dab106d3a2df0f21",
                per_page: 9,
                format: "json",
                nojsoncallback: 1,
                privacy_filter: 1,
                tags: opt.tag
            }
        }
    }

    if (opt.type == "userid") {
        result_opt = {
            url: "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos",
            dataType: "json",
            data: {
                api_key: "d61e30a1010fe3e1dab106d3a2df0f21",
                per_page: 9,
                format: "json",
                nojsoncallback: 1,
                privacy_filter: 1,
                user_id: opt.user_id
            }
        }
    }
    $.ajax(result_opt)
        .success(function (data) {
            let items = data.photos.photo;

            $("#gallery").empty();
            $("#gallery").append("<ul>");

            $(items).each(function (index, data) {
                let text = data.title;
                if (!data.title) {
                    text = "No description in this photo";
                }

                //데이터의 갯수만큼 반복을 돌며 li의 동적요소 생성
                $("#gallery ul")
                    .append(
                        $("<li>")
                        .append(
                            $("<div>").append(
                                $("<a>").attr({
                                    href: "https://live.staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_b.jpg"
                                })
                                .append(
                                    $("<img class='thumb'>").attr({
                                        src: "https://live.staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_m.jpg"
                                    })
                                ),
                                $("<hr>"),
                                $("<p>").text("Lorem, ipsum dolor."),
                                $("<h3>").text(text),

                                $("<div class='profile'>")
                                .append(
                                    $("<span>").text(data.owner),
                                ),

                                $("<div class='location'>")
                                .append(
                                    $("<span>").text("Canada"),
                                )

                            )
                        )
                    ) //gallery append ends       
            });

            //모든 li가 완성되고 img 요소 생성후 
            //모든 소스이미지까지 로딩완료되면 isotope레이아웃 적용
            const total = $("#gallery ul li").length;
            let imgNum = 0;

            $("#gallery img").each(function (index, data) {
                data.onerror = function () {
                    $(data).attr("src", "img/default.jpg");
                }

                data.onload = function () {
                    imgNum++;

                    if (imgNum === total) {
                        $(".loading").addClass("off");

                        new Isotope("#gallery ul", {
                            itemSelector: "#gallery ul li",
                            columnWidth: "#galley ul li",
                            transitionDuration: "0.5s"
                        });

                        $("#gallery ul").addClass("on");
                    }
                }
            });
        })
        .error(function (err) {
            console.err("데이터를 호출하는데 실패했습니다");
        });
}


/*
39d6e86ec62077747de49698953a05a8

https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

flickr.interestingness.getList
*/
const main = document.querySelector("main");
const frame = document.querySelector("#list");
const input = document.querySelector("#search");
const btn = document.querySelector(".btnSearch");
const loading = document.querySelector(".loading");
const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const key = "39d6e86ec62077747de49698953a05a8";
const per_page = 20;
const format = "json";


//interestingness 메소드 
const url1 = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;




//페이지 로딩후 interestingness 메서드 호출 
callData(url1);

btn.addEventListener("click", e => {
    let tag = input.value;
    if (tag == "") return;
    //search 메서드 
    const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

    callData(url);
});


input.addEventListener("keypress", e => {
    if (e.key = "Enter") {
        let tag = input.value;

        if (tag == "") return;
        const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

        callData(url);
    }
})

//동적 팝업 생성 
frame.addEventListener("click", e => {
    e.preventDefault();

    if (e.target !== e.target.closest(".item").querySelector(".thumb")) return;
    let target = e.target.closest(".item");
    let imgSrc = target.querySelector("a").getAttribute("href");

    let pop = document.createElement("aside");
    let pops = `
            <img src="${imgSrc}">
            <span class="close">CLOSE</span>
`;
    pop.innerHTML = pops;
    document.querySelector("main").append(pop);
});


//팝업닫기 버튼 클릭 이벤트 위임 
main.addEventListener("click", e => {
    let target = e.target.closest("aside");

    if (target !== null) {
        let close = target.querySelector(".close");
        if (e.target == close) target.remove();
    }

})





function callData(url) {
    frame.innerHTML = "";
    loading.classList.remove("off");
    frame.classList.remove("on");

    fetch(url)
        .then(data => {
            let result = data.json();
            return result;
        })
        .then(json => {
            let items = json.photos.photo;
            createList(items);
            delayLoading();
        })
}

function createList(items) {
    let htmls = "";

    //배열의 갯수만큼 반복
    items.map(data => {
        console.log(data);

        let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;

        htmls += `
            <li class="item">
                <div>
                    <a href="${imgSrcBig}">
                        <img class="thumb" src="${imgSrc}" alt="">
                    </a>
                    <p>${data.title}</p>
                    <span>
                        <img class="profile" src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg"> 
                        <strong>${data.owner}</strong>
                    </span>
                </div>
            </li>
      `;
    });

    //http://www.flickr.com/buddyicons/${data.owner}.jpg

    frame.innerHTML = htmls;
}

function delayLoading() {
    //동적으로 생성된 이미지의 전체 갯수를 구함 
    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;
    let count = 0;

    //이미지 갯수만큼 반복을 돌명서 
    for (let el of imgs) {
        //각 이미지가 로딩이 완료되면 1씩 count값 증가 
        el.onload = () => {
            count++;

            //모든 이미지가 로딩이 완료되면 isoLayout 함수 호출 
            if (count === len) isoLayout();
        }

        let thumb = el.closest(".item").querySelector(".thumb");
        thumb.onerror = e => {
            e.currentTarget.closest(".item").querySelector(".thumb").setAttribute("src", "img/k1.jpg");
        }

        let profile = el.closest(".item").querySelector(".profile");
        profile.onerror = e => {
            e.currentTarget.closest(".item").querySelector(".profile").setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
        }
    }
}

function isoLayout() {
    loading.classList.add("off");
    frame.classList.add("on");

    new Isotope("#list", {
        itemSelector: ".item",
        columnWidth: ".item",
        transitionDuration: "0.5s"
    })
}