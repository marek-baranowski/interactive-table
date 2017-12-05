import { SORT_ORDER_TYPES } from "config";
import { types, getSnapshot, clone } from "mobx-state-tree";
import jsc from "jsverify";
import deepEqual from "deep-equal";
import { petArb } from "../../service";

const Todo = types
  .model("Todo", {
    title: types.string,
    done: types.boolean
  })
  .actions(self => ({
    toggle() {
      self.done = !self.done;
    }
  }));

const jscTodo = jsc.record({
  title: jsc.string,
  done: jsc.bool
});

jsc.property("toggling a todo twice", jscTodo, t => {
  const todo = Todo.create(t);

  const cloned = clone(todo);
  cloned.toggle();
  cloned.toggle();

  return deepEqual(getSnapshot(cloned), getSnapshot(todo));
});

/*
xit("have proper initial state", () => {
  console.log(petArb);
});
*/
