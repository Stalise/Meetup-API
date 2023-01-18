import type { KeyType } from 'types/helpers';
import type { ParsedQs } from 'qs';

export interface IMeetup {
  theme: string;
  description: string;
  time: string;
  venue: string;
  tags?: string[];
}

export interface IExtendedMeetup extends IMeetup {
  id: number;
}

export interface IMeetupForUpdate extends KeyType<unknown>, Partial<IMeetup> {
  id: number;
}

export interface IParamsId extends KeyType<string> {
  id: string;
}

export interface IQueryGetMeetups extends ParsedQs {
  theme?: string;
  description?: string;
  time?: string;
  venue?: string;
  filters?: string;
}
