import { BsClipboardDataFill } from 'react-icons/bs';

const LikedStrainsSkeleton = () => (
  <>
    <div className="flex flex-row items-center gap-8 text-xl font-bold">
      <p>Liked Strains ( )</p>
      <BsClipboardDataFill size={20} className="inline-block mr-12" />
    </div>
    <div className="flex flex-row flex-wrap items-center justify-center mt-3 md:justify-start gap-y-3">
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: '90px', maxWidth: '90px' }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: '90px', maxWidth: '90px' }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: '90px', maxWidth: '90px' }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: '90px', maxWidth: '90px' }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: '90px', maxWidth: '90px' }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
      <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
        <div
          style={{ maxHeight: '90px', maxWidth: '90px' }}
          className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
        <h1 className="text-sm text-semi">
          <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h1>
      </div>
    </div>
  </>
);

export default LikedStrainsSkeleton;
