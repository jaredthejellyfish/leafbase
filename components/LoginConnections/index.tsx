import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { MdError } from 'react-icons/md';

import { cn } from '@/lib/utils';

import discordLogo from '@/public/svg/discord-logo.svg';
import githubLogo from '@/public/svg/github-logo.svg';
import googleLogo from '@/public/svg/google-logo.svg';
import twitchLogo from '@/public/svg/twitch-logo.svg';

import React from 'react';

const fetchData = async () => {
  const data = await fetch('/api/login-connect');
  const { connections } = (await data.json()) as { connections: string[] };
  return connections;
};

type Connection = {
  name: string;
  id: string;
  bg: string;
  icon: React.ReactNode;
};

const connectionLabels = [
  {
    name: 'Github',
    id: 'github',
    bg: 'bg-github',
    icon: <Image src={githubLogo} alt="Github Logo" width={20} height={20} />,
  },
  {
    name: 'Google',
    id: 'google',
    bg: 'bg-google',
    icon: (
      <Image
        src={googleLogo}
        alt="Google Logo"
        width={24}
        height={24}
        className="invert"
      />
    ),
  },
  {
    name: 'Discord',
    id: 'discord',
    bg: 'bg-discord',
    icon: (
      <Image
        src={discordLogo}
        alt="Discord Logo"
        width={24}
        height={24}
        className="invert"
      />
    ),
  },
  {
    name: 'Twitch',
    id: 'twitch',
    bg: 'bg-twitch',
    icon: (
      <Image
        src={twitchLogo}
        alt="Twitch Logo"
        width={24}
        height={24}
        className="invert"
      />
    ),
  },
];

function ConnectionLabel({ connection }: { connection: Connection }) {
  return (
    <div
      className={cn(
        'flex max-w-max flex-row items-center justify-center rounded bg-zinc-600 px-2 py-1.5',
        connection.bg || '',
      )}
    >
      <div className="mr-2 flex size-[24px] items-center justify-center text-black">
        {connection.icon}
      </div>
      <span className="mr-2 text-sm font-medium text-white">
        {connection.name}
      </span>
    </div>
  );
}

export default function LoginConnections({
  providers,
}: {
  providers: string[];
}) {
  const { data: connections, error: connectionsError } = useQuery({
    queryKey: ['login-connections'],
    queryFn: fetchData,
    initialData: providers,
  });

  if (connectionsError) {
    return (
      <div className="relative flex w-full flex-col rounded-xl px-7 py-3 pb-4 shadow-md dark:bg-zinc-900">
        <h3 className="text-xl font-bold">Login Conenctions</h3>
        <div className="mt-1.5 flex flex-row items-center gap-x-2.5">
          <div className="size-10">
            <MdError className="size-full text-green-700" />
          </div>
          <span className="leading-tight">
            There was an error fetching the login connections.
          </span>
        </div>
      </div>
    );
  }

  const foundConnections = connections
    ? connectionLabels.filter((connection) =>
        connections.includes(connection.id),
      )
    : [];

  const existingConnections = foundConnections.map((connection) => ({
    ...connection,
  }));

  const emailConnection = existingConnections.find(
    (connection) => connection.id === 'email',
  );

  if (emailConnection) {
    existingConnections.splice(existingConnections.indexOf(emailConnection), 1);
  }

  if (existingConnections && existingConnections.length === 0) {
    return null;
  }

  return (
    <div className="relative flex w-full flex-col rounded-xl px-7 py-3 pb-4 shadow-md dark:bg-zinc-900">
      <h3 className="text-xl font-bold">Login Conenctions</h3>
      <div className="mt-2 flex flex-row flex-wrap gap-x-2.5 gap-y-2">
        {existingConnections.map((connection) => (
          <ConnectionLabel connection={connection} key={connection.id} />
        ))}
      </div>
    </div>
  );
}
