import { createContext, useContext, useReducer } from "react";
import { episode } from "../components/layouts/Player";

export type Queue = {
  prev: episode | null;
  current: episode | null;
  next: episode | null;
};

type QueueAction = {
  type: "SET_QUEUE";
  payload: Queue;
};

const QueueContext = createContext<Queue>({
  prev: null,
  current: null,
  next: null,
});
// eslint-disable-next-line
export const QueueDispatchContext = createContext((a: QueueAction): void => {});
QueueContext.Provider;
function queueReducer(queue: Queue, action: QueueAction) {
  switch (action.type) {
    case "SET_QUEUE":
      return action.payload;
    default:
      throw Error("Unknown action type");
  }
}

export default function QueueProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queue, dispatch] = useReducer(queueReducer, {
    prev: null,
    current: null,
    next: null,
  });

  return (
    <QueueContext.Provider value={queue}>
      <QueueDispatchContext.Provider value={dispatch}>
        {children}
      </QueueDispatchContext.Provider>
    </QueueContext.Provider>
  );
}

export function useQueue() {
  return useContext(QueueContext);
}

export function useQueueDispatch() {
  return useContext(QueueDispatchContext);
}
