import '../styles/brand.css';
import { brands } from '../data/mockData';

const BrandSection = () => {
  return (
    <section id="brands" className="brand-section">
      <div className="section-block__header">
        <div>
          <p className="section-block__eyebrow">Premium Partners</p>
          <h2>Trusted by modern tech lovers</h2>
        </div>
      </div>
      <div className="brand-grid">
        {brands.map((brand) => (
          <div key={brand} className="brand-pill">
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
