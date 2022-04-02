import { ref, reactive } from 'vue'


export function piniaHistoryPlugin({pinia, app, store, options}){
  if(!options.historyEnabled) return;
  const history = reactive([]);
  const doingHistory = ref(false)
  const future = reactive([])
  history.push(JSON.stringify(store.$state))
  store.$subscribe((mutation, state) => {
    if (!doingHistory.value) {
      history.push(JSON.stringify(state))
      future.splice(0,future.length)
    }
  })

  return {
    history,
    future,
    undo : () => {
      if (history.length === 1) return
      doingHistory.value = true
      const removedState = history.pop()
      future.push(removedState)
      store.$state = JSON.parse(history.at(-1))
      doingHistory.value = false
    },
    redo : () => {
      const latestState = future.pop()
      if (!latestState) return;
      doingHistory.value = true;
      history.push(latestState)
      store.$state = JSON.parse(latestState);
      doingHistory.value = false;
    }
  }
}