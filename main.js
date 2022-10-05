function calDistance(gotoRow,gotoCol,curRow,curCol){


    return Math.abs(gotoRow-curRow) + Math.abs(gotoCol-curCol);
}


let LeftFinger = {
    locate:'*',
    currentRow: 3,
    currentCol: 0,
    ans:"L"
};
let RightFinger = {
    locate:'#',
    currentRow: 3,
    currentCol: 2,
    ans:"R"
};

function update(obj,locate,gotoRow,gotoCol){

    obj.locate = locate
    obj.currentRow = gotoRow
    obj.currentCol = gotoCol
    return obj.ans;
}



function solution(numbers, hand) {

    const keyPad = {
        1:[ { row:0, col: 0} ],
        2:[ { row:0, col: 1} ],
        3:[ { row:0, col: 2} ],
        4:[ { row:1, col: 0} ],
        5:[ { row:1, col: 1} ],
        6:[ { row:1, col: 2} ],
        7:[ { row:2, col: 0} ],
        8:[ { row:2, col: 1} ],
        9:[ { row:2, col: 2} ],
        0:[ { row:3, col: 1} ],
        '#':[ { row:3, col: 2} ],
        '*':[ { row:3, col: 0} ],
    }

   var result = numbers.map((input)=>{
        var gotoRow = keyPad[input][0].row;
        var gotoCol = keyPad[input][0].col;



        switch (gotoCol){
            case 0: //left
                return update(LeftFinger,input,gotoRow,gotoCol);


            case 1: //middle
            case 2:
                return update(RightFinger,input,gotoRow,gotoCol);

        }
    })

    //input -> input의 좌표 변환 -> 각 손가락 위치 거리 계산 -> 가까운거 덮어씌우기

   /* var result = numbers.map((input)=>{
        let gotoRow = 0;
        let gotoCol = 0;

        if( input ===0 ) {
            gotoRow = 3; gotoCol = 1;
            var leftD = calDistance(gotoRow,gotoCol,LeftFinger.currentRow,LeftFinger.currentCol);
            var rightD = calDistance(gotoRow,gotoCol,RightFinger.currentRow,RightFinger.currentCol);

            if( leftD > rightD ){
                LeftFinger.currentRow = gotoRow;
                LeftFinger.currentCol = gotoCol;
                return LeftFinger.ans

            }
            else if(leftD<rightD){
                RightFinger.currentRow = gotoRow;
                RightFinger.currentCol = gotoCol;
                return RightFinger.ans

            }
            else{
                if(hand==="left"){
                    LeftFinger.currentRow = gotoRow;
                    LeftFinger.currentCol = gotoCol;
                    return LeftFinger.ans
                }
                else{
                    RightFinger.currentRow = gotoRow;
                    RightFinger.currentCol = gotoCol;
                    return RightFinger.ans
                }
            }



        } //0일경우 ( 계산 )

        else if(input%3 === 0){
            gotoRow = (input/3) -1;
            gotoCol = 2
            RightFinger.currentRow = gotoRow;
            RightFinger.currentCol = gotoCol;
            return RightFinger.ans               } // 3,6,9경우


        else if(input%3 === 1){
            gotoRow = (input/3);
            gotoCol = input%3 - 1;
            LeftFinger.currentRow = gotoRow;
            LeftFinger.currentCol = gotoCol;
            return LeftFinger.ans
        } //1,4,7 경우

        else if(input%2 === 2){
            gotoRow = (input/3);
            gotoCol = input%3 - 1;
            return "hi";
        }   //2,5,8 경우

        //input 좌표 변환



    })



    return result;*/
    return result;
}
//순서대로 누를 번호가 담긴 배열 numbers
//왼손잡이인지 오른손잡이인 지를 나타내는 문자열 hand

//각 번호를 누른 엄지손가락이 왼손인 지 오른손인 지를 나타내는 연속된 문자열 형태로 return

//1,4,7 : only Left
//3,6,9 : only Right
//2,5,8,0: more closer one  -> if( same distance) => 왼,오른쪽 손잡이 ㄲ


console.log( solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5],"right"));