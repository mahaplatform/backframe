export const BACKFRAME_EVENTS = ['processor','renderer','responder']

export const BACKFRAME_HOOKS = ['alterRequest','before','after','alterRecord']

export const BACKFRAME_LIFECYCLE = [
  ...BACKFRAME_EVENTS,
  ...BACKFRAME_HOOKS
]
