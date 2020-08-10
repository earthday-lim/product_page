$(document).ready(function(){
    
    var $price = $(".pd_price span").text();//현재의 가격정보를 저장 & typeof체크
    console.log("현재의 가격의 원본 정보 : "+$price); 
    console.log("현재의 가격의 원본 정보의 type : "+ typeof $price);//문자데이터

    var $origin_price = $price.replace(",", "");//,를 제거하고 원본의 순수한 숫자만 저장
    console.log("숫자정보의 값 : "+$origin_price);
    console.log("숫자정보의 type : "+ typeof $origin_price);//문자데이터
    var $basic_price = parseFloat($origin_price);//문자형 -> 숫자형 / Number($origin_price) 소수점이 있을 수 있으므로 parseFloat이 더 정확
    console.log($basic_price);
    console.log(typeof $basic_price);//숫자데이터

    var $num = $(".pd_count_box input").val();
    var $total_price_opt;
    var $total_price_result = "";//문자형이라는 선언
    var $opt_val = "";

    function calc_price(){
        $(".pd_count_box input").val($num);
        ///$total_price = $basic_price * $num; //총금액 = 개별가격 * 수량
        ///var $total_result = $total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//숫자형 -> 문자형 : ","붙이기
        /* 
        정규식표현  /\B(?=(\d{3})+(?!\d))/g 
        
        #1. / ~ / : 정규식 표현의 시작과 끝
        #2. \B : 공백처리(blank) "(뒤에 선언한 위치에)공백을 만든다" 대문자로만!
        #3. ?= : 내부의 정규식실행문(()가 닫히기 전까지의 =이하의 식들)을 조합하여 결과로 도출
        #4. \d : 0~9까지의 숫자데이터만을 지정해서 가져옴(dimension) "숫자형 데이터 중"
        #5. \d{3} : 좌측부터 3자리마다 패턴을 구성, 3자리 세면 패턴 적용 ex) 000(패턴실행)000(패턴실행)→...000(패턴실행)
        #6. ?!\d : 숫자형데이터만을 지정하는데 !때문에 반대부터 숫자를 센다 (원래는 왼쪽부터 세지만 오른쪽부터 숫자를 센다). 부정형 전방 탐색(역방향으로 세겠다) ex) (패턴실행)000...←(패턴실행)000(패턴실행)000
        패턴 : 공백처리하고 공백에 ","를 넣어줘라 
        #7. g : global정규 표현을 사용하겠다는 의미 (세계 공용어 느낌)

        
        */
        // /\열고 /닫고
        //\d : 숫자형데이터 
        //{3} : 3자리에서 끊겠다
        ///console.log($total_result);

        ///$(".total_price_num span").text($total_result);//추가(삭제)할 때 가격이 추가(줄어)되므로 원본 가격텍스트에 추가(삭제)한 금액을 더한(뺀) 만큼의 가격테스트로 변경

        /* select 추가금액 & 위에서 겹치는 부분(///) 지움 */
        $opt_val = $(".pd_option select").val(); //this는 이벤트 시 선택자를 가르킴 함수는 이벤트가 아니므로 document가 this가 되어버림
        //console.log(typeof $opt_val); //문자형
        ///$total_price = $basic_price * $num;
        $total_price_opt = $basic_price * $num + parseFloat($opt_val);
        $total_price_result = $total_price_opt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //console.log($total_price_result);
        $(".total_price_num span").text($total_price_result);

        /* 장바구니 */
        var $detail_img = $(".pd_img img").attr("src");
        $(".cart_img img").attr("src", $detail_img);
        var $detail_title = $(".pd_title h3").text();
        $(".cart_info h4").text($detail_title);
        $(".buy_price span").text($total_price_result);

        var $sel_opt_txt = $(".pd_option select option:selected").text();
        $(".bottom_list p span").text($sel_opt_txt);

        var $opt_default = $(".pd_option select option:selected").attr("value");
        if($opt_default == "0"){
            $(".bottom_list").hide();
        }else{
            $(".bottom_list").show();
        }

    }   

    $(".pd_count_box a:first").click(function(){
        
        if($num < 2){
            //현재 구매수량이 1이므로 증감식 작동 금지
        }else{
            $num--;//현재 구매수량이 2이상일 경우, -를 눌렀을 때 1씩 감소 -> 1이 될때까지 감소
            calc_price();
            //$(".pd_count_box input").val($num);
            //$total_price = $basic_price * $num;
            //$(".total_price_num span").text($total_price);
        }
    
        return false;
    });

    $(".pd_count_box a:last").click(function(){
        $num++;//무제한으로 올릴 수 있으므로 조건식 필요없음
        calc_price();
        //$(".pd_count_box input").val($num);
        //$total_price = $basic_price * $num;
        //$(".total_price_num span").text($total_price);

        return false;
    });

    $(".pd_option select").change(function(){
        calc_price();
    });



    $(".pd_btn li:last-child input").click(function(){
        $(".dark, .mycart").addClass("active");
        calc_price();//새로고침할 땐 아무것도 선택안했을 때 가격정보가 나오지 않음 최종금액이 함수 안에 선언되어있기 때문
    });
    $(".dark, .close_btn, .cart_btn li:last-child input").click(function(){
        $(".dark, .mycart").removeClass("active");
    });


});