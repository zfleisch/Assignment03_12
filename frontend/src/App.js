import React, {useState, useEffect} from "react";

import './App.css';


function App() {
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [addNewProduct, setAddNewProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: 0.0,
  });

  const [viewer1, setViewer1] = useState(false);
  const [viewer2, setViewer2] = useState(false);

  useEffect(() =>{
    getAllProducts();
  }, []);

  function getAllProducts() {
    fetch("http://localhost:8081/FakeStoreCatalog")
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      setProduct(data);
    });
    setViewer1(!viewer1);
  }

  const showAllItems = product.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={200} alt="images"/> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating: {el.rating.rate} <br />
      Number of Reviews: {el.rating.count} <br />
    </div>
  ));

  function getOneProduct(id) {
    console.log(id);
    if(id >= 1 && id <= 20)
    {
      fetch("http://localhost:8081/FakeStoreCatalog/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOneProduct(data);
      })
    }
    if(viewer2 === false)
    {
      setViewer2(true);
    }
    else
    {
      console.log("Wrong number of Product id");
    }
  }

  const showOneItem = oneProduct.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={200} alt="images"/> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating: {el.rating.rate} <br />
      Number of Reviews: {el.rating.count} <br />
    </div>
  ));





  return (
    <div>
      <button>Products</button>
      <button>Add New Product</button>
      <button>Remove a Product</button>
      <button>Change Item Price</button>
      <h1>Catalog of Products</h1>
      <div>
        <h3>Show one Product by Id:</h3>
        <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)}/>
        {viewer2 && showOneItem}
      </div>
      <div>
        <h3>Show all products</h3>
        <button onClick={() => getAllProducts()}>Show All</button>
        {viewer1 && showAllItems}
      </div>
    </div>
  );
}

export default App;
