import { Component } from 'vue'
import { Module } from './types'

const components: Record<string, Module> = import.meta.glob('./*/index.ts', { eager: true })
const newComponent: Record<string, Component> = {}

Object.entries(components).forEach(([name, value]: [string, Module]) => {
  newComponent[name.split('/')[1]] = value.default
})

export default newComponent
