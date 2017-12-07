# interactive-table
### Demo: https://interactive-table.surge.sh

This is an app with simple tabular view of data, with options for filtering and sorting. During this task I was
investigating capabilities of [mobx-state-tree] for state management.

### Technology stack:
* [mobx-state-tree] - observable state container with concept of **actions** for data update and **views** for data
retrieval (with memoization)
* [React]
* [Reactstrap] - React + Bootstrap


   [mobx-state-tree]: <https://github.com/mobxjs/mobx-state-tree>
   [React]: <https://reactjs.org/>
   [Reactstrap]: <https://reactstrap.github.io/>


### Start:
```sh
$ npm i
$ npm start
```

### Tests:
```sh
$ npm test
```

### Build:
```sh
$ npm build
```