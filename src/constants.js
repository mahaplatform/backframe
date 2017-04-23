export const BACKFRAME_EVENTS = ['processor','renderer','responder']

export const BACKFRAME_HOOKS = ['alterRequest','beforeHooks','afterHooks','alterResult']

export const BACKFRAME_LIFECYCLE = [
  ...BACKFRAME_EVENTS,
  ...BACKFRAME_HOOKS
]
