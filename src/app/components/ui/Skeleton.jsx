// nextjs/src/app/components/ui/Skeleton.jsx
'use client';

const Skeleton = () => {
  return (
    <div className="skeleton-container">
      {/* Hero Section Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-header">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-title">
            <div className="skeleton-line short"></div>
            <div className="skeleton-line medium"></div>
          </div>
        </div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-button"></div>
      </div>

      {/* Services Grid Skeleton */}
      <div className="skeleton-grid">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="skeleton-grid-item">
            <div className="skeleton-image"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line medium"></div>
          </div>
        ))}
      </div>

      {/* Cases Slider Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-line short" style={{width: '40%'}}></div>
        <div className="skeleton-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="skeleton-grid-item">
              <div className="skeleton-image"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-line short" style={{width: '30%'}}></div>
        <div className="skeleton-list">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="skeleton-list-item">
              <div className="skeleton-icon"></div>
              <div style={{flex: 1}}>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line medium"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Skeleton */}
      <div className="skeleton-grid">
        <div className="skeleton-grid-item">
          <div className="skeleton-line short"></div>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton-line" style={{marginBottom: '0.5rem'}}></div>
          ))}
          <div className="skeleton-button"></div>
        </div>
        <div className="skeleton-grid-item">
          <div className="skeleton-image"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;