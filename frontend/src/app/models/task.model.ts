export interface Task {
  _id: string,
  description: string, 
  state: {
    id: string,
    name: string
  },
  startDate: Date | null,
  endDate: Date | null
}