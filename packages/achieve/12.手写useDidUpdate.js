// useDidUpdate((preProps, prevState) => {});

function usePreious(state) {
  const ref = useRef();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}

export function useDidUpdate(effect, props, state) {
  const isFirstRender = useRef(true);
  const preProps = usePreious(props);
  const preState = usePreious(state);

  useEffect(() => {
    if (!isFirstRender.current) effect(preProps, preState);
    return () => {};
  });

  if (isFirstRender.current) isFirstRender.current = false;
}

// demo...
export default function App() {
  const [count, setCount] = useState(1);

  useDidUpdate(
    (prevProps, prevState) => {
      console.log('prevState', prevState);
    },
    undefined,
    count
  );

  return <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>;
}
