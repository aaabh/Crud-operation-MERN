import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Update = () => {

  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const {id} = useParams();

    //get single user data
    const getSingleUser = async () =>{
      const response = await fetch(`http://localhost:4000/${id}`);
      
      const result = await response.json();
    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }
    if(response.ok){
      setError("");
      console.log("update user", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
      console.log("name", name, "email", email, "age", age);
      
    }

    };
    
    //update user data
    const handleUpdate = async (e) =>{
      e.preventDefault();
    const updateUser = {name,email, age};
    console.log("updateUser",updateUser);
    
      
      // Call your API here to add the user
      const response = await fetch(`http://localhost:4000/${id}`,{
        method:"PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUser),
      });
      const result = await response.json();
      
      if(!response.ok){
        console.log(result.error);
        setError(result.error);
      }
      else{
        console.log(result);
        setError("");
        console.log("User updated successfully");
        navigate("/read");
      }
    }

    useEffect(()=>{
      getSingleUser();
    },[]);

  return (
    <div className="container my-2">
      <h2>Edit The Data</h2>

          {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age}
            onChange={(e) => setAge(e.target.value)}/>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Update
