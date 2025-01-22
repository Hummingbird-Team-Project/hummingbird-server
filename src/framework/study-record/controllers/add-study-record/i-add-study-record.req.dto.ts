import { tags } from 'typia';

export interface IAddStudyRecordReqDto {
  date: string & tags.Format<'date'>;
  totalDuration: number & tags.Type<'uint32'>;
  title: string & tags.MinLength<1>;
  color: string;
  order: number;
  // TODO: 추후 최대 등록 가능 공부 시간 확정 시 업데이트
  duration: number & tags.Type<'uint32'>;
  startAt: number & tags.Type<'uint32'>;
  endAt: number & tags.Type<'uint32'>;
  totalBreak: number & tags.Type<'uint32'>;
}
