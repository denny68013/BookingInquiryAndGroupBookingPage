//////////////////// 側邊欄 ////////////////////
export function sidebarHandler(e) {
  e.preventDefault()
  
  document.querySelector('#menuController').classList.toggle('menu-controller-toggle');
  document.querySelector('#sidebar').classList.toggle('sidebar-toggle');
  document.querySelector('#sidebarMask').classList.toggle('sidebar-mask-toggle');
}


//////////////////// 監聽Home的Y軸滾動 ////////////////////
//////////////////// 監聽Home的Y軸滾動 ////////////////////
//////////////////// 監聽Home的Y軸滾動 ////////////////////
export function listenHomeScrollYFunction(){

  ///////////////////// mainBlock2的卡片動畫 ////////////////////

  if(window.innerWidth>768) {  //電腦版，淡入

    if ( window.scrollY > window.innerHeight * 0.7 ) {
      document.querySelector("#block2Card1").classList.add("slideInFromBottom")
      document.querySelector("#block2Card2").classList.add("slideInFromBottom-delay0p3")
      document.querySelector("#block2Card3").classList.add("slideInFromBottom-delay0p6")
    }
    if ( window.scrollY < window.innerHeight * 0.25 ) {
      document.querySelector("#block2Card1").classList.remove("slideInFromBottom")
      document.querySelector("#block2Card2").classList.remove("slideInFromBottom-delay0p3")
      document.querySelector("#block2Card3").classList.remove("slideInFromBottom-delay0p6")
    }

  }else{  //手機版，淡入
    if ( window.scrollY > window.innerHeight * 0.5 ) {
      document.querySelector("#block2Card1").classList.add("slideInLeftAni")
    }
    if ( window.scrollY > window.innerHeight * 0.7 ) {
      document.querySelector("#block2Card2").classList.add("slideInRightAni")
    }
    if ( window.scrollY > window.innerHeight * 0.85 ) {
      document.querySelector("#block2Card3").classList.add("slideInBottomAni")
    }
    if ( window.scrollY < window.innerHeight * 0.25 ) {
      document.querySelector("#block2Card1").classList.remove("slideInLeftAni")
      document.querySelector("#block2Card2").classList.remove("slideInRightAni")
      document.querySelector("#block2Card3").classList.remove("slideInBottomAni")
    }
  }


  ///////////////////// mainBlock3的卡片動畫 ////////////////////

  let block3Card1 =  document.querySelector("#block3Card1");
  let block3Card2 =  document.querySelector("#block3Card2");
  let block3Card3 =  document.querySelector("#block3Card3");

  if(window.innerWidth>768) {  //電腦版，淡入

    if ( window.scrollY > window.innerHeight * 1.7 ) {
      block3Card1.classList.add("slideInFromBottom")
      block3Card2.classList.add("slideInFromBottom-delay0p3")
      block3Card3.classList.add("slideInFromBottom-delay0p6")
    }
    if ( window.scrollY < window.innerHeight * 1.25 ) {
      block3Card1.classList.remove("slideInFromBottom")
      block3Card2.classList.remove("slideInFromBottom-delay0p3")
      block3Card3.classList.remove("slideInFromBottom-delay0p6")
    }

  }else{  //手機版，翻牌

    //滾輪往下翻牌
    if ( window.scrollY >= window.innerHeight * 2.5 && block3Card1.classList.contains("block3Card-1-rwd")) {
      block3Card1.classList.remove("block3Card-1-rwd")
      block3Card1.classList.remove("flip-in2-for-Block3Card1")
      block3Card2.classList.remove("flip-out2-for-Block3Card2")

      block3Card1.classList.add("flip-out-for-Block3Card1")
      block3Card2.classList.add("flip-in-for-Block3Card2")
    }
    if ( window.scrollY >= window.innerHeight * 3.5 && block3Card2.classList.contains("flip-in-for-Block3Card2")) {
      block3Card1.classList.remove("flip-out-for-Block3Card1")
      block3Card2.classList.remove("flip-in-for-Block3Card2")

      block3Card2.classList.add("flip-out-for-Block3Card2")
      block3Card3.classList.add("flip-in-for-Block3Card3")
    }

    //滾輪往上翻牌
    if ( window.scrollY < window.innerHeight * 2.5 && (block3Card2.classList.contains("flip-in2-for-Block3Card2") || block3Card2.classList.contains("flip-in-for-Block3Card2"))) {
      block3Card2.classList.remove("flip-in2-for-Block3Card2")
      block3Card3.classList.remove("flip-out2-for-Block3Card3")

      block3Card1.classList.add("block3Card-1-rwd")
      block3Card1.classList.add("flip-in2-for-Block3Card1")
      block3Card2.classList.add("flip-out2-for-Block3Card2")
    }
    if ( window.scrollY < window.innerHeight * 3.5 && block3Card3.classList.contains("flip-in-for-Block3Card3")) {
      block3Card2.classList.remove("flip-out-for-Block3Card2")
      block3Card3.classList.remove("flip-in-for-Block3Card3")

      block3Card2.classList.add("flip-in2-for-Block3Card2")
      block3Card3.classList.add("flip-out2-for-Block3Card3")
    }
  }

  //跟隨滾動移動
  if ( window.innerWidth > 768) {
    if ( window.scrollY > window.innerHeight * 2 && window.scrollY < window.innerHeight * 3) {
      document.querySelector("#mainBlock3TitleBlock").style.paddingTop = `${window.scrollY - (window.innerHeight * 2) + (window.innerHeight * 0.2)}px`
    }
  }else {
    if ( window.scrollY > window.innerHeight * 2 && window.scrollY < window.innerHeight * 4.5) {
      document.querySelector("#mainBlock3TitleBlock").style.paddingTop = `${window.scrollY - (window.innerHeight * 2) + 120}px`
    }
  }




  ///////////////////// mainBlock4動畫 ////////////////////

  //跟隨滾動移動
  if ( window.innerWidth > 768) {
    if ( window.scrollY > window.innerHeight * 3.75 && window.scrollY < window.innerHeight * 5) {
      document.querySelector("#block4TextBlock1").style.transform = `translateY(${window.scrollY - (window.innerHeight * 3.75)}px)`
      document.querySelector("#block4TextBlock2").style.transform = `translateY(${window.scrollY - (window.innerHeight * 3.75)}px)`
    }
  }else {
    if ( window.scrollY > window.innerHeight * 5.25 && window.scrollY < window.innerHeight * 7) {
      document.querySelector("#block4TextBlock1").style.transform = `translateY(${window.scrollY - (window.innerHeight * 5.25)}px)`
      document.querySelector("#block4TextBlock2").style.transform = `translateY(${window.scrollY - (window.innerHeight * 5.25)}px)`
    }
  }


  ///////////////////// 魚動畫 ////////////////////

  if(window.innerWidth>768) {

    if ( window.scrollY > window.innerHeight * 1.75 ) {
      document.querySelector("#fish").classList.add("fish-path1")
    }
    if ( window.scrollY < window.innerHeight * 1.25 ) {
      document.querySelector("#fish").classList.remove("fish-path1")

    }

    if ( window.scrollY > window.innerHeight * 3.75 ) {
      document.querySelector("#fish2").classList.add("fish-path2")
    }
    if ( window.scrollY < window.innerHeight * 3.25 ) {
      document.querySelector("#fish2").classList.remove("fish-path2")
    }
  }

  
}






