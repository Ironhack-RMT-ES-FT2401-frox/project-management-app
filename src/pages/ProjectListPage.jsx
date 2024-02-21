import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard"; // used to render each Project
import { useEffect, useState } from "react";
import axios from "axios";

import API_URL from "../utils/api";

function ProjectListPage() {

  // 1 estado
  const [ allProjects, setAllProjects ] = useState(null)

  // 2 useEffect
  useEffect(() => {

    // fetch("url").then(/* .json*/ ).then(/* */).catch()

    // cambios:
    // usamos axios en vez de fetch

    // 3. llamada a api y actualizar estado
    axios.get(`${API_URL}/projects`)
    .then((response) => {
      console.log(response.data)
      setAllProjects(response.data)
    })
    .catch((error) => {
      console.log(error)
      // aqui gestionariamos redireccion a pagina de error
    })


  }, [])

  // 4 loading
  if (allProjects === null) {
    return <h4>... buscando</h4>
  }

  
  return (
    <div className="ProjectListPage">

      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>     

      {/* ... list of all projects should be rendered here   */}
      {/* 5. renderizar data */}

      {allProjects.map((eachProject) => {
        // return <ProjectCard key={eachProject.id} eachProject={eachProject}/>
        return <ProjectCard key={eachProject.id} {...eachProject}/>
      })}

      
      {/* ... for each project, we should render one ProjectCard */}
       
    </div>
  );
}

export default ProjectListPage;