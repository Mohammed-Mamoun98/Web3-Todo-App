import { useState, useEffect } from 'react';

const DEFAULT_ERROR = 'Internal Server Error';

export const usePromise = (promiseFunction = () => {}, baseConfig = {}) => {
  const [hookState, setHookState] = useState({
    response: baseConfig?.defaultRes,
    loading: false,
    error: '',
  });

  const updateHookState = (newState = {}) => {
    setHookState({ ...hookState, ...newState });
  };

  const updateResponse = (res) => updateHookState({ response: res });

  function executePromise(...params) {
    updateHookState({ loading: true });
    try {
      const onSuccess = params?.find((param) => param?.onSuccess)?.onSuccess || baseConfig?.onSuccess;

      promiseFunction(...params)
        .then((value) => {
          updateHookState({ response: value, loading: false });
          onSuccess?.(value);
        })
        .catch((err) => {
          const errorMessage = err?.message || err || DEFAULT_ERROR;
          updateHookState({ error: errorMessage, loading: false });
          baseConfig.onError?.(errorMessage);
        //   if (baseConfig.showError) dispatch(createNotification('error', errorMessage, 4000));
        });
    } catch (error) {
      updateHookState({ error, loading: false });
    //   if (baseConfig.showError) dispatch(createNotification('error', 'errorMessage', 4000));
    }
  }
  useEffect(() => {
    if (baseConfig.initReq) executePromise();
  }, []);

  const { response, loading, error, reqCount = 0 } = hookState;
  return [executePromise, response, loading, error, reqCount, updateResponse];
};