//////////////////// resize樣式變更 ////////////////////

export function resizeFunction(){
  if(window.innerWidth>768){
    //Block2
    document.querySelector("#block2Card1").classList.remove("slideInLeftAni")
    document.querySelector("#block2Card2").classList.remove("slideInRightAni")
    document.querySelector("#block2Card3").classList.remove("slideInBottomAni")

    //Block3
    document.querySelector("#block3Card1").classList.remove("flip-out-for-Block3Card1")
    document.querySelector("#block3Card2").classList.remove("flip-in-for-Block3Card2")
    document.querySelector("#block3Card2").classList.remove("flip-out-for-Block3Card2")
    document.querySelector("#block3Card3").classList.remove("flip-in-for-Block3Card3")
    document.querySelector("#block3Card1").classList.remove("flip-in2-for-Block3Card1")
    document.querySelector("#block3Card2").classList.remove("flip-out2-for-Block3Card2")
    document.querySelector("#block3Card2").classList.remove("flip-in2-for-Block3Card2")
    document.querySelector("#block3Card3").classList.remove("flip-out2-for-Block3Card3")

  }else{
    //Block2
    document.querySelector("#block2Card1").classList.remove("slideInFromBottom")
    document.querySelector("#block2Card2").classList.remove("slideInFromBottom-delay0p3")
    document.querySelector("#block2Card3").classList.remove("slideInFromBottom-delay0p6")

    //Block3
    document.querySelector("#block3Card1").classList.add("block3Card-1-rwd")
    document.querySelector("#block3Card1").classList.remove("slideInFromBottom")
    document.querySelector("#block3Card2").classList.remove("slideInFromBottom-delay0p3")
    document.querySelector("#block3Card3").classList.remove("slideInFromBottom-delay0p6")
  }
}






