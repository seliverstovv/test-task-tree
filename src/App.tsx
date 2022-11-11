import createDataTree from "utils/createDataTree"
import "./App.css"
import Tree from "./components/Tree"
import treeData from "./data"

const App = () => {
  const preparedTree = createDataTree(treeData)

  return (
    <div className="App">
      <Tree preparedTree={preparedTree} />
    </div>
  )
}

export default App
