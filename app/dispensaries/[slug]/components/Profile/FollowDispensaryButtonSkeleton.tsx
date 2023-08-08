import { AiOutlineBell } from 'react-icons/ai';
import React from 'react';

const FollowDispensaryButtonSkeleton = () => {
  return (
    <button
      className={`absolute top-3 right-4 rounded-full text-sm p-1.5 border border-zinc-400 text-zinc-400`}
    >
      <div>
        <AiOutlineBell size={18} />
      </div>
    </button>
  );
};

export default FollowDispensaryButtonSkeleton;
