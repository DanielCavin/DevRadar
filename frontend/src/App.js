import React, { useState, useEffect } from 'react';
import api from './services/api'
import './global.css'
import './Sidebar.css'
import './App.css'
import './Main.css'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'
// Componente: ( 1 letra Up, 1 componente por arquivo, bloco isolado de conteudo , no qual nao interfere no restante da aplicação)
// Propriedade: 
// Estado: Informações mantidas pelo componente (Imutabilidade !!!)

function App() {
  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const res = await api.get('/devs')
      setDevs(res.data)
    }
    loadDevs()
  }, [])

  async function handleAddDev(data) {

    const res = await api.post('/devs', data)

    setDevs([...devs, res.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev.id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
