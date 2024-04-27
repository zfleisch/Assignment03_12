import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import './App.css';


function App() {
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState([]);
  const [addNewProduct, setAddNewProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate:0,
      count:0
    }
  });
  const { register, handleSubmit, formState: {errors} } = useForm();

  const [viewer1, setViewer1] = useState(false);
  const [viewer2, setViewer2] = useState(false);
  const [viewer, setViewer] = useState(0);

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
  }

  function deleteSearch(id) {
    console.log(id);
    if(id >= 1 && id <= 20)
    {
      fetch("http://localhost:8081/FakeStoreCatalog/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDeleteProduct(data);
      })
    }
    if(viewer1 === false)
    {
      setViewer1(true);
    }
    else
    {
      console.log("Wrong number of Product id");
    }
  }

  const showDeleteItem = deleteProduct.map((el) => (
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

  const onSubmit = data => {
    const inputProduct = {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.image,
      rating: {
        rate: data.rate,
        count: data.count
      }
    };
    console.log("POST Data");
    console.log(inputProduct);

      setAddNewProduct(inputProduct);
      fetch("http://localhost:8081/FakeStoreCatalog", 
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputProduct)
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      setViewer(0);
      getAllProducts();
  }

  const showNewItemForm = (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
          <div className="form-group">
              <input {...register("id", { required: true })} placeholder="Product id" className="form-control"/>
          </div>
          {errors.id && <p className="text-danger">Product id is required.</p>}
          <div className="form-group">
              <input {...register("title", { required: true })} placeholder="Title" className="form-control"/>
          </div>
          {errors.title && <p className="text-danger">Title is required.</p>}
          <div className="form-group">
              <input {...register("price", { required: true })} placeholder="Price" className="form-control"/>
          </div>
          {errors.price && <p className="text-danger">Price is required.</p>}
          <div className="form-group">
              <input {...register("description", { required: true })} placeholder="Description" className="form-control"/>
          </div>
          {errors.description && <p className="text-danger">Description is required.</p>}
          <div className="form-group">    
              <input {...register("category", {required: true})} placeholder="Category" className="form-control"/>
          </div>
          {errors.category && <p className="text-danger">Category is required.</p>}
          <div className="form-group">
              <input {...register("image", { required: true })} placeholder="Image url" className="form-control"/>
          </div>
          {errors.image && <p className="text-danger">Imgae url is required.</p>}
          <div className="form-group">
              <input {...register("rate", { required: true })} placeholder="Rating" className="form-control"/>
              </div>
          {errors.rate && <p className="text-danger">Rating is required.</p>}
          <div className="form-group">
              <input {...register("count", { required: true })} placeholder="Rating count" className="form-control"/>
          </div>
          {errors.count && <p className="text-danger">Rating count is required.</p>}
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  </div>
  );

    function deleteProduct()
    {
      
    }

    const deleteButton = (
      <button onClick={() => deleteProduct()}>Delete this Product</button>
    );



  if(viewer === 0)
  {
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
    return (
      <div>
        <button onClick={() => setViewer(1)}>Add New Product</button>
        <button onClick={() => setViewer(2)}>Remove a Product</button>
        <button onClick={() => setViewer(3)}>Change Item Price</button>
        <h1>Catalog of Products</h1>
        <div>
          <h3>Show one Product by Id:</h3>
          <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)}/>
          {viewer2 && showOneItem}
        </div>
        <div>
          <h3>All products</h3>
          {showAllItems}
        </div>
      </div>
    );
  }
  else if(viewer === 1)
  {
  return (
  <div>
    <button onClick={() => setViewer(0)}>Back to Products</button>
    <div>
      <h3>Add new Product</h3>
      {showNewItemForm}
    </div>
  </div>
  ); 
  }
  else if(viewer === 2)
  {
    return (
      <div>
        <button onClick={() => setViewer(0)}>Back to Products</button>
        <div>
          <h3>Find item to delete</h3>
          <input type="text" id="message" name="message" placeholder="id" onChange={(e) => deleteSearch(e.target.value)}/>
          {viewer1 && showDeleteItem}
          {viewer1 && deleteButton}
        </div>
      </div>
    );
  }
  else if(viewer === 3)
  {
    return (
      <div>
        <button onClick={() => setViewer(0)}>Back to Products</button>

      </div>
    );
  }
  else if(viewer === 4)
  {
    return (
      <div>
        <button >Products</button>
        <button >Add New Product</button>
        <button >Remove a Product</button>
        <button >Change Item Price</button>
      </div>
    );
  }
  
}

export default App;
