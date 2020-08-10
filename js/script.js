$(document).ready(function(){

    //이차배열패턴 = ["이미지 파일", "타이틀", "텍스트", "가격", "업데이트 날짜", "좋아요 횟수"];
    var $pd_arr = [
        ["img1.jpg", "거실 인테리어4", "합리주의 실용 인테리어4", "30000", "20200807", "23"],
        ["img2.jpg", "거실 인테리어1", "합리주의 실용 인테리어1", "150000", "20200309", "35"],
        ["img3.jpg", "침실 인테리어8", "모더니즘 실용 인테리어8", "35000", "20190807", "97"],
        ["img4.jpg", "침실 인테리어5", "심플 실용 인테리어5", "56000", "20200525", "37"],
        ["img5.jpg", "주방 인테리어2", "포스트 모더니즘 실용 인테리어2", "80000", "20190507", "145"],
        ["img6.jpg", "거실 인테리어9", "맥시멀리즘 인테리어9", "63000", "20190828", "28"],
        ["img7.jpg", "주방 인테리어3", "미니멀리즘 인테리어3", "15000", "20200121", "24"],
        ["img8.jpg", "욕실 인테리어6", "상쾌한 인테리어6", "330000", "20190216", "67"],
        ["img9.jpg", "거실 인테리어7", "포근한 인테리어7", "180000", "20201005", "153"]
    ];

    var $pd_box = `
        <div class="pd_box">
            <div class="pd_photo">
                <img src="img/img1.jpg" alt="">
            </div>
            <div class="pd_info">
                <h3 class="pd_tit">title</h3>
                <p class="pd_txt">text</p>
                <div class="pd_etc">
                    <span class="pd_price">26500</span>
                    <div class="pd_date">2020-08-07</div>
                </div>
                <p class="fav">좋아요&nbsp;<span>105</span></p>
            </div>
        </div>

    `;


    for(i=0; i<$pd_arr.length; i++){
        $(".pd_frame").append($pd_box);
    }
    
    var $btn_index;//active를 공통 함수문에 선언해주기 위한(this를 바꿔야 함) 전역변수 어짜피 매 버튼 클릭시 마다 그곳의 인덱스를 받아올 것이므로 값은 없어도 됨 비어있는 변수 선언
    //메모리로 저장 호출 전까진 저장만 돼있는 상태
    function pd_box(){
        $(".pd_box").each(function(index){
            $(this).find(".pd_photo img").attr("src", "img/"+$pd_arr[index][0]+"");
            $(this).find(".pd_tit").text($pd_arr[index][1]);
            $(this).find(".pd_txt").text($pd_arr[index][2]);
            $(this).find(".pd_price").text($pd_arr[index][3]);
            $(this).find(".pd_date").text($pd_arr[index][4]);
            $(this).find(".fav span").text($pd_arr[index][5]);
        });
        //버튼 클릭 시 active부여
        $(".sort_button button").removeClass("active");//모든 버튼으로부터 active 모두 제거
        $(".sort_button button").eq($btn_index).addClass("active");//클릭한 곳에 active 부여
        
        //button 클릭 시 select box 연동
        $(".sort_sel option").prop("selected", false);//모든 옵션에 selected제거
        $(".sort_sel option").eq($btn_index+1).prop("selected", true);//버튼클릭한 곳의 인덱스보다 하나 큰 옵션 인덱스에 selected추가
        //클릭시 셀렉트박스를 바꾸게 하려면 클릭한 곳과 동일한 인덱스의 옵션에 selected를 추가해주면 됨 
        
    };
    pd_box(); //호출 -> 일단 뿌려놓음


    //최신순이라는 버튼을 클릭 시 
    $(".date_sort").click(function(){
        //sort() 메서드 : 순차적으로 나열을 시키는 메서드. 오름차순(작은 숫자부터 올라감)으로 나열
        $pd_arr.sort(function(a,b){
            
            //return b[4] - a[4];//큰 순으로 차례대로 정렬, reverse()하는 것과 같은 효과
            return a[4] - b[4];//작은 순으로 차례대로 정렬 

            //얖옆에 있는 두개(a,b)가 짝이 되어 서로의 크기를 비교해서 작은 숫자부터 나열됨 ab는 계속 바뀌고 1차비교 한바퀴 돌고 다시 2차비교 한바퀴 돌고... 계속 abab...abab비교해서 완성된 순서는 고정
            //[비교하고싶은 인덱스번호]를 적으므로 a의 4번째 인덱스 값과 b의 4번째 인덱스 값을 비교하는 것
        });
        console.log($pd_arr);//날짜가 가장 오래된순으로 정렬, 배열 순서 변경
        $pd_arr.reverse(); //reverse() : 배열을 역순으로 정렬 -> 큰 순으로 차례대로 정렬
        console.log($pd_arr);//날짜가 가장 최신순으로 정렬, 배열 순서 변경

        //조건(최신날짜순)에 맞게 재정렬한 값을 다시 뿌림
        $btn_index = $(this).index();//함수 안에 있는 $btn_index의 값을 현재 인덱스값으로 바꿔준 후 함수 호출
        pd_box();
        /* $(".sort_button button").removeClass("active");
        $(this).addClass("active"); */

    });

    //낮은 가격순이라는 버튼 클릭 시
    $(".low_sort").click(function(){
        $pd_arr.sort(function(a,b){

            return a[3] - b[3]; 
        });
        console.log($pd_arr);

        //조건(낮은가격순)에 맞게 재정렬한 값을 다시 뿌림
        $btn_index = $(this).index();
        pd_box();
        /* $(".sort_button button").removeClass("active");
        $(this).addClass("active"); */
    });
    
    //높은 가격순이라는 버튼 클릭 시
    $(".high_sort").click(function(){
        $pd_arr.sort(function(a,b){

            return a[3] - b[3]; 
        });
        console.log($pd_arr);
        $pd_arr.reverse(); //정렬한 후에 값을 바꿔야 함 정렬이벤트는 abab값을 계속 비교하는 것 까지만!
        //혹은 return b[3] - a[3]; 라고 선언

        //조건(낮은가격순)에 맞게 재정렬한 값을 다시 뿌림
        $btn_index = $(this).index();
        pd_box();
        /* $(".sort_button button").removeClass("active");
        $(this).addClass("active"); */
    });

    //인기순이라는 버튼 클릭 시
    $(".fav_sort").click(function(){
        $pd_arr.sort(function(a,b){

            return b[5] - a[5]; //좋아요가 많은 순으로 재정렬해야 하므로 reverse값
        });
        console.log($pd_arr);

        //조건(인기순)에 맞게 재정렬한 값을 다시 뿌림
        $btn_index = $(this).index();
        pd_box();
        /* $(".sort_button button").removeClass("active");
        $(this).addClass("active"); */
    });


    $(".sort_sel").change(function(){ //부모를 선택자로 불러와서 그 안에 요소들이 변경될 때마다 function적용
        var $sel_val = $(this).val();
        console.log($sel_val);
        

        if($sel_val == "date"){//최신순
            $pd_arr.sort(function(a,b){
                return b[4] - a[4];
            });
            pd_box();
            
        }else if($sel_val == "low"){//저가순
            $pd_arr.sort(function(a,b){
                return a[3] - b[3];
            });
            pd_box();
            
        }else if($sel_val == "high"){//고가순
            $pd_arr.sort(function(a,b){
                return b[3] - a[3];
            });
            pd_box();
            
        }else if($sel_val == "fav"){//인기순
            //else로 끝내면 안되는 이유 : 선택했을 때라는 조건이 있을 때 실행해야 하므로 else if를 써줘야 함
            $pd_arr.sort(function(a,b){
                return b[5] - a[5];
            });
            pd_box();
            
        }else{
            $(".sort_button button").removeClass("active");

        }
        //셀렉트 박스가 change될 때마다(=옵션 클릭 시) 버튼과 연동
        $(".sort_button button").removeClass("active");//셀렉트 박스에서 선택을 바꿔서 다른 곳에 active가 들어와 있을 때 모든 active제거 세팅
        $(".sort_button button[class^='"+$sel_val+"']").addClass("active");//value값이 클래스 명에 들어있는 버튼에 active추가
        //다시 버튼 클릭시 셀렉스 박스 연동
        $(".sort_sel option").prop("selected", false);//모든 선택된 옵션 리셋
        $(".sort_sel option[value='"+$sel_val+"']").prop("selected", true);//change가 돌 때마다 바뀐 this의 value를 가진 곳에 selected추가

    });


    /* page마다 정해진 상품의 개수 보여주기 */

    //배열 데이터의 상품 개수가 8개(4의 배수)이고, 페이지 하나씩마나 상품을 4개씩 보여줄라면 2개의 페이지가 필요하다 => 하단부에 1,2라는 페이저(표시장치)가 필요
    // 8/4 => 몫은 2 나머지 = 0 => if
    //for문 => (초기값 k = 0; k < 8/4=2; k++) : k= 0,1          vs        (초기값 k = 0; k <= 8/4=2; k++) : k= 0,1,2
    //k=0, k=1 : k++와 k<2라는 걸 만족하는 k는 이 2(몫)개뿐               //k=0, k=1, k=2
    /*                                                                    /*  
        <ol class="pager">                                                  <ol class="pager">
            <li>(k)0+1=1</li>                                                    <li>(k)0+1=1</li>      
            <li>(k)1+1=2</li>                                                    <li>(k)1+1=2</li>
        </ol>                                                                    <li>(k)2+1=3</li>
                                                                            </ol>                                    
    for(i=0; i<10; i++){
        console.log
    }
    */

    //만약 상품의 개수가 9개일 때 => 필요한 페이지 수는 3개(4,4,1) 1, 2, 3
    //if(9%4 != 0) 9를 4로 나눈 나머지가 0이 아닐 때
    //for(k=0; k <= 9/4)


    var $ea_item = 4;//각 페이지 별로 4개의 item을 보여주겠다 각 페이지 별로 보여주고 싶은 개수
    if($pd_arr.length % $ea_item == 0){//"$pd_arr.length % 4 == 0" = "4의 배수라면" 아래의 for문(li 2개)을 실행
        for(k=0; k < $pd_arr.length/$ea_item; k++){//k=0,1 <- k < $pd_arr.length/4하면 몫이 2이므로
            $(".pager").append("<li>"+(k+1)+"</li>")//k=0,..k=1
        }
    }else{// = if($pd_arr.length % 4 != 0)
        for(k=0; k <= parseInt($pd_arr.length/$ea_item); k++){//"$pd_arr.length % 4 != 0" = "4의 배수가 아니라면" 아래의 for문(li 3개)을 실행   //parseInt() 나머지는 절삭하고 정수값을 받아와 빼도 상관없음
            $(".pager").append("<li>"+(k+1)+"</li>")//k=0,..k=1,..k=2
        }
    }

    $(".pager li").eq(0).addClass("active");
    //$(".pd_box").show(); display: none;한 적이 없으므로 필요없음
    $(".pd_box").eq($ea_item - 1).nextAll().hide();//한 페이지에 4개까지(인덱스 3번까지)만 보여주고 나머진 감춰라

    $(".pager li").click(function(){
        $(".pager li").removeClass("active");
        $(this).addClass("active");
        var $pager_txt = $(this).text();//인덱스 뽑아와서 1더해도 상관없음
        $(".pd_box").show(); //일단 다 보여진 상태해서 선택한 것만 감추는 방식으로 진행
        $(".pd_box").eq($ea_item * ($pager_txt - 1)).prevAll().hide();//인덱스 4번 이전의 모든 상품은 감춰라
        $(".pd_box").eq($ea_item * $pager_txt - 1).nextAll().hide();
    });

    /* 페이지 패턴(식) 찾기 */
    //페이지에서 4개의 상품 중 처음 보여줄 상품의 인덱스 번호 추출식 "4(n-1)" : 보여줘야할 개수 * (클릭한 곳의 페이지 번호 - 1)
    //페이지에서 4개의 상품 중 마지막에 보여줄 상품의 인덱스 번호 추출식 "4n-1" : 보여줘야할 개수 * 클릭한 곳의 페이지 번호 - 1

    //2번을 클릭했다면(text문구로 2를 가져옴), 인덱스번호 4~7까지만 보여준다. 4($ea_item) * (2 - 1) 
    //4 * 1 = 4(2번째 페이지에서 처음 보여주어야 할 인덱스 번호)
    //4 * 2 - 1 = 7(2번째 페이지에서 마지막에 보여주어야 할 인덱스 번호)

    //3번을 클릭했다면(text문구로 3를 가져옴), 인덱스번호 8~11까지만 보여준다. 4($ea_item) * (3 - 1) 
    //4 * 2 => 8(3번째 페이지에서 처음 보여주어야 할 인덱스 번호)
    //4 * 3 - 1 = 11(2번째 페이지에서 마지막에 보여주어야 할 인덱스 번호)

});