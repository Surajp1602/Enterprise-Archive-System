import {
  FaDatabase,
  FaFolderOpen
} from "react-icons/fa";

function Navbar() {

  return (
    <nav className="navbar">

      <div className="logo">

        <FaDatabase />

        <span>
          Enterprise Archive System
        </span>

      </div>

    </nav>
  );
}

export default Navbar;