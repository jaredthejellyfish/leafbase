const ProfileCommentsError = () => (
  <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
    <h1 className="text-xl font-bold">Comments</h1>
    <div className="flex flex-col gap-2 mt-2">
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="text-base font-semibold ">
          Oops! Something went wrong.
        </h2>
        <p className="text-zinc-400">
          We&apos;re having trouble loading this comment. Our team of highly
          trained monkeys has been dispatched to fix this issue.
        </p>
      </div>
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="text-base font-semibold">Yikes! We hit a snag.</h2>
        <p className="text-zinc-400">
          This comment is playing hide and seek with us. We&apos;re still
          seeking. Please check back later.
        </p>
      </div>
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="text-base font-semibold">Uh-oh! We dropped the ball.</h2>
        <p className="text-zinc-400">
          This comment is currently unavailable. We&apos;re on it and will have
          it back as soon as possible.
        </p>
      </div>
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="text-base font-semibold">Whoops! We slipped up.</h2>
        <p className="text-zinc-400">
          We can&apos;t load the comment right now. We&apos;re tying our
          shoelaces and will be right back.
        </p>
      </div>
    </div>
  </div>
);

export default ProfileCommentsError;
