import { app as router } from 'a-route';

// Just expose `a-route`'s router object.
// For consumers, allows to `router.navigate(path)`
// For Router component, allows to register routes
// can also be used for debugging purposes.
function useRouter() {
  return router;
}

export default useRouter;
