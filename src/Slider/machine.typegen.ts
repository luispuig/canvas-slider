// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    enableListeners: "done.invoke.sliderMachine.dragging:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignScrollPosition: "mouseLeave" | "mouseMove" | "mouseUp";
    assignStartDraggingPoint: "mouseDown";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    enableListeners: "mouseDown" | "mouseMove";
  };
  matchesStates: "dragging" | "idle";
  tags: never;
}
