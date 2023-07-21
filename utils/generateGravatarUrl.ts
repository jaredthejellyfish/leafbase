import md5 from 'md5';
import { User } from '@prisma/client';

const generateGravatarUrl = (user: User): string => {
  if (user?.image) return user.image;
  return `https://www.gravatar.com/avatar/${md5(
    user?.displayName || user?.name || 'NaN'
  )}?d=identicon`;
};

export default generateGravatarUrl;
