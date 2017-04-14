export const BACKFRAME_EVENTS = ['processor','renderer','responder']

export const BACKFRAME_HOOKS = ['beginHooks','alterRequest','beforeHooks','afterHooks','alterResult','commitHooks']

export const BACKFRAME_LIFECYCLE = [
  ...BACKFRAME_EVENTS,
  ...BACKFRAME_HOOKS
]
