import React, {
  useState,
  useCallback,
} from 'react';
import {
  useDispatch,
} from 'react-redux';
import actions from 'store/post/actions';
import {
  PostPostRequestPayload,
} from 'store/post/types';

const initialPayload = {
  text: '',
};

const Add: React.FC = () => {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState<PostPostRequestPayload>({
    ...initialPayload,
  });

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const {
      name, value,
    } = e.currentTarget;
    setPayload((val) => ({
      ...val,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actions.postPost.request(payload));
    setPayload({
      ...initialPayload,
    });
  }, [dispatch, payload]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        name='text'
        type='text'
        value={payload.text}
      />
      <button type='submit'>
        submit
      </button>
    </form>
  );
};

export default Add;
