//関数
var rand = function(n){
    return Math.floor(Math.random() * n) + 1;
};

function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり削除
      element.removeChild(element.firstChild);
    }
  }

const moneyInput = document.getElementById('money');
const assessmentButton = document.getElementById('assessment');
const radio_move = document.getElementById('move');
const tweetDivided = document.getElementById('tweet-area');

// 受け取ったmoneyInputはオブジェクトで、
// プロパティに type, id, valueを持つ
// そのため、値へのアクセスをするためには
// moneyInput.value のようにするが、ここでvalueは文字型なので
// 数値であれば数値に直す必要あり

//p attern 1
var local_very_chip = ['すき屋'];
// pattern 2
var local_chip = ['すき屋','ポポラマーマ','ロッテリア','熊祥','ムタヒロ','増田屋'];
// pattern 3
var local_usually = ['ガスト','夢庵','びっくり寿司'];
// pattern 4
var local_expense = ['安楽亭'];
// pattern 5
var train_very_chip = ['マクドナルド'];
// pattern 6
var train_chip = ['モスバーガー','サイゼリヤ','マクドナルド'];
// pattern 7
var train_usually = ['スシロー','大戸屋','デニーズ','ケンタッキー'];
// pattern 8
var train_expense = ['鳥貴族'];

assessmentButton.onclick = function(){
    var money = -1
    money = Number(moneyInput.value);
    var move_way = 0; //電車 1 徒歩 0
    if(radio_move.train)
    train_flag = 1;
    if (money<0) {
        console.log('入力が非数値です');
        go_to = '公園';
        // 名前が空の時は処理を終了する
        return;
    }
    if(radio_move.move.value==='train'){
        // console.log('電車ボタンが選択されています')
        move_way = 1;
        
    } else if(radio_move.move.value==='walk'){
        // console.log('徒歩ボタンが選択されています')
        move_way = 0;
    } else{
        document.getElementById('store').innerText = 
            ('電車に乗るか乗らないか決めてね');
        return;
    }

    // 結果を受け取って表示するエリア
    var result = assessment(money,move_way);
        console.log(result);

    document.getElementById('store').innerText = 
    '今日のご飯は' + result + 'に決定！！';

    // twitterに投稿
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('今日のご飯')+
    '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', '今日のご飯は'+result+'に決定！！');
    anchor.innerText = 'Tweet #今日のご飯';

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
    tweetDivided.appendChild(anchor);

}

function assessment(money,move_way){
    // console.log(money);
    // console.log(move_way);
    
    if(money<500){
        pattern = 0;
    } else if(500<=money&&money<1000){
        if(move_way === 0) pattern = 1;
        else pattern = 5;
    } else if(1000<=money&&money<1500){
        if(move_way === 0) pattern = 2;
        else pattern =  6; 
    } else if(1500<=money&&money<=2000){
        if(move_way === 0) pattern = 3;
        else pattern =  7; 
    } else {
        if(move_way === 0) pattern = 4;
        else pattern =  8; 
    }

    console.log('判定の結果、パターンは', pattern ,'です');

    var go_to;

    if(pattern === 0){
        go_to = '公園';
    }
    if(pattern === 1){
        go_to = local_very_chip[rand(local_very_chip.length)-1];
    }
    if(pattern === 2){
        go_to = local_chip[rand(local_chip.length)-1];
    }
    if(pattern === 3){
        go_to = local_usually[rand(local_usually.length)-1];
    }
    if(pattern === 4){
        go_to = local_expense[rand(local_expense.length)-1];
    }
    if(pattern === 5){
        go_to = train_very_chip[rand(train_very_chip.length)-1];
    }
    if(pattern === 6){
        go_to = train_chip[rand(train_chip.length)-1];
    }
    if(pattern === 7){
        go_to = train_usually[rand(train_usually.length)-1];
    }
    if(pattern === 8){
        go_to = train_expense[rand(train_expense.length)-1];
    }

    return go_to;

}





