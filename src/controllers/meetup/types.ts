import type { KeyType } from 'types/helpers';

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

export interface IMeetupResponseBody {
  message: string;
  meetup?: IExtendedMeetup;
}

export interface IGetMeetupsResponseBody {
  message: string;
  meetups?: IExtendedMeetup[];
}
