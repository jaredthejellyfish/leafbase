import Image from 'next/image';

type Props = {
  friend: {
    to: { id: string; username: string; name: string; image: string };
    from: { id: string; username: string; name: string; image: string };
  };
  status: string;
  useTo?: boolean;
};

function Friend({ friend: { to, from }, status, useTo }: Props) {
  const user = useTo ? to : from;

  return (
    <a
      href={`/profile/${user.username}`}
      id={`friendship-${user.id}`}
      className="flex flex-row items-center justify-between rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-1.5 dark:border-zinc-700 dark:bg-zinc-800"
    >
      <div className="flex h-12 flex-row items-center justify-start gap-x-3  sm:gap-x-4 ">
        <Image
          src={user.image}
          alt={user.name}
          width={50}
          height={50}
          className="aspect-square size-11 rounded-full sm:size-12"
        />
        <div className="flex flex-col gap-0">
          <span className="-mb-1.5 text-sm font-semibold sm:text-base">
            {user.name}
          </span>
          <span className="mt-1 text-xs text-green-700 sm:mt-0.5 sm:text-sm">
            @{user.username}
          </span>
        </div>
      </div>
      {status === 'pending' && (
        <div className="cursor-not-allowed rounded border border-zinc-400 px-2 py-1 text-xs text-zinc-400">
          Pending
        </div>
      )}
      {/* ?from=${from.id}&to=${to.id} */}
      {status === 'toAccept' && (
        <div
          className="flex flex-row gap-x-2 sm:gap-x-1"
          id={`friendship-status-${user.id}`}
        >
          <button
            className="mr-1 block rounded-md border border-zinc-500 bg-transparent px-2 text-xs text-zinc-700 transition-colors hover:bg-zinc-700 hover:text-white dark:text-zinc-300 hover:dark:bg-zinc-300/80 hover:dark:text-zinc-800 sm:hidden xl:block"
            hx-post={`/api/friends/deny`}
            hx-vals={`{"from": "${from.id}", "to": "${to.id}"}`}
            hx-target={`#friendship-${user.id}`}
            hx-swap="delete"
          >
            Deny
          </button>
          <button
            className="rounded-md bg-green-700 px-2 py-1 text-xs text-white transition-colors hover:bg-green-800"
            hx-post={`/api/friends/accept`}
            hx-vals={`{"from": "${from.id}", "to": "${to.id}"}`}
            hx-target={`#friendship-status-${user.id}`}
            hx-swap="outerHTML"
          >
            Accept
          </button>
        </div>
      )}

      {status === 'accepted' && (
        <svg
          className="justify-self-end"
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 15 15"
          height="35px"
          width="35px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
            fill="currentColor"
          ></path>
        </svg>
      )}
    </a>
  );
}

export default Friend;
