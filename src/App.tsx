import createDataTree from "utils/createDataTree"
import Tree from "./components/Tree"
import treeData from "./data"
import styles from "./index.module.css"

const App = () => {
  const preparedTree = createDataTree(treeData)

  return (
    <div className={styles.app}>
      <p className={styles.text}>Для выделения пути между нодами, зажмите клавишу shift</p>
      <Tree preparedTree={preparedTree} />
    </div>
  )
}

export default App
