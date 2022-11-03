import { RefObject } from "react"

export interface NodeType {
  id: number
  x: number
  y: number
  parent_id: number | null
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

export type ActiveNodeType = number[]

export interface CommonPropsType {
  rootSvg: SVGRefType
  clickHandler: (node: PreparedNodeType) => void
  activeNodes: ActiveNodeType
}
