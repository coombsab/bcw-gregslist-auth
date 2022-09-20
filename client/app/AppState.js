import { dev } from './env.js'
import { Car } from "./Models/Car.js"
import { EventEmitter } from './Utils/EventEmitter.js'
import { isValidProp } from './Utils/isValidProp.js'

class AppState extends EventEmitter {
  user = {}
  /** @type {import('./Models/Account.js').Account} */
  // @ts-ignore
  account = {}
  /** @type {import('./Models/Value').Value[]} */
  values = []
  socketData = []

  /** @type {import('./Models/Car').Car[]} */
  cars = []

  /** @type {import('./Models/Car').Car} */
  // @ts-ignore
  activeCar = null

  /** @type {import('./Models/House').House[]} */
  houses = []
  /** @type {import('./Models/House').House} */
  // @ts-ignore
  activeHouse = null

  /** @type {import('./Models/Job').Job[]} */
  jobs = []
  /** @type {import('./Models/Job').Job} */
  // @ts-ignore
  activeJob = null
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})

if (dev) {
  // @ts-ignore
  window.appState = appState
}
