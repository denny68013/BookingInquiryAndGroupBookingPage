import { useLocation } from 'react-router-dom/cjs/react-router-dom'

const Footer = ({link1, link2, link3, link4, link5, linkHref1, linkHref2, linkHref3, linkHref4, linkHref5}) => {

  let { pathname } = useLocation();

  let imageBasePath =
  window.location.protocol + "//" + window.location.host + "/images/";

  return (
    <footer style={{ background: pathname === '/' ? 'transparent' : '#000' }}>
      <div className="container">
        <div className="topBlock">

          <div className="logoBlock">
            <a href="/">
           
              <img className="logoImg" src="/images/logo-small.png" alt="" />
             
              <span className="logoText">AquaR</span>
            </a>
            <p>408台中市南屯區黎明路二段658號, 1</p>
          </div>

          <div className="communityBlcok">
            <p>Community</p>
            <div className="communityGroup">
              <a href="/">
                <img src="https://img.icons8.com/ios-filled/30/FFFFFF/twitter.png" alt="" />
              </a>
              <a href="/">
                <img src="https://img.icons8.com/ios-filled/30/FFFFFF/facebook-new--v1.png" alt="" />
              </a>
              <a href="/">
                <img src="https://img.icons8.com/ios-filled/30/FFFFFF/instagram-new--v1.png" alt="" />
              </a>
            </div>
          </div>

          <div className="pagesBlock">
            <p>Pages</p>
            <div className="pagesGroup">
              <a href={linkHref1}>{link1}</a>
              <a href={linkHref2}>{link2}</a>
              <a href={linkHref3}>{link3}</a>
              <a href={linkHref4}>{link4}</a>
              <a href={linkHref5}>{link5}</a>
            </div>
          </div>
        </div>


        <div className="botBlock">
          <p>408台中市南屯區黎明路二段658號, 1</p>
        </div>


      </div>
    </footer>
  )
}

export default Footer;
