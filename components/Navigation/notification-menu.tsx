'use client';

import { formatDistanceToNow, parseJSON } from 'date-fns';
import { Archive, Bell, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BsGear } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';

import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
} from '../ui/dropdown-menu';
import { archiveNotification } from '@/lib/actions/notification/archive';
import { deleteNotification } from '@/lib/actions/notification/delete';
import type { Notification } from '@/lib/database/database_types';
import { supabase } from '@/lib/database/supabase_client';
import { Separator } from '@/components/ui/separator';
import defaultPfp from '@/public/default.webp';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type Props = {
  pendingNotifications: Notification[] | null;
  archivedNotifications?: Notification[] | null;
  id: string;
};

function NotifcationMenu({
  pendingNotifications,
  archivedNotifications,
  id,
}: Props) {
  const [notifications, setNotifications] = useState(
    pendingNotifications || []
  );
  const [archived, setArchived] = useState(archivedNotifications || []);
  const [tab, setTab] = useState('inbox');

  useEffect(() => {
    const channel = supabase
      .channel('realtime notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          const notification = payload.new as Notification;
          if (notification.recipient !== id) return;
          setNotifications((notifications) => [...notifications, notification]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  async function handleArchive(id: string) {
    const result = await archiveNotification(id);

    if (result.error) {
      return;
    }

    const notification = notifications.filter((n) => n.id === id)[0];
    setNotifications(notifications.filter((n) => n.id !== id));
    setArchived([notification, ...archived]);
  }

  async function handleDelete(id: string) {
    const result = await deleteNotification(id);

    if (result.error) {
      return;
    }

    setArchived(archived.filter((n) => n.id !== id));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          id="theme-toggle"
          className="h-[1.4rem] w-[1.4rem] border-transparent bg-transparent hover:bg-gray-300 dark:hover:bg-zinc-700 sm:h-[1.6rem] sm:w-[1.6rem]"
        >
          <div className="relative">
            {notifications.length > 0 && (
              <div className="absolute -top-0.5 right-0 z-10 h-2 w-2 animate-pulse rounded-full bg-red-500" />
            )}
            <Bell className="z-0 h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 sm:h-[1.3rem] sm:w-[1.3rem]" />
          </div>
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        id="notification-toggle-content"
        className="mr-5 w-[380px]"
      >
        <div className="h-10 flex-row items-center justify-between px-3">
          <div className="flex flex-row ">
            <button
              onClick={() => setTab('inbox')}
              className={cn(
                'border py-2 border-transparent px-2',
                tab === 'inbox' && 'border-b-white'
              )}
            >
              Inbox
              {notifications.length > 0 && (
                <span className="ml-1 text-sm text-zinc-400">
                  ({notifications.length})
                </span>
              )}
            </button>
            <button
              onClick={() => setTab('archived')}
              className={cn(
                'border py-2 border-transparent px-2 ml-2',
                tab === 'archived' && 'border-b-white'
              )}
            >
              Archived
              {archived.length > 0 && (
                <span className="ml-1 text-sm text-zinc-400">
                  ({archived.length})
                </span>
              )}
            </button>
            <Link
              href="/profile/edit"
              className="ml-auto flex items-center justify-center"
            >
              <BsGear className="h-4 w-4 text-zinc-400" />
            </Link>
          </div>
        </div>
        <div className="max-h-[350px] overflow-y-scroll">
          <Separator />
          {tab === 'inbox' &&
            notifications &&
            notifications.length > 0 &&
            notifications.map((notification, index) => {
              return (
                <div
                  className={cn(
                    'border-b-zinc-600 flex flex-row items-center justify-start px-4 py-1.5',
                    index !== notifications.length - 1 && 'border-b'
                  )}
                  key={notification.id}
                >
                  <div className="flex w-full flex-row items-center">
                    <Image
                      src={notification.image || defaultPfp}
                      alt="pfp"
                      className="my-2 rounded-full"
                      width={46}
                      height={46}
                    />
                    <div className="ml-4 flex flex-col">
                      <span className="w-4/5 text-sm">
                        {notification.content}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {formatDistanceToNow(
                          parseJSON(notification.created_at),
                          {
                            includeSeconds: true,
                            addSuffix: true,
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <button
                    className="text-zinc-400 transition-colors hover:text-white"
                    onClick={() => handleArchive(notification.id)}
                  >
                    <Archive className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
          {tab === 'inbox' && (!notifications || notifications.length < 1) ? (
            <div className="flex w-full flex-row items-center justify-center py-5">
              <span className="text-sm font-semibold">
                No new notifications.
              </span>
            </div>
          ) : null}

          {tab === 'archived' &&
            archived &&
            archived.length > 0 &&
            archived.map((notification, index) => {
              return (
                <div
                  className={cn(
                    'border-b-zinc-600 flex flex-row items-center justify-start px-4 py-1.5',
                    index !== archived.length - 1 && 'border-b'
                  )}
                  key={notification.id}
                >
                  <div className="flex w-full flex-row items-center">
                    <Image
                      src={notification?.image || defaultPfp}
                      alt="pfp"
                      className="my-2 rounded-full"
                      width={46}
                      height={46}
                    />
                    <div className="ml-4 flex flex-col">
                      <span className="w-4/5 text-sm">
                        {notification.content}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {formatDistanceToNow(
                          parseJSON(notification.created_at),
                          {
                            includeSeconds: true,
                            addSuffix: true,
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <button
                    className="text-zinc-400 transition-colors hover:text-white"
                    onClick={() => handleDelete(notification.id)}
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
          {tab === 'archived' && (!archived || archived.length < 1) ? (
            <div className="flex w-full flex-row items-center justify-center py-5">
              <span className="text-sm font-semibold">
                No archived notifications.
              </span>
            </div>
          ) : null}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotifcationMenu;
