import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, HttpCode, HttpStatus, Inject } from '@nestjs/common';

import { JwtPayload } from '../../../../core/auth';
import {
  AddStudyRecordServiceInput,
  IAddStudyRecordService,
} from '../../../../core/study-record';
import { CurrentUser } from '../../../shared/decorators';
import { AddStudyRecordService } from '../../services';
import { IAddStudyRecordReqDto } from './i-add-study-record.req.dto';

@Controller()
export class AddStudyRecordController {
  constructor(
    @Inject(AddStudyRecordService)
    private readonly addStudyRecordService: IAddStudyRecordService,
  ) {}

  @TypedRoute.Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async execute(
    @CurrentUser() user: JwtPayload,
    @TypedBody() body: IAddStudyRecordReqDto,
  ): Promise<void> {
    await this.addStudyRecordService.execute(
      new AddStudyRecordServiceInput(
        body.date,
        user.userId,
        body.totalDuration,
        body.title,
        body.color,
        body.order,
        body.duration,
        body.startAt,
        body.endAt,
        body.totalBreak,
      ),
    );
  }
}
