import { IAuthenticator, Service } from '@foal/core';

import { User } from '../entities';

@Service()
export class TestFooBar implements IAuthenticator<User> {

  authenticate(credentials): User | null | Promise<User | null> {
    return null;
  }

}
