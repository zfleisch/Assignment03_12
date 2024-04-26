import logo from './logo.svg';
import React, {useState, useEffect} from "react";

import './App.css';

function App() {
  const [viewer, setViewer] = useState(0);


  return (
    <body>
      <script src="./zfleisch_activity15_frontend.js"></script>
      <div class="album py-5 bg-body-tertiary">
        <div class="container">
          <div id="col" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          </div>
        </div>
      </div>
      <div id="searchcol">
      </div>
      <form id="my_form">
        <input type="text" name="inputRobotId" placeholder="Enter Robot ID"></input>
        <button type="button" onclick="getInputValue();">Search by id</button>
      </form>
      <button type="button" onclick="postInputValue();">Add Robot</button>
      <div></div>
      <input type="number" id="deleteRobotById" placeholder="Enter Robot ID"></input>
      <button onclick="deleteOneRobot()">Delete Robot</button>
      <div></div>
      <input type="number" id="updateRobotById" placeholder="Enter Robot ID"></input>
      <button onclick="updateOneRobot()">Update Robot</button>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </body>
  );
}

export default App;
