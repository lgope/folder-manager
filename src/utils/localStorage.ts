// REDUX TOOLKIT STORE MIDDLEWARE
export const localStorageMiddleware = ({ getState }: { getState: any }) => {
  return (next: any) => (action: any) => {
    const result = next(action);
    // console.log({gs: getState()})
    localStorage.setItem("applicationState", JSON.stringify(getState()));
    return result;
  };
};

export const reHydrateStore = () => {
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState") || "{}"); // re-hydrate the store
  }
};
