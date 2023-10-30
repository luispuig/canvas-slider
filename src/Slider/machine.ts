import type { MouseEvent as ReactMouseEvent } from "react";
import { createMachine } from "xstate";
import { assign } from "@xstate/immer";

type Services = {
  fetchRemainingPlaces: { data: { remainingPlaces: boolean } };
};
type Context = {
  scroll: {
    left: number;
  };
  startDragging: {
    x: number;
  };
};
type Event =
  | { type: "mouseDown"; event: ReactMouseEvent<HTMLDivElement, MouseEvent> }
  | { type: "mouseMove"; event: ReactMouseEvent<HTMLDivElement, MouseEvent> }
  | { type: "mouseUp"; event: ReactMouseEvent<HTMLDivElement, MouseEvent> }
  | { type: "mouseLeave"; event: ReactMouseEvent<HTMLDivElement, MouseEvent> };

export const sliderMachine = ({ onScrollTo }: { onScrollTo: (pixels: number) => number | undefined }) =>
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5SwDYEsJgE4FkCGAxgBZoB2YAdBimAMQC2A9gK6xgAijA7qQNoAMAXUSgADo1hoALmkakRIAB6IATCoCsFABwBOAOwAWPQEZ+elXr3qAzABoQAT0R7rFY+q38tKrzv4atawBfIPtUDGx8YjJKCCw8KCgyKAYWNgBVUQFhJBBxSRk5BWUEH00dADYtdQ8dFR0tLQr+O0dVCwodHRqKg2brSu8KkLD0TFxCEnIKOISk0hSmVjAcRgA3MGyFfOlZeVySq01jXoMVYx0TjTV7JwQL12sVLQMW-0tqjxGQcPGoqdi8USyVSywAMmA8BstrkdoV9qASmoVBQzic9JVXi4erdEE9XJUnvUvJ5qsFvqRGJh4LlfpFJjFthJdkUDohjCpcQgALTGAwUawGC78XqVCxqLTfOkTaLTahgJkFPbFRDNLkNCjqKVjemywFzZKKlkIpSIGx6ChlEUDAYVNR6dUVNyCioVSwqKqeYx6EIhIA */
      id: "sliderMachine",
      predictableActionArguments: true,
      schema: {
        context: {} as Context,
        services: {} as Services,
        events: {} as Event,
      },
      context: {
        scroll: { left: 0 },
      } as Context,
      // eslint-disable-next-line @typescript-eslint/consistent-type-imports
      tsTypes: {} as import("./machine.typegen").Typegen0,
      initial: "idle",
      states: {
        idle: {
          on: {
            mouseDown: {
              target: "dragging",
              actions: "assignStartDraggingPoint",
            },
          },
        },

        dragging: {
          on: {
            mouseUp: {
              target: "idle",
              actions: "assignScrollPosition",
            },

            mouseMove: {
              target: "dragging",
              internal: true,
              actions: "assignScrollPosition",
            },

            mouseLeave: {
              target: "idle",
              actions: "assignScrollPosition",
            },
          },

          invoke: {
            src: "enableListeners",
          },
        },
      },
    },
    {
      actions: {
        assignStartDraggingPoint: assign((context, { event }) => {
          context.startDragging = { x: event.clientX };
        }),
        assignScrollPosition: assign((context, { type, event }) => {
          const delta = event.clientX - context.startDragging.x;
          const scrollLeft = context.scroll.left - delta;
          if (type === "mouseMove") {
            onScrollTo(scrollLeft);
          } else {
            context.scroll.left = onScrollTo(scrollLeft) ?? 0;
          }
        }),
      },
      services: {
        enableListeners: () => (send) => {
          const onMouseMove = (event: MouseEvent) =>
            send({ type: "mouseMove", event: event as unknown as ReactMouseEvent<HTMLDivElement, MouseEvent> });
          document.addEventListener("mousemove", onMouseMove);

          const onMouseUp = (event: MouseEvent) =>
            send({ type: "mouseUp", event: event as unknown as ReactMouseEvent<HTMLDivElement, MouseEvent> });
          document.addEventListener("mouseup", onMouseUp);

          return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
          };
        },
      },
    }
  );
