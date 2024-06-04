export interface ChatData {
  id: string
  lastMessage: string | undefined
  lastUpdated: Date
  timestamp: string
  name: string | undefined
  email: string | undefined
  otherUid: string | undefined
}

export type User = {
  uid: string
  name: string
  email: string
}

export type Message = {
  id: string
  timestamp: number
}

export type CompleteMessage = Message & {
  text: string
  sentBy: string
}

export type Contact = {
  uid: string
}
