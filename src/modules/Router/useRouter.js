import { useContext } from 'react';
import { app as router } from 'a-route';
import RouterContext from './RouterContext';

function useRouter() {
  useContext(RouterContext);
  return router;
}

export default useRouter;
