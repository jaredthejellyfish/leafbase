import { StrainExtended } from "@/types/interfaces";

const CommentLoaderFallback = ({ strain }: { strain: StrainExtended }) => {
  return (
    <div className="flex flex-col items-start w-full gap-3">
      <h1 className="flex flex-row items-center mt-6 text-2xl font-bold">
        Comments for {strain.name}:
      </h1>
      <p>
        There was an error loading the comments. Please reload the page to try
        again.
      </p>
    </div>
  );
};

export default CommentLoaderFallback;
