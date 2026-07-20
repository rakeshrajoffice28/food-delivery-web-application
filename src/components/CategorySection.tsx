import '../styles/category.css';

interface CategoryItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface CategorySectionProps {
  categories: CategoryItem[];
}

const CategorySection = ({ categories }: CategorySectionProps) => {
  return (
    <section id="categories" className="section-block">
      <div className="section-block__header">
        <div>
          <p className="section-block__eyebrow">Curated Collections</p>
          <h2>Browse by category</h2>
        </div>
        <a href="#products" className="section-link">
          Explore all
        </a>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <article key={category.id} className="category-card">
            <img src={category.image} alt={category.title} />
            <div className="category-card__content">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
