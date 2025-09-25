// nextjs/src/app/components/ui/Skeleton.jsx
'use client';

const Skeleton = () => {
  return (
    <div className="skeleton-container">
      {/* Breadcrumbs Skeleton */}
      <div className="skeleton-card" style={{marginBottom: '1rem', padding: '1rem'}}>
        <div className="skeleton-line short" style={{width: '200px', height: '16px'}}></div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-header">
          <div className="skeleton-avatar" style={{width: '100px', height: '100px'}}></div>
          <div className="skeleton-title" style={{flex: 1}}>
            <div className="skeleton-line" style={{height: '32px', marginBottom: '1rem'}}></div>
            <div className="skeleton-line medium" style={{height: '24px', marginBottom: '0.5rem'}}></div>
            <div className="skeleton-line short" style={{height: '20px', width: '70%'}}></div>
          </div>
        </div>
        <div style={{display: 'flex', gap: '1rem', marginTop: '2rem'}}>
          <div className="skeleton-button" style={{width: '160px', height: '48px'}}></div>
          <div className="skeleton-button" style={{width: '160px', height: '48px'}}></div>
        </div>
      </div>

      {/* About Section Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-line short" style={{width: '40%', height: '28px', marginBottom: '2rem'}}></div>
        <div className="skeleton-grid">
          <div className="skeleton-grid-item">
            <div className="skeleton-image" style={{height: '300px'}}></div>
          </div>
          <div className="skeleton-grid-item">
            <div className="skeleton-line" style={{height: '24px', marginBottom: '1rem'}}></div>
            <div className="skeleton-line" style={{height: '20px', marginBottom: '0.5rem'}}></div>
            <div className="skeleton-line" style={{height: '20px', marginBottom: '0.5rem'}}></div>
            <div className="skeleton-line medium" style={{height: '20px', marginBottom: '0.5rem'}}></div>
            <div className="skeleton-line short" style={{height: '20px', width: '60%'}}></div>
          </div>
        </div>
      </div>

      {/* Services Grid Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-line short" style={{width: '35%', height: '28px', marginBottom: '2rem'}}></div>
        <div className="skeleton-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton-grid-item">
              <div className="skeleton-image" style={{height: '200px'}}></div>
              <div className="skeleton-line short" style={{height: '22px', marginTop: '1rem'}}></div>
              <div className="skeleton-line" style={{height: '18px', marginTop: '0.5rem'}}></div>
              <div className="skeleton-line medium" style={{height: '18px', marginTop: '0.5rem'}}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Cases Slider Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-line short" style={{width: '30%', height: '28px', marginBottom: '2rem'}}></div>
        <div className="skeleton-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="skeleton-grid-item">
              <div className="skeleton-image" style={{height: '250px'}}></div>
              <div className="skeleton-line" style={{height: '20px', marginTop: '1rem'}}></div>
              <div className="skeleton-line short" style={{height: '18px', marginTop: '0.5rem'}}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Careers Section Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-line short" style={{width: '25%', height: '28px', marginBottom: '2rem'}}></div>
        <div className="skeleton-list">
          {[1, 2, 3].map((item) => (
            <div key={item} className="skeleton-list-item">
              <div className="skeleton-icon"></div>
              <div style={{flex: 1}}>
                <div className="skeleton-line short" style={{height: '20px', marginBottom: '0.5rem'}}></div>
                <div className="skeleton-line medium" style={{height: '18px'}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Licenses Section Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-line short" style={{width: '20%', height: '28px', marginBottom: '2rem'}}></div>
        <div style={{display: 'flex', gap: '1rem', overflow: 'hidden'}}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton-image" style={{minWidth: '200px', height: '150px'}}></div>
          ))}
        </div>
      </div>

      {/* Partners Section Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-line short" style={{width: '15%', height: '28px', marginBottom: '2rem'}}></div>
        <div className="skeleton-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem'}}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="skeleton-grid-item" style={{padding: '1rem'}}>
              <div className="skeleton-image" style={{height: '80px'}}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Support Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-line short" style={{width: '40%', height: '28px', marginBottom: '2rem'}}></div>
        <div className="skeleton-grid">
          <div className="skeleton-grid-item">
            <div className="skeleton-image" style={{height: '300px'}}></div>
          </div>
          <div className="skeleton-grid-item">
            <div className="skeleton-line" style={{height: '24px', marginBottom: '1rem'}}></div>
            <div className="skeleton-line" style={{height: '20px', marginBottom: '0.5rem'}}></div>
            <div className="skeleton-line medium" style={{height: '20px', marginBottom: '0.5rem'}}></div>
            <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
              <div className="skeleton-button" style={{width: '140px', height: '40px'}}></div>
              <div className="skeleton-button" style={{width: '140px', height: '40px'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-line short" style={{width: '35%', height: '28px', marginBottom: '2rem'}}></div>
        <div className="skeleton-grid">
          <div className="skeleton-grid-item">
            <div className="skeleton-line" style={{height: '20px', marginBottom: '1rem'}}></div>
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="skeleton-line" style={{height: '40px', marginBottom: '1rem'}}></div>
            ))}
            <div className="skeleton-button" style={{width: '160px', height: '48px', marginTop: '1rem'}}></div>
          </div>
          <div className="skeleton-grid-item">
            <div className="skeleton-image" style={{height: '400px'}}></div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="skeleton-progress">
        <div className="skeleton-progress-bar">
          <div className="skeleton-progress-fill"></div>
        </div>
        <div className="skeleton-progress-text">Загрузка...</div>
      </div>
    </div>
  );
};

export default Skeleton;