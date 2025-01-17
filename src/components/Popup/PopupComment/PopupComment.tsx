import { Comment } from '../../../types/comment';
import { getDate } from '../../../utils/utils';

interface PopupCommentProps {
  commentInfo: Comment;
}

const PopupComment = ({ commentInfo }: PopupCommentProps) => {
  const { author, comment, date, emotion } = commentInfo;

  return (
    <li className='film-details__comment'>
      <span className='film-details__comment-emoji'>
        <img
          src={`./images/emoji/${emotion}.png`}
          width='55'
          height='55'
          alt='emoji-smile'
        />
      </span>
      <div>
        <p className='film-details__comment-text'>{comment}</p>
        <p className='film-details__comment-info'>
          <span className='film-details__comment-author'>{author}</span>
          <span className='film-details__comment-day'>
            {getDate(date, 'YYYY/MM/DD HH:MM')}
          </span>
          <button className='film-details__comment-delete'>Delete</button>
        </p>
      </div>
    </li>
  );
};

export default PopupComment;
