import logo from './logo.svg';
import React, {useState, useEffect} from "react";

import './App.css';

function App() {
  const [viewer, setViewer] = useState(0);
  
  const updateHooks = (e) => {
    setViewer(e);
  }
  function Get()
  {
    function loadItems(items)
    {
      var currentItems = document.getElementById("col");
      //clear current Items
      while(currentItems.firstChild) { 
          currentItems.removeChild(currentItems.firstChild); 
      }
      for(var i = 0; i < items.length; i++)
      {
        let id = items[i].id;
        let title = items[i].title;
        let price = items[i].price;
        let description = items[i].description;
        let category = items[i].category;
        let image = items[i].image;
        let rate = items[i].rating.rate;
        let count = items[i].rating.count;
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="card shadow-sm">
        <img src=${image} class="card-img-top"></img>
        <div class="card-body">
          <p class="card-text"> ${id} <strong>${title}</strong> $${price}</p>
          <div class="d-flex justify-content-between align-items-center">
          <p>${category}</p>
          <p>${description}</p>
          </div>
          <p>${rate} : ${count}</p>
        </div>
      </div>`;
      }
    }
    fetch("http://localhost:8081/FakeStoreCatalog")
    .then(response => response.json())
    .then(items => loadItems(items));
  }

  function Home()
  {
    return (<div>
              <button onClick={() => updateHooks(1)}>Get</button>
              <button onClick={() => updateHooks(2)}>Post</button>
              <button onClick={() => updateHooks(3)}>Put</button>
              <button onClick={() => updateHooks(4)}>Delete</button>
              <div class="album py-5 bg-body-tertiary">
                  <div class="container">
                    <div id="col" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    </div>
                  </div>
                </div>
              </div>);
  }


  if(viewer === 0)
  {
    return (
      <div>
        <Home/>
      </div>
    );
  }
  if(viewer === 1)
  {
    return (
      <div>
        <Get/>
      </div>
    );
  }
}

export default App;
