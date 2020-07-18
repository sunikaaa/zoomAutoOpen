import createPersistedState from 'vuex-persistedstate'
import {convertNumberToWeek} from '@/plugins/convertNumberToWeek'

export const state = () => ({
  sunday: [],
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: []
})
//time = {hour:number,minute:number}
export const mutations = {
  createZoomData(state,{
    time,
    name,
    pass,
    url,
    weekDay
  }) {
      console.log(convertNumberToWeek(weekDay));
    state[convertNumberToWeek(weekDay)].push({
      time,
      name,
      pass,
      url,
      isEffect:true
    })
  },
  updateZoomData(state,{
    time,
    name,
    pass,
    url,
    index,
    isEffect,
    weekDay
  }) {
      console.log(weekDay)
    state[convertNumberToWeek(weekDay)].splice(index, 1, {
      time,
      name,
      pass,
      url,
      isEffect
    })
  },
  deleteZoomData(state,{index, weekDay}) {
    state[convertNumberToWeek(weekDay)].splice(index, 1);
  }
}

export const getters = {
  allWeekData: state => [state.sunday, state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday],
}

export const plugins = [createPersistedState()]