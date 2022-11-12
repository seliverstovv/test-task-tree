import createDataTree from "utils/createDataTree"
import Tree from "./components/Tree"
import treeData from "./data"
import styles from "./styles/app.module.css"

const App = () => {
  const preparedTree = createDataTree(treeData)

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <p className={styles.text}>
          To select a path between nodes, hold down the shift key and select point A and point
          B
        </p>
      </header>
      <Tree preparedTree={preparedTree} />
    </div>
  )
}

export default App
