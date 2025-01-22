import { tags } from 'typia';

export interface ICreateSubjectReqDto {
  title: string & tags.MinLength<1> & tags.MaxLength<50>;
  color: string & tags.MinLength<6> & tags.MaxLength<6>;
  order: number & tags.Minimum<0> & tags.Maximum<20>;
}
