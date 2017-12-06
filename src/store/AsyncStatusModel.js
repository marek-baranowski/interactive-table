import { types } from "mobx-state-tree";
import { ASYNC_STATES } from "../config";

export default types
  .model("AsyncStatusModel", {
    status: types.optional(
      types.enumeration(Object.values(ASYNC_STATES)),
      ASYNC_STATES.NONE
    ),
    errorMessage: types.maybe(types.string)
  })
  .views(self => ({
    get isNone() {
      return self.status === ASYNC_STATES.PENDING;
    },
    get isPending() {
      return self.status === ASYNC_STATES.PENDING;
    },
    get isResolved() {
      return self.status === ASYNC_STATES.RESOLVED;
    },
    get isRejected() {
      return self.status === ASYNC_STATES.REJECTED;
    }
  }))
  .actions(self => ({
    setPending: () => (self.status = ASYNC_STATES.PENDING),
    setResolved: () => (self.status = ASYNC_STATES.RESOLVED),
    setRejected: errorMessage => {
      self.status = ASYNC_STATES.REJECTED;
      self.errorMessage = errorMessage;
    },
    reset: () => {
      self.status = ASYNC_STATES.NONE;
      self.errorMessage = null;
    }
  }));
