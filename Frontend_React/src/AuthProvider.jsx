import { useState, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isloggedin, setisloggedin] = useState(
    !!localStorage.getItem('accessToken')
  );

  return (
    <AuthContext.Provider value={{ isloggedin, setisloggedin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
