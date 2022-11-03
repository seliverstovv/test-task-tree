export default [
  { id: 1, x: 100, y: 0, parent_id: null },
  { id: 2, x: 80, y: 10, parent_id: 1 },
  { id: 3, x: 120, y: 10, parent_id: 1 },
  { id: 4, x: 70, y: 20, parent_id: 2 },
  { id: 5, x: 90, y: 20, parent_id: 2 },
  { id: 6, x: 130, y: 20, parent_id: 3 },

  { id: 7, x: 60, y: 40, parent_id: 4 },
  { id: 8, x: 40, y: 40, parent_id: 4 },
  { id: 9, x: 50, y: 50, parent_id: 7 },
  { id: 10, x: 70, y: 50, parent_id: 7 },
  { id: 11, x: 140, y: 40, parent_id: 6 },
]
