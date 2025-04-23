const Skeleton = ({ width, height, className = "" }: { width: string; height: string; className?: string }) => {
    return (
      <div
        className={`animate-pulse bg-gray-300 rounded ${className}`}
        style={{ width, height }}
      />
    );
  };
  
  export default Skeleton;
  