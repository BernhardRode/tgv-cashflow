import Comment from './Comment';

export default interface Booking {
  category: String;
  section: String;
  day: number;
  month: number;
  year: number;
  comments?: Array<Comment>;
};
