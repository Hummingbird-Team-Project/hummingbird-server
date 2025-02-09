import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import {
  IGoogleLoginService,
  IJwtTokenProvider,
  IRefreshTokenProvider,
} from '../../../../core/auth';
import { tokenEnv } from '../../../app-config/envs';
import { Public } from '../../../shared/decorators';
import { JwtTokenProvider, RefreshTokenProvider } from '../../providers';
import { GoogleLoginService } from '../../services';
import { IGoogleLoginReqDto } from './i-google-login.req.dto';
import { IGoogleLoginResDto } from './i-google-login.res.dto';

@Controller()
export class GoogleLoginController {
  constructor(
    @Inject(tokenEnv.KEY)
    private readonly tokenConfig: ConfigType<typeof tokenEnv>,
    @Inject(GoogleLoginService)
    private readonly googleLoginService: IGoogleLoginService,
    @Inject(JwtTokenProvider)
    private readonly jwtTokenProvider: IJwtTokenProvider,
    @Inject(RefreshTokenProvider)
    private readonly refreshTokenProvider: IRefreshTokenProvider,
  ) {}

  @Public()
  @TypedRoute.Post('/google')
  public async execute(
    @TypedBody() body: IGoogleLoginReqDto,
  ): Promise<IGoogleLoginResDto> {
    const loginResult = await this.googleLoginService.execute(body);

    const expiresAt =
      Math.floor(Date.now() / 1000) + this.tokenConfig.jwtExpiresInSeconds;

    const accessToken = await this.jwtTokenProvider.sign({
      userId: loginResult.userId,
    });

    const refreshToken = await this.refreshTokenProvider.generate(
      loginResult.userId,
    );

    return {
      accessToken,
      refreshToken,
      expiresAt,
      isNewUser: loginResult.isNewUser,
      userId: loginResult.userId,
    };
  }
}
