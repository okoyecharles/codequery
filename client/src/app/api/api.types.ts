export type User = {
  _id: string,
  username: string,
  password: string,
  name: string,
  __v: number
}

export type Answer = {
  _id: string,
  answer: string,
  question: string,
  user: User,
  createdAt: string,
  updatedAt: string,
  __v: 0
}

export type Query = {
  _id: string,
  question: string,
  user: User,
  answers: Array<string>,
  intelligentAnswer?: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

export type QueryDetailed = {
  _id: string,
  question: string,
  user: User,
  answers: Array<Answer>,
  intelligentAnswer?: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}