import React, {
  useCallback,
  useEffect,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import actions from 'store/post/actions';
import useSignedIn from 'hooks/useSignedIn';
import {
  RootState,
} from 'store/types';

import Add from './Add';

const selector = (({
  post: {
    list,
  },
}: RootState) => ({
  list,
}));

const Post: React.FC = () => {
  const signedIn = useSignedIn();
  const {
    list,
  } = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getPosts.request());
  }, [dispatch]);

  const handleClickDelete = useCallback((id: string) => {
    dispatch(actions.deletePost.request(id));
  }, [dispatch]);

  return (
    <div>
      {list.map(({
        _id,
        text,
      }) => (
        <div
          key={`post-list-${_id}`}
        >
          <span>{text}</span>
          {signedIn && (
            <button
              type='button'
              onClick={() => handleClickDelete(_id)}
            >
              지우기
            </button>
          )}
        </div>
      ))}
      {signedIn && <Add />}
    </div>
  );
};

export default Post;
