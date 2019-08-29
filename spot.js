'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
const spotDivided = document.getElementById('spot-area');


//---------------------------
//       スライドショー
//---------------------------
const slideImage = ["/Users/yuuki/workspace/studying-now/RED19428C008_TP_V4.jpg", "/Users/yuuki/workspace/studying-now/machu-picchu-43387_640.jpg", "/Users/yuuki/workspace/studying-now/mont-saint-michel-2781563_640.jpg", "/Users/yuuki/workspace/studying-now/o-torii-3970153_640.jpg", "/Users/yuuki/workspace/studying-now/horseshoe-bend-1908283_640.jpg"];
let num = -1;

slideshowTimer();

function slideshowTimer() {
  if (num == 4) {  //5つ目の画像が表示されたら最初に戻る
    num = 0;
  } else {         //それ以外は一つ進める
    num++;
  }
  document.getElementById('spotImage').src = slideImage[num];
  setTimeout(slideshowTimer, 5000);   // 5秒で切り替わる
}


/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {   // 子供の要素がある限り削除
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) { // 名前が空の時は処理を終了する
    return;
  }

  // Enter が押された際も診断
  userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      assessmentButton.onclick();
    }
  };

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  //診断結果の画像エリアの作成
  removeAllChildren(spotDivided);
  const image = document.createElement('img');
  const spot = assessment(userName);
  image.innerHTML = spot;
  spotDivided.appendChild(image);
  document.getElementById('spot-area').style.display = 'inline';

  // TODO ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('パワースポット診断')
    + '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #パワースポット診断';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
  '{userName}にピッタリのパワースポットは富士山です。頂上から見る日の出は絶景です。',
  '{userName}にピッタリのパワースポットは屋久島です。  オススメ:縄文杉',
  '{userName}にピッタリのパワースポットは白神山地です。  オススメ: ブナの広大な原生林',
  '{userName}にピッタリのパワースポットは軍艦島です。  オススメ: 軍艦島上陸クルーズ',
  '{userName}にピッタリのパワースポットは厳島神社です。  オススメ: もみじ饅頭',
  '{userName}にピッタリのパワースポットは東大寺です。  オススメ: 柱くぐり',
  '{userName}にピッタリのパワースポットは伊勢神宮です。  オススメ: 三ツ石',
  '{userName}にピッタリのパワースポットは日光東照宮です。  オススメ: 三猿',
  '{userName}にピッタリのパワースポットは火星です。宇宙旅行も夢ではない？！',
  '{userName}にピッタリのパワースポットは月です。宇宙旅行も夢ではない？！',
  '{userName}にピッタリのパワースポットは地球です。世界旅行してみては？',
  '{userName}にピッタリのパワースポットはアンコールワットです。  オススメ: 夕日色に染まる遺跡',
  '{userName}にピッタリのパワースポットはピラミッドです。  オススメ: スフィンクス',
  '{userName}にピッタリのパワースポットは我が家です。一番落ち着く場所ではないでしょうか。',
  '{userName}にピッタリのパワースポットは万里の長城です。  「長城に来ずして英雄にはならず」',
  '{userName}にピッタリのパワースポットはマチュピチュです。  オススメ: 太陽を繋ぎとめる石',
  '{userName}自身がパワースポットです。{userName}に力をもらっている人はたくさんいます。',
  '{userName}にピッタリのパワースポットはグランドキャニオンです。  オススメ: マーサポイントから見る日の出',
  '{userName}にピッタリのパワースポットはトトロの森です。本当にトトロが出てきそうな世界観です。',
  '{userName}にピッタリのパワースポットはモンサンミッシェルです。 オススメ: 潮の満ち引きによって見せる表情の違い'
];

const answersImage = [
  '<img src="/Users/yuuki/workspace/studying-now/RED19428C008_TP_V4.jpg" alt="富士山" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/yakushima-island-1030459_640.jpg" alt="屋久島" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/woods-2212503_640.jpg" alt="白神山地" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/japan-1723322_640.jpg" alt="軍艦島" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/o-torii-3970153_640.jpg" alt="厳島神社" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/todai-ji-temple-2672649_640.jpg" alt="東大寺" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/ise-jingu-shrine-1862658_640.jpg" alt="伊勢神宮" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/toshogu-shrine-477813_640.jpg" alt="日光東照宮" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/mars-67522_640.jpg" alt="火星" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/astronomy-1869760_640.jpg" alt="月" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/sunrise-1756274_640.jpg" alt="地球" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/angkor-wat-425689_640.jpg" alt="アンコールワット" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/pyramids-2371501_640.jpg" alt="ピラミッド" width="300" height="150">',
  '<img src="http://1.bp.blogspot.com/-JBS94CyHCdk/Uyk_HvFJfqI/AAAAAAAAeMA/7Henae-H-xI/s180-c/album_family.png" alt="我が家" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/great-wall-3022907_640.jpg" alt="万里の長城" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/machu-picchu-43387_640.jpg" alt="マチュピチュ" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/adult-1869001_640.jpg" alt="自分自身" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/horseshoe-bend-1908283_640.jpg" alt="グランドキャニオン" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/natural-727442_640.jpg" alt="トトロの森" width="300" height="150">',
  '<img src="/Users/yuuki/workspace/studying-now/mont-saint-michel-2781563_640.jpg" alt="モンサンミッシェル" width="300" height="150">'
];


/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザー
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  spotDivided.innerHTML = answersImage[index];


  // {userName} をユーザーの名前に書き換える
  result = result.replace(/\{userName\}/g, userName);
  return result;
};


// -------------------------
//           テスト
// -------------------------

console.assert(
  assessment('太郎') === '太郎自身がパワースポットです。太郎に力をもらっている人はたくさんいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
