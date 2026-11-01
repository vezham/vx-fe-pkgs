export type Outfit =
  | 'rest'
  | 'cook'
  | 'investigate'
  | 'write'
  | 'builder'
  | 'music'
  | 'tutor'
  | 'garden'
  | 'designer'
  | 'director'
  | 'coach'
  | 'traveller'
  | 'money'
  | 'planner'
  | 'captain'
  | 'tester'
  | 'guard'
  | 'bug'

export type Persona =
  'helper' | 'coder' | 'writer' | 'planner' | 'tutor' | 'explorer'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
  persona: Persona
  outfit?: Outfit
  tasks?: { label: string; done: boolean }[]
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
}

export interface ExampleChat {
  id: string
  persona: Persona
  title: string
  description: string
  prompt: string
}
