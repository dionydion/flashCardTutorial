import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div>
          <a href="/">LOGO</a>
        </div>
        <div>
          <a href="/">Decks</a>
        </div>
        <div>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
