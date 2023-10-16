import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    drawerVisible: true
  }),
  actions: {
    setDrawerVisibility(visible: boolean) {
      console.log('setDrawerVisibility', visible)
      this.drawerVisible = visible
    }
  }
})
