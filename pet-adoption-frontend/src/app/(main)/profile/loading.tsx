export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-md flex items-center justify-center">
        <span className="loading loading-infinity loading-lg size-20"></span>
        </div>
    );
};
  
  