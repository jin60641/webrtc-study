import {
  useSelector,
} from 'react-redux';
import {
  RootState,
} from 'store/types';

const selector = ({
  user: {
    token,
  },
}: RootState) => !!token;

const useSignedIn = (): boolean => {
  const signedIn = useSelector<RootState, boolean>(selector);
  return signedIn;
};

export default useSignedIn;
