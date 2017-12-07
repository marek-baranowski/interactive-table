import React from "react";
import Table from "./components/Table";

const App = () => (
  <div id="app" className="w-75 mx-auto">
    <h1 className="mt-5">Interactive table</h1>
    <p className="mt-3 mb-5">Feel free to play with filters and sorting.</p>
    <Table />
  </div>
);

export default App;
