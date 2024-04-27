import React, {useState, useEffect} from "react";

import './App.css';


function App() {
  const [viewer, setViewer] = useState(0);
  const [Products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  const updateHooks = (e) => {
    setViewer(e);
  }
  function GetData()
  {
    updateHooks(1);
      fetch("http://localhost:8081/FakeStoreCatalog")
      .then(response => response.json())
      .then(products => setProducts(products));
      console.log(Products);
  }

  function Home()
  {
    const handleSearchInputChange = (e) => {
      setSearchInput(e.target.value);
    }

  if(viewer === 1)
  {
    const listItems = Products.map((el) =>(
      <div class="row border-top border-bottom" key={el.id}>
          <div class="group relative shadow-lg">
              <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                  <img className="w-full h-full object-center object-cover lg:w-full lg:h-full" src={el.image} width={200}/>
              </div>
              <div className="flex justify-between p-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                  <div class="row text-muted">Product id: {el.id} </div>
                  <div class="row text-muted"><strong>{el.title}</strong></div>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Rating: {el.rating.rate}</p>
                  <p className="text-sm font-medium text-green-600">${el.price}</p>
                </div>
              </div>
          </div>
      </div>
  ));
    return  <div>
                <div>
                  <button type="button" onClick={() => GetData()}>Get</button>
                  <button type="button" onClick={() => updateHooks(2)}>Post</button>
                  <button type="button" onClick={() => updateHooks(3)}>Put</button>
                  <button type="button" onClick={() => updateHooks(4)}>Delete</button>
                </div>
                  <input type="text" value={searchInput} onChange={handleSearchInputChange}/>
                  <button onClick={() => GetData(searchInput)}>Search</button>
                <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{ maxHeight: '800px', overflowY: 'scroll' }}>
                  {listItems}
                </div>
              </div>
  }
  return <div>
          <button onClick={() => GetData()}>Get</button>
          <button onClick={() => updateHooks(2)}>Post</button>
          <button onClick={() => updateHooks(3)}>Put</button>
          <button onClick={() => updateHooks(4)}>Delete</button>
        </div>
  }

  return (
    <div>
      <Home/>
    </div>
  );
}

export default App;
