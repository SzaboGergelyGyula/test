export interface IDay {
  id: number
  open: Date
  close?: Date
  summary?: number
}

export interface ICreateDayArgs {
  open: Date
  close?: Date
  summary?: number
}

export interface IUpdateDayArgs {
  id: number
  open: Date
  close?: Date
  summary?: number
}

export interface IDeleteDayArgs {
  id: number
}

export interface IDayResponse {
  success: boolean
  day?: IDay
  error?: string
}

export interface IDaysResponse {
  success: boolean
  days?: IDay[]
  error?: string
}
