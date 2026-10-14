import { useEffect, useReducer } from "react";

export const DRAWER_TIMING = { peek: 210, poster: 1050 };

const initialState = {
  project: null,
  pending: null,
  state: "closed",
  mode: "peek",
  closing: false,
  reveal: null,
};

function reducer(current, action) {
  switch (action.type) {
    case "hover": {
      if (current.state === "open" || current.reveal === "open") return current;
      if (current.closing) return { ...current, pending: action.project };
      if (!current.project) {
        return { ...initialState, project: action.project, reveal: "peek" };
      }
      if (current.project.index === action.project.index) return current;
      if (current.reveal) {
        return { ...current, project: action.project };
      }
      return { ...current, state: "closed", closing: true, pending: action.project };
    }
    case "leave":
      if (current.state === "open" || current.mode === "poster") return current;
      if (current.reveal) return initialState;
      if (current.closing) return { ...current, pending: null };
      return { ...current, state: "closed", closing: true, pending: null };
    case "open":
      return {
        ...initialState,
        project: action.project,
        mode: "poster",
        state: current.project ? "open" : "closed",
        reveal: current.project ? null : "open",
      };
    case "close":
      return { ...current, state: "closed", mode: "poster", closing: true, pending: null, reveal: null };
    case "reveal":
      return current.reveal ? { ...current, state: current.reveal, reveal: null } : current;
    case "exited":
      if (!current.closing) return current;
      return current.pending
        ? { ...initialState, project: current.pending, reveal: "peek" }
        : initialState;
    default:
      return current;
  }
}

export default function useProjectDrawer() {
  const [drawer, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!drawer.reveal) return undefined;
    // Paint the hidden position before starting the entrance transition.
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => dispatch({ type: "reveal" }));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [drawer.reveal, drawer.project]);

  useEffect(() => {
    if (!drawer.closing) return undefined;
    const timeout = setTimeout(() => dispatch({ type: "exited" }), DRAWER_TIMING[drawer.mode]);
    return () => clearTimeout(timeout);
  }, [drawer.closing, drawer.mode]);

  return { drawer, dispatch };
}
