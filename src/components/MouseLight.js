import { useEffect } from "react";


const MouseLight = () => {

  useEffect(() => {

    window.addEventListener("mousemove", (e) => {
      setTimeout(() => {
        document.querySelector("#mouseLight").style.left = `${e.pageX}px`
        document.querySelector("#mouseLight").style.top = `${e.pageY}px`
      }, 75)
    })

  },[])
  
  return(
    <div id="mouseLight" className="mouseLight"></div>
  )
}
export default MouseLight;