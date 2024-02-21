import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import API_URL from "../utils/api";

function CreateProjectPage() {

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...logic for creating a new Project should be here

    // acceder a la API del servidor para poder crear un nuevo doc en la DB
    try {
      
      const newProject = {
        title: title,
        description: description
      } // la data a enviar al backend

      const response = await axios.post(`${API_URL}/projects`, newProject) // usa ruta de BE
      // 1. Modifica la BD donde se almacenas estos projectos
      // 2. a veces nos devuelve una informacion

      // despues de crear el nuevo proyecto, podemos redireccionar al usuario a "/projects"
      navigate("/projects") // ruta de FE

    } catch (error) {
      console.log(error)
    }

  };  

  const handleTitleChange = (e) => setTitle(e.target.value) // forma 1 del onChange

  return (
    <div className="CreateProjectPage">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}> 
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />
        {/* onChange 2*/}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProjectPage;