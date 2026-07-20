import { useEffect, useState } from 'react';
import { heroSlides } from '../data/mockData';
import '../styles/hero.css';

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="hero">
      <div className="hero__overlay"></div>
      <img src={currentSlide.image} alt={currentSlide.title} className="hero__image" />
      <div className="hero__content">
        <p className="hero__eyebrow">Luxury Tech • Curated For You</p>
        <h1>{currentSlide.title}</h1>
        <p className="hero__description">{currentSlide.subtitle}</p>
        <div className="hero__actions">
          <a href="#products" className="btn btn--primary">
            {currentSlide.cta}
          </a>
          <a href="#offers" className="btn btn--secondary">
            View Offers
          </a>
        </div>
        <div className="hero__dots" aria-label="Slide navigation">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero__dot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
