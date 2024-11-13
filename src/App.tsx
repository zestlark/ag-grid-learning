import { useState } from 'react'
import AgGrid2 from './component/AgGrid2'
import AgGrid from './component/AgGrid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>table 1</h1>
      <AgGrid/>
      <br /><br />
      <h1>table 2</h1>
      <br /><br />
      <AgGrid2 />
    </>
  )
}

export default App
