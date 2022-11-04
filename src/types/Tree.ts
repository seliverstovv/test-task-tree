import { RefObject } from "react"

export type NodeId = number
export interface NodeType {
  id: NodeId
  x: number
  y: number
  parent_id: NodeId | null
}

export type TreeType = NodeType[]

export interface PreparedNodeType extends NodeType {
  childNodes: PreparedNodeType[]
  parent_xy?: {
    x: number
    y: number
  }
}

export type PreparedTreeType = PreparedNodeType[]

export type SVGRefType = RefObject<SVGSVGElement>

export type ActiveNodesType = NodeId[]

export type PathType = NodeId[]

export interface CommonPropsType {
  rootSvg: SVGRefType
  nodeClickHandler: (node: PreparedNodeType) => void
  leafClickHandler: (id: NodeId, path: PathType) => void
  activeNodes: ActiveNodesType
  activeLeaf: null | NodeId
  path: PathType
}
