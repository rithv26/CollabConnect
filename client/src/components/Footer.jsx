import React from "react";

const Footer = () => {
  return (
<footer className="footer footer-center bg-gray-950 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by Collab Connect</p>
  </aside>
</footer>
  );
};

export default Footer;
