import createDataTree from "utils/createDataTree"
import { scaleValueSelector } from "features/selectors"
import Tree from "./components/Tree"
import { useAppDispath, useAppSelector } from "./store/hooks"
import { setScaleValue } from "./features/TreeSlice"
import treeData from "./data"
import styles from "./styles/app.module.css"

const App = () => {
  const preparedTree = createDataTree(treeData)
  const scaleValue = useAppSelector(scaleValueSelector)
  const dispatch = useAppDispath()

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <p className={styles.text}>Для выделения пути между нодами, зажмите клавишу shift</p>
        <div className={styles.scale}>
          <span className={styles.label}>Scale tree (not work for Safari)</span>
          <input
            type="range"
            min="1"
            max="6"
            value={scaleValue}
            step="0.1"
            className={styles.slider}
            onChange={(e) => dispatch(setScaleValue(e.target.value))}
          />
        </div>
      </header>
      <Tree preparedTree={preparedTree} />
    </div>
  )
}

export default App
