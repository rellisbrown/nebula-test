import {
  useEffect,
  useCallback,
  createContext,
  useMemo,
  useState,
} from 'react';
import QlikConnector from './qlikConnector';
import qlikConfig from './qlikConfig';
import nebulaConfig from './nebulaConfig';

const QlikContext = createContext({});

const QlikContextProvider = ({ children }) => {
  const [global, setGlobal] = useState(undefined);
  const [doc, setDoc] = useState(undefined);
  // eslint-disable-next-line
  const [error, setError] = useState(undefined); // could be used for error handling when setting up the intial qlik connection
  const [loading, setLoading] = useState(false);

  const [nebula, setNebula] = useState(null);

  const getQlik = useCallback(async () => {
    let qGlobal;
    let qDoc;
    setLoading(true);

    try {
      const res = await QlikConnector(qlikConfig);
      qGlobal = res.qGlobal;
      qDoc = res.qDoc;
    } catch (e) {
      setError(e);
    }
    setGlobal(qGlobal);
    setDoc(qDoc);
    setLoading(false);
  }, [setDoc, setError, setGlobal, setLoading]);

  const getNebula = useCallback(async () => {
    const nebula = nebulaConfig(doc);
    setNebula(nebula);
  }, [doc]);

  useEffect(() => {
    if ((global === undefined || doc === undefined) && !loading) {
      getQlik();
    }
    if (doc && !nebula) {
      getNebula();
    }
  }, [global, doc, nebula, getQlik, getNebula, loading]);

  const contextValue = useMemo(
    () => ({
      global,
      doc,
      nebula,
      error,
    }),
    [global, doc, error, nebula]
  );

  return (
    <QlikContext.Provider value={contextValue}>{children}</QlikContext.Provider>
  );
};

export { QlikContext, QlikContextProvider };
