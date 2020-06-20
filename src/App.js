import React ,{useState, useEffect } from "react";
import api from  './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(()=> {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })

  },[]);
  
  
  async function handleAddRepository() {
    setCount(count + 1);
    const response = await api.post('repositories', {
      title: `Projeto: ${count}`,
      url: `http://minhaapi.com/${count}`,
      techs: `Tech: ${count}`
    });
    const project = response.data;
    setRepositories([...repositories,project]);
  }

  async function handleRemoveRepository(id) { 
    setRepositories(repositories.filter(project => project.id !== id));
    api.delete(`repositories/${id}`);
    
  }

  return (
    <div>
      <ul data-testid="repository-list" >
      {repositories.map(project => 
      <li key={project.id}>
      {project.title} 
      <button onClick={() => handleRemoveRepository(project.id)}>
        Remover
      </button>
      </li>
      )}   
    </ul>

    <button onClick={handleAddRepository}>Adicionar</button>
  </div>
  );
}

export default App;
