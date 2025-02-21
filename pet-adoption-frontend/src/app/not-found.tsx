export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <h1 className="text-5xl font-bold text-error">404</h1>
        <p className="mt-2 text-xl">Sorry, we couldn't find the page you're looking for.</p>
        <a href="/" className="mt-4 btn btn-primary">
          Go Home
        </a>
      </div>
    );
  }
  