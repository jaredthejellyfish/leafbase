import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsClipboardDataFill } from 'react-icons/bs';

const LikedStrainsError = () => {
  return (
    <div>
      <div className="flex flex-row items-center gap-8 text-xl font-bold">
        <p>Liked Strains ( )</p>
        <BsClipboardDataFill size={20} className="inline-block mr-12" />
      </div>
      <div className="flex flex-col items-start justify-center mt-10">
        <div className="flex flex-row items-center justify-center">
          <AiOutlineExclamationCircle size={50} className="text-green-700" />
          <h2 className="ml-4 text-2xl font-bold text-green-700">
            Error loading strains
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LikedStrainsError;
