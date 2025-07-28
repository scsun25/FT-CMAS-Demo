import { useProgress } from '../context/ProgressContext';

/**
 * Reusable hook to control the global progress spinner from any component.
 * Usage:
 *   const { setLoading } = useGlobalProgress();
 *   setLoading(true); // show spinner
 *   setLoading(false); // hide spinner
 */
export const updateGlobalProgressSpinner = (loading: boolean) => {
  const { setLoading } = useProgress();
  setLoading(loading);
};
