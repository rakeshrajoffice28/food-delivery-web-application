import '../styles/offer.css';

const OfferBanner = () => {
  return (
    <section id="offers" className="offer-banner">
      <div className="offer-banner__content">
        <p className="section-block__eyebrow">Exclusive Event</p>
        <h2>Save up to 35% on premium smart devices.</h2>
        <p>Discover limited-time deals on flagship phones, smart wearables, and immersive audio.</p>
        <a href="#products" className="btn btn--primary">
          Claim Offer
        </a>
      </div>
      <div className="offer-banner__visual">
        <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80" alt="Premium mobile device" />
      </div>
    </section>
  );
};

export default OfferBanner;
