import { EventEmitter } from "node:events";
export const eventBus = new EventEmitter();

export const EVENTS = {
  USER_REGISTERED: "user.registered",
} as const;
