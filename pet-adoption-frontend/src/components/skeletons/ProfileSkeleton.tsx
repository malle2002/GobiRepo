const ProfileSkeleton = ({ className } : { className:string }) => (
  <div aria-live="polite" aria-busy="true" className={className + " space-y-3"}>
    <span className="w-24 h-24 rounded-full mb-4 flex mx-auto animate-pulse select-none bg-gray-300 bg-opacity-60 leading-none">
      ‌
    </span>
    <span className="block w-96 animate-pulse select-none rounded-md bg-gray-300 bg-opacity-60 leading-none h-8">
      ‌
    </span>
    <span className="block w-96 animate-pulse select-none rounded-md bg-gray-300 bg-opacity-60 leading-none h-8">
      ‌
    </span>
    <span className="block w-96 animate-pulse select-none rounded-md bg-gray-300 bg-opacity-60 leading-none h-12">
      ‌
    </span>
    <span className="inline-flex w-40 animate-pulse select-none rounded-md bg-gray-300 bg-opacity-60 leading-none h-12">
      ‌
    </span>
    <br />
  </div>
)
  
const SVGProfileSkeleton = ({ className } : { className: string }) => (
  <svg
    className={
      className + " animate-pulse rounded bg-gray-300"
    }
  />
)

const ProfilePetsSkeleton = ({ className } : { className: string }) => (
  <div className="mt-5 space-y-3">
    <svg 
      className={
        className + " animate-pulse rounded bg-gray-300 flex h-10 w-24"
      }
    />
    <div className="flex flex-row justify-between">
      <svg 
        className={
          className + " animate-pulse rounded bg-gray-300 flex h-16 w-52"
        }
      />
      <svg 
        className={
          className + " animate-pulse rounded bg-gray-300 flex h-16 w-52"
        }
      />
      <svg 
        className={
          className + " animate-pulse rounded bg-gray-300 flex h-16 w-52"
        }
      />
    </div>
    
    <svg 
      className={
        className + " animate-pulse rounded bg-gray-300 flex mx-auto h-12"
      }
    />
  </div>
  
)
  
export { ProfileSkeleton, SVGProfileSkeleton, ProfilePetsSkeleton }