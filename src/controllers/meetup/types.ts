export interface IMeetup {
  theme: string;
  description: string;
  venue: string;
  tags?: string[];
}

export interface IExtendedMeetup extends IMeetup {
  id: number;
}

export interface ICreateMeetupResponseBody {
  message: string;
  meetup?: IExtendedMeetup;
}
