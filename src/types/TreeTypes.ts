import { RefObject } from "react"

export type NodeIdType = number

export interface NodeType {
  id: NodeIdType
  x: number
  y: number
  parent_id: NodeIdType | null
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

export type NodeIdsType = NodeIdType[]

export interface CommonPropsType {
  rootSvg: SVGRefType
  path: NodeIdsType
}
