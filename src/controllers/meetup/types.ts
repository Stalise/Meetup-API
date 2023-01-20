import type { IControllerResponse } from 'types/controllers';
import type { IExtendedMeetup } from 'types/meetups';

export interface IMeetupResponseBody extends IControllerResponse {
  meetup?: IExtendedMeetup;
}

export interface IMeetupsResponseBody extends IControllerResponse {
  meetups?: IExtendedMeetup[];
  page?: number;
  limit?: number;
  pages?: number;
  total?: number;
}
