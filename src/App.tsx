import createDataTree from "utils/createDataTree"
import Tree from "./components/Tree"
import treeData from "./data"
import styles from "./index.module.css"

const App = () => {
  const preparedTree = createDataTree(treeData)

  return (
    <div className={styles.app}>
      <Tree preparedTree={preparedTree} />
    </div>
  )
}

export default App
