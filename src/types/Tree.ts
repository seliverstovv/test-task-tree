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

export type NodeClickHandlerType = (node: PreparedNodeType) => void

export type LeafClickHandlerType = (id: NodeId, path: PathType) => void

export type PathClickHandlerType = (path: PathType) => void

export interface CommonPropsType {
  rootSvg: SVGRefType
  nodeClickHandler: NodeClickHandlerType
  leafClickHandler: LeafClickHandlerType
  betweenPathHandler: PathClickHandlerType
  activePaths: PathType[] | null
  activeNodes: ActiveNodesType
  activeLeaf: null | NodeId
  path: PathType
}
