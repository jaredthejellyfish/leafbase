import { User } from '@prisma/client';
import md5 from 'md5';

const generateGravatarUrl = (user: User): string => {
  if (user?.image) return user.image;
  return `https://www.gravatar.com/avatar/${md5(
    user?.displayName || user?.name || 'NaN'
  )}?d=identicon`;
};

export default generateGravatarUrl;
