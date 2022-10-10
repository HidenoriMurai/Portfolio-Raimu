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

// トップスライダー
const myDelay = 7000;

const slideLength = document.querySelectorAll(".p-swiper .swiper-slide").length;
const total = ("00" + slideLength).slice(-2);

const fractionNum = document.querySelector(".p-swiper .fraction .num");
const fractionTotal = document.querySelector(".p-swiper .fraction .total");
fractionTotal.textContent = total;

const updateFraction = (index) => {
  let current = ("00" + (index + 1)).slice(-2);
  fractionNum.classList.add("anm-started");
  setTimeout(() => {
    fractionNum.textContent = current;
  }, 400);
};

const startAnimation = (index) => {
  let activeSlide = document.querySelectorAll(".p-swiper .content")[index];
  activeSlide.classList.remove("anm-finished");
  activeSlide.classList.add("anm-started");
};

const finishAnimation = () => {
  let activeSlide = document.querySelector(".p-swiper .content.anm-started");
  if (activeSlide) {
    activeSlide.classList.remove("anm-started");
    activeSlide.classList.add("anm-finished");
  }
};

const mySwiper = new Swiper(".p-swiper .swiper", {
  loop: true,
  loopAdditionalSlides: 1,
  speed: 3000,
  autoplay: {
    delay: myDelay,
    disableOnInteraction: false,
    waitForTransition: false,
  },
  followFinger: false,
  observeParents: true,
  on: {
    slideChange: (swiper) => {
      updateFraction(swiper.realIndex);
      finishAnimation();
    },
    slideChangeTransitionStart: (swiper) => {
      startAnimation(swiper.realIndex);
    },
    slideChangeTransitionEnd: () => {
      fractionNum.classList.remove("anm-started");
    },
  },
});
