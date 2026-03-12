import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import "./layout.css";

function Topbar() {

  const email = localStorage.getItem("email");

  const [dark,setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(()=>{

    if(dark){
      document.body.classList.add("dark");
      localStorage.setItem("theme","dark");
    }else{
      document.body.classList.remove("dark");
      localStorage.setItem("theme","light");
    }

  },[dark]);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/";
  };

  return (

    <div className="topbar">

      <div className="topbar-title">
        CRM Dashboard
      </div>

      <div className="topbar-actions">

        <button
          className="theme-toggle"
          onClick={()=>setDark(!dark)}
        >
          {dark ? <Sun size={18}/> : <Moon size={18}/>}
        </button>

        <span className="user-email">
          {email}
        </span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Topbar;