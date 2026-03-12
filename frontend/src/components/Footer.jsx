import { Github } from "lucide-react";
import "./layout.css";

function Footer() {

  const year = new Date().getFullYear();

  return (

    <footer className="footer">

      <div className="footer-divider"></div>

      <div className="footer-content">

        <Github size={16} />

        <span>
          © {year} 
          <a
            href="https://github.com/DinukaEk"
            target="_blank"
            rel="noopener noreferrer"
          >
            DinukaEk
          </a>
        </span>

      </div>

    </footer>

  );

}

export default Footer;