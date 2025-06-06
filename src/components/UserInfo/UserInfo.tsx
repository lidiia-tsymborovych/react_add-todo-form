import { Component } from 'react';
import { User } from '../../entities/User';

type UserInfoProps = {
  user: User;
};

export class UserInfo extends Component<UserInfoProps> {
  render() {
    const { user } = this.props;

    if (!user) {
      return false;
    }

    return (
      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.username}
      </a>
    );
  }
}
