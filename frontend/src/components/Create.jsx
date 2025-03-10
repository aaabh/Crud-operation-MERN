import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  console.log(name, email, age);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    var addUser = {name,email, age};
    console.log("addUser",addUser);
    
      
      // Call your API here to add the user
      const response = await fetch("http://localhost:4000/",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addUser),
      });
      const result = await response.json();
      
      if(!response.ok){
        console.log(result.error);
        setError(result.error);
      }
      else{
        console.log(result);
        setError("");
        setName("");
        setEmail("");
        setAge(0);
        navigate("/read");
      }
    }
  return (
    <div className="container my-2">
      <h2>Enter The Data</h2>

          {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
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
  );
};

export default Create;
