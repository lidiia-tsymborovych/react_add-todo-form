import './UserInfo.scss';

import { User } from '../../entities/User';

type UserInfoProps = {
  user: User | null;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
