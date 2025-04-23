import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-md flex items-center justify-center">
      <span className="loading loading-infinity loading-lg size-20"></span>
    </div>
  );
};

export default PageLoader;
