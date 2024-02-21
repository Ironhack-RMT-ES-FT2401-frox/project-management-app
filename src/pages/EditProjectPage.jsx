import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectPage() {

  const navigate = useNavigate()

  const params = useParams()
  console.log(params)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const [ formValues, setFormValues ] = useState({
  //   title: "",
  //   description: ""
  // })

  useEffect(() => {
    // cuando este componente exista, busca en la API/Server los valores actuales de los campos title y description de este proyecto

    axios.get(`${API_URL}/projects/${params.projectId}`)
    .then((response) => {
      console.log(response)

      setTitle(response.data.title)
      setDescription(response.data.description)

      // setFormValues(response.data)

    })
    .catch((error) => {
      console.log(error)
    })

  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // ...updated logic should be here

    try {

      const response = await axios.put(`${API_URL}/projects/${params.projectId}`, {
        title: title,
        description: description
      })

      // tenemos flexibilidad sobre lo que queremos que ocurra cuando se actualiza el documento
      navigate(`/projects/${params.projectId}`)

    } catch (error) {
      console.log(error)
    }

  };

  const deleteProject = () => {
    // ...delete logic should be here
    
    axios.delete(`${API_URL}/projects/${params.projectId}`)
    .then(() => {

      // tenemos flexibilidad sobre lo que queremos que ocurra cuando se borre el documento
      navigate("/projects")

    })
    .catch((error) => {
      console.log(error)
    })

  }; 

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>      
    </div>
  );
}

export default EditProjectPage;



/* 

Diferencias las rutas de Frontend y Backend

Rutas de Fronted: Son para navegacion del usuario en las paginas
Son definidas en : App.jsx
Donde las usamos? : Link, useNavigate, Navigate

Rutas de Backend: Son los accesos para buscar data externa
Son definidas por el backend: Las vemos en el cuadro de documentacion de backend
Donde las usamos: axios o fetch

*/

