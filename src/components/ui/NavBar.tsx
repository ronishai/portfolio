const navLinkStyle =
  'text-pink-200 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)] hover:text-pink-100 hover:drop-shadow-[0_0_12px_rgba(244,114,182,1)] transition-all duration-300';

const NavBar = () => {
  return (
    <nav className="bg-linear-to-b from-black to-transparent fixed top-0 w-full z-50 py-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center space-x-6 sm:space-x-8">
          <a href="#about" className={navLinkStyle}>
            About
          </a>
          <a href="#projects" className={navLinkStyle}>
            Projects
          </a>
          <a href="#experience" className={navLinkStyle}>
            Experience
          </a>
          <a href="#skills" className={navLinkStyle}>
            Skills
          </a>
          <a href="#contact" className={navLinkStyle}>
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
