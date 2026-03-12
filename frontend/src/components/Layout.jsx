import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import "./layout.css";

function Layout({ children }) {

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <div className="main-area">

        <Topbar />

        <div className="content-area">

          {children}

          <Footer />

        </div>

      </div>

    </div>

  );

}

export default Layout;