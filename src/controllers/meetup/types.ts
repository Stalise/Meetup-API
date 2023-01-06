export interface IMeetup {
  theme: string;
  description: string;
  venue: string;
  tags?: string[];
}

export interface IExtendedMeetup extends IMeetup {
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
