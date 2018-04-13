import Comment from './Comment';

export default interface Booking {
  id?: string;
  category: string;
  section: string;
  day: number;
  month: number;
  year: number;
  comments?: Array<Comment>;
  value: number;
};
