export interface CreateContact{
  name: string;
  email: string;
  tg: string;
  comment: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  tg: string;
  comment: string;
  note?: string;
}
