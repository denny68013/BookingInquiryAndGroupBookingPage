import { sidebarHandler } from "../Animation";

const Sidebar = () => {

  function headingBlockHandler (e)  {
    let allHeading = document.querySelectorAll(".headingBlock");

    allHeading.forEach((e2) => {
      if (e2 !== e.currentTarget && e2.classList.contains("headingBlock-toggle")){
        e2.classList.remove("headingBlock-toggle")
      }
    });

    e.currentTarget.classList.toggle("headingBlock-toggle");

  }






  return (
  <div className="sidebarHide">
    <div id="sidebarMask" className="sidebar-mask" onClick={ sidebarHandler }></div>

    <div id="sidebar" className="sidebar">
      <a href="/" className="side-item side-item-1">
        <span className="m-0">營業時間</span>
        <span className="material-symbols-outlined">schedule</span>
      </a>
      <a href="/" className="side-item side-item-2">
        <span className="m-0">預約訂票</span>
        <span className="material-symbols-outlined">confirmation_number</span>
      </a>

      <div className="topBlock">Menu</div>

      <div className="midBlock">

        <div className="headingBlock" onClick={ headingBlockHandler }>
          <span className="heading">票券服務
            <div className="decorLine"></div>
          </span>
          <ul>
            <li><a href="/">預約訂票</a></li>
            <li><a href="/">訂票紀錄</a></li>
          </ul>
        </div>

        <div className="headingBlock" onClick={ headingBlockHandler }>
          <span className="heading">館內資訊
            <div className="decorLine"></div>
          </span>
          <ul>
            <li><a href="/">最新消息</a></li>
            <li><a href="/">館場導覽</a></li>
            <li><a href="/">館內活動</a></li>
            <li><a href="/">明星動物</a></li>
          </ul>
        </div>

        <div className="headingBlock" onClick={ headingBlockHandler }>
          <span className="heading">參觀指南
            <div className="decorLine"></div>
          </span>
          <ul>
            <li><a href="/">營業時間</a></li>
            <li><a href="/">參觀須知</a></li>
            <li><a href="/">交通資訊</a></li>
          </ul>
        </div>

        <div className="headingBlock" onClick={ headingBlockHandler }>
          <span className="heading">關於我們
            <div className="decorLine"></div>
          </span>
          <ul>
            <li><a href="/">關於我們</a></li>
            <li><a href="/">聯絡我們</a></li>
          </ul>
        </div>

        <div className="headingBlock">
          <a href="/" className="heading">常見問答
            <div className="decorLine"></div>
          </a>
        </div>

      </div>
      <div className="botBlock">AquaR</div>
    </div>
    
  </div>
  )
}

export default Sidebar;