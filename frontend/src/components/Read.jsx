import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Read = () => {

  const [data, setData] = useState();
  const [error, setError] = useState("");

  async function getData() {
    const response = await fetch(`http://localhost:4000/`);
    const result = await response.json();
    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }
    if(response.ok){
      setData(result);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/${id}`,{
      method:"DELETE",
    });
    const result = await response.json();
    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }
    if(response.ok){
      setError("Delete successfully");

      setTimeout(() =>{
        setError("");
        getData();
      },2000);
    }

  };


  useEffect(()=>{
    getData();
  },[]);
console.log(data);




  return (
    <div className="container my-2">
      <h2 className="text-center">All Data</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {/* Data will be rendered here */}
        {/* Each data item will be a card */}
        {
          data?.map((element)=>(

        <div key={element._id} className="col-3">
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">{element.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{element.email}</h6>
              <p className="card-text">
                {element.age}
              </p>
              <a href="#" className="card-link" onClick={() => handleDelete(element._id)}>
                Delete
              </a>
              <Link to={`/${element._id}`} className="card-link">
                Edit
              </Link>
            </div>
          </div>
        </div>
          ))
        }
      </div>
    </div>
  );
};

export default Read;
