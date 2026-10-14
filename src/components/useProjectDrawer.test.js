import { act, renderHook } from "@testing-library/react";
import useProjectDrawer, { DRAWER_TIMING } from "./useProjectDrawer";

const first = { title: "First", index: 0 };
const second = { title: "Second", index: 1 };
const third = { title: "Third", index: 2 };

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

function advance(time) {
  act(() => jest.advanceTimersByTime(time));
}

test("paints the hidden drawer before revealing a new peek", () => {
  const { result } = renderHook(useProjectDrawer);
  act(() => result.current.dispatch({ type: "hover", project: first }));
  expect(result.current.drawer.state).toBe("closed");
  advance(40);
  expect(result.current.drawer.state).toBe("peek");
});

test("closes the old peek before revealing the latest hovered project", () => {
  const { result } = renderHook(useProjectDrawer);
  act(() => result.current.dispatch({ type: "hover", project: first }));
  advance(40);
  act(() => result.current.dispatch({ type: "leave" }));
  act(() => result.current.dispatch({ type: "hover", project: second }));
  advance(100);
  act(() => result.current.dispatch({ type: "leave" }));
  act(() => result.current.dispatch({ type: "hover", project: third }));
  expect(result.current.drawer.project).toEqual(first);
  advance(DRAWER_TIMING.peek - 100);
  expect(result.current.drawer.project).toEqual(third);
  expect(result.current.drawer.state).toBe("closed");
  advance(40);
  expect(result.current.drawer.state).toBe("peek");
});

test("clicking during a swap cancels the pending exit", () => {
  const { result } = renderHook(useProjectDrawer);
  act(() => result.current.dispatch({ type: "hover", project: first }));
  advance(40);
  act(() => result.current.dispatch({ type: "hover", project: second }));
  act(() => result.current.dispatch({ type: "open", project: second }));
  advance(1500);
  expect(result.current.drawer.state).toBe("open");
  expect(result.current.drawer.project).toEqual(second);
});

test("hover works again after a full poster closes", () => {
  const { result } = renderHook(useProjectDrawer);
  act(() => result.current.dispatch({ type: "open", project: first }));
  advance(40);
  act(() => result.current.dispatch({ type: "close" }));
  advance(DRAWER_TIMING.poster);
  expect(result.current.drawer.project).toBeNull();
  act(() => result.current.dispatch({ type: "hover", project: second }));
  advance(40);
  expect(result.current.drawer.state).toBe("peek");
  expect(result.current.drawer.mode).toBe("peek");
});

test("leaving during a queued swap does not reveal a stale card", () => {
  const { result } = renderHook(useProjectDrawer);
  act(() => result.current.dispatch({ type: "hover", project: first }));
  advance(40);
  act(() => result.current.dispatch({ type: "hover", project: second }));
  act(() => result.current.dispatch({ type: "leave" }));
  advance(1500);
  expect(result.current.drawer.project).toBeNull();
  expect(result.current.drawer.state).toBe("closed");
});
