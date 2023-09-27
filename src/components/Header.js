import { sidebarHandler } from '../Animation'
import { useLocation } from 'react-router-dom/cjs/react-router-dom'

const Header = () => {

  let { pathname } = useLocation();

  window.addEventListener("resize", () => {

    // 靜態-標題尺寸RWD
    let titleLocateChildren = document.querySelector("#titleLocate").children
    let titleFsWithScroll;
    let titleFsMin;

    if(window.innerWidth>768){
      for(let i=0 ; i<titleLocateChildren.length ; i++){
        titleFsWithScroll = window.scrollY + 180;
        titleFsMin = 50;
        titleLocateChildren[i].style.fontSize = `${Math.max(titleFsWithScroll - (window.scrollY * 1.25), titleFsMin)}px`
      }
    }else{
      for(let i=0 ; i<titleLocateChildren.length ; i++){
        titleFsWithScroll = window.scrollY + 90;
        titleFsMin = 40;
        titleLocateChildren[i].style.fontSize = `${Math.max(titleFsWithScroll - (window.scrollY * 1.1), titleFsMin)}px`
      }
    }
  })

  window.addEventListener("scroll", () => {
    
    // 動畫-控制標題高度
    let headerHeight = getComputedStyle(document.querySelector("header")).height;
    let titleLocateWithScroll = window.scrollY + window.innerHeight/2;
    document.querySelector("#titleLocate").style.top = `${Math.max((titleLocateWithScroll - window.scrollY*1.85), parseInt(headerHeight)/2)}px`;

    // 動畫-控制標題尺寸
    let titleLocateChildren = document.querySelector("#titleLocate").children
    let titleFsWithScroll;
    let titleFsMin;

    for(let i=0 ; i<titleLocateChildren.length ; i++){

      if(window.innerWidth>768){
        titleFsWithScroll = window.scrollY + 180;
        titleFsMin = 50;
        titleLocateChildren[i].style.fontSize = `${Math.max(titleFsWithScroll - (window.scrollY * 1.25), titleFsMin)}px`

      }else{
        titleFsWithScroll = window.scrollY + 90;
        titleFsMin = 40;
        titleLocateChildren[i].style.fontSize = `${Math.max(titleFsWithScroll - (window.scrollY * 1.1), titleFsMin)}px`
      }
    }
  })


  return (
    <>
      <header style={{ display: pathname === '/' ? 'block' : 'none' }}>
        <div className="container-fluid">
          <a href="/">
            <img className="headerLogo" src="./images/logo-small.png" alt="" />
          </a>
          <div id="titleLocate" className="titleLocate">
            <span>A</span>
            <span>q</span>
            <span>u</span>
            <span>a</span>
            <span>R</span>
          </div>
        </div>
      </header>

      <div id="menuController" className="menu-controller" onClick={ sidebarHandler }>
          <span></span>
          <span></span>
          <span></span>
      </div>
    </>
  )
}

export default Header