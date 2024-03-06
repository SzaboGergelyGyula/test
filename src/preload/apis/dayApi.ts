import { ipcRenderer } from 'electron'
import { IDayResponse, IDaysResponse } from '../interfaces/IDay'

export const createDay = async (
  open: Date,
  close?: Date,
  summary?: number
): Promise<IDayResponse> => {
  const response = await ipcRenderer.invoke('create-day', { open, close, summary })
  return response
}

export const getAllDays = async (): Promise<IDaysResponse> => {
  const response = await ipcRenderer.invoke('get-all-days')
  return response
}

export const updateDay = async (
  id: number,
  open: Date,
  close?: Date,
  summary?: number
): Promise<IDayResponse> => {
  const response = await ipcRenderer.invoke('update-day', {
    id,
    open,
    close,
    summary
  })
  return response
}

export const deleteDay = async (id: number): Promise<IDayResponse> => {
  return await ipcRenderer.invoke('delete-day', { id })
}
