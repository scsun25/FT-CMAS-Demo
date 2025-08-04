/**
 * Reusable hook to control the global progress spinner from any component.
 * Usage:
 *   const { setLoading } = useGlobalProgress();
 *   setLoading(true); // show spinner
 *   setLoading(false); // hide spinner
 */
export const updateGlobalProgressSpinner = (
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  time?: number
) => {
  setTimeout(
    () => {
      setLoading(loading);
    },
    time ? time : 0
  );
};
