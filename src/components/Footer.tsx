import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <a href="#" className="navbar__brand">
            <span className="navbar__brand-mark">M</span>
            <span>Monarch Mobile</span>
          </a>
          <p className="footer__text">
            Premium devices, refined design, and curated tech essentials for modern living.
          </p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#products">Products</a></li>
            <li><a href="#brands">Brands</a></li>
            <li><a href="#offers">Offers</a></li>
          </ul>
        </div>
        <div>
          <h3>Categories</h3>
          <ul>
            <li><a href="#categories">Smartphones</a></li>
            <li><a href="#categories">Laptops</a></li>
            <li><a href="#categories">Accessories</a></li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li>hello@monarchmobile.com</li>
            <li>+1 (800) 555-0148</li>
            <li>24/7 Client Care</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2026 Monarch Mobile. Crafted for modern elegance.</p>
        <div className="footer__socials">
          <a href="#">Instagram</a>
          <a href="#">X</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
