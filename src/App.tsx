import "./App.css"
import Tree from "./components/Tree"
import treeData from "./data"

const App = () => {
  return (
    <div className="App">
      <Tree tree={treeData} />
    </div>
  )
}

export default App
