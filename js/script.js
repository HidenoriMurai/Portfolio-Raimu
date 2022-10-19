//スライドメニュー
$(".js-btn__hamburger").click(function () {
  //ボタンがクリックされたら
  $(this).toggleClass("active"); //ボタン自身に activeクラスを付与し
  $(".p-aside").toggleClass("p-aside--panelactive"); //ナビゲーションにpanelactiveクラスを付与
  $(".l-body").toggleClass("l-body--overlay");
});

$(".p-aside a").click(function () {
  //ナビゲーションのリンクがクリックされたら
  $(".js-btn__hamburger").removeClass("active"); //ボタンの activeクラスを除去し
  $(".p-aside").removeClass("p-aside--panelactive"); //ナビゲーションのpanelactiveクラスも除去
  $(".l-body").removeClass("l-body--overlay");
});

// ブログ用スライダー
const list = document.querySelector(".p-card__List");

const onScroll = () => {
  const cards = list.querySelectorAll(".c-card");
  const listRightPos = list.scrollLeft + list.offsetWidth;
  cards.forEach((card) => {
    const visibleRatio = Math.max(0, Math.min(1, (-(card.offsetLeft - listRightPos) / card.offsetWidth) * 0.75));
    const easedRatio = 1 - (1 - visibleRatio) ** 2;
    card.style.transform = `
          translateX(${(1 - easedRatio) * -100}px) 
          translateZ(${(1 - easedRatio) * 100}px) 
          rotateY(${(1 - easedRatio) * 60}deg)
        `;
  });

  // 最後のカードが見えたら新しいカードを追加
  // const lastCard = cards[cards.length - 1];
  // const isLastCardVisible = lastCard.offsetLeft < list.scrollLeft + list.offsetWidth;
  // if (isLastCardVisible) {
  //   const card = lastCard.cloneNode(true);
  //   card.getElementsByTagName("img")[0].src = `https://picsum.photos/seed/${cards.length + 1}/300/150`;
  //   list.appendChild(card);
  // }
};
list.addEventListener("scroll", onScroll);
onScroll();

// フワッとスキル(l-fade js-fadeにて設定)
$(function () {
  $(window).scroll(function () {
    $(".js-fade").each(function () {
      const targetElement = $(this).offset().top; //フェードさせる要素の高さ
      const scroll = $(window).scrollTop(); //スクロールした際の垂直方向のスクロール幅
      const windowHeight = $(window).height(); //windowの高さ
      if (scroll > targetElement - windowHeight) {
        $(this).addClass("view");
      }
    });
  });
});

//再読み込み時TOP表示
$(function () {
  $("html,body").animate({ scrollTop: 0 }, "1");
});

//TOP誘導ボタン
// ページの読み込みが完了してから実行
$(function () {
  // スクロールしたときに実行
  $(window).scroll(function () {
    // 目的のスクロール量を設定(px)
    var TargetPos = 350;
    // 現在のスクロール位置を取得
    var ScrollPos = $(window).scrollTop();
    // 現在位置が目的のスクロール量に達しているかどうかを判断
    if (ScrollPos >= TargetPos) {
      // 達していれば表示
      $("#c-page-top").fadeIn();
    } else {
      // 達していなければ非表示
      $("#c-page-top").fadeOut();
    }
  });
});
