import { UserDomain } from '../../user';

export class GoogleLoginServiceInput {
  constructor(
    public readonly googleId: string,
    public readonly email: string,
  ) {}
}

export interface IGoogleLoginService {
  execute(
    dto: GoogleLoginServiceInput,
  ): Promise<UserDomain & { isNewUser: boolean }>;
}
