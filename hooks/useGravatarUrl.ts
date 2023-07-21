import { User } from '@prisma/client';
import md5 from 'md5';

type Props = {
  user: User;
};

export default async function useGravatarUrl(props: Props) {
  const { user } = props;

  if (user?.image) return user.image;

  return `https://www.gravatar.com/avatar/${md5(
    user?.displayName || user?.name || 'NaN'
  )}?d=identicon`;
}
