import type { FC, ReactNode } from "react";
import { createContext, useCallback, useEffect, useReducer } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { authApi } from "../api/auth-api";
import type { User } from "../types/user";
import type { SignInOptions, SignUpOptions } from "../types/auth";
import axios from "../utils/axios";

const STORAGE_KEY = "at";

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  //isTwoFactorAuthenticated: boolean;
  user: User | null;
}

export interface AuthContextValue extends State {
  platform: "JWT";
  getCurrentUser: () => Promise<void>;
  signIn: (options: SignInOptions) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (options: SignUpOptions) => Promise<void>;
  //twoFactorAuthenticate: (options: TwoFactorOptions) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

enum ActionType {
  INITIALIZE = "INITIALIZE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
  TWOFACTOR = "TWOFACTOR",
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    //isTwoFactorAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: ActionType.LOGIN;
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: ActionType.LOGOUT;
};

type RegisterAction = {
  type: ActionType.REGISTER;
  payload: {
    user: User;
  };
};

type TwoFactorAction = {
  type: ActionType.TWOFACTOR;
};

type Action =
  | InitializeAction
  | LoginAction
  | LogoutAction
  | RegisterAction
  | TwoFactorAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  //isTwoFactorAuthenticated: false,
  user: null,
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    //const { isAuthenticated, isTwoFactorAuthenticated, user } = action.payload;
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      //isTwoFactorAuthenticated,
      user,
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      //isTwoFactorAuthenticated: false,
      user,
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    //isTwoFactorAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: State, action: RegisterAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  TWOFACTOR: (state: State): State => {
    return {
      ...state,
      //isTwoFactorAuthenticated: true,
    };
  },
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: "JWT",
  getCurrentUser: () => Promise.resolve(),
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  //twoFactorAuthenticate: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const accessToken = globalThis.localStorage.getItem(STORAGE_KEY);

      if (accessToken && isTokenValid(accessToken)) {
        setSession(accessToken);

        const user = await authApi.me();

        dispatch(
          // user?.isLockedOut
          //   ? {
          //       type: ActionType.INITIALIZE,
          //       payload: {
          //         isAuthenticated: false,
          //        // isTwoFactorAuthenticated: false,
          //         user: null,
          //       },
          //     }
          //   :
          {
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              //isTwoFactorAuthenticated: true,
              user,
            },
          }
        );

        // if (user?.isLockedOut) {
        //   setSession(null);
        // }
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            //isTwoFactorAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          //isTwoFactorAuthenticated: false,
          user: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, []);

  const isTokenValid = (accessToken: string) => {
    if (!accessToken) {
      return false;
    }

    const decoded = jwtDecode<JwtPayload>(accessToken);
    const currentTime = Date.now() / 1000;

    if (decoded.exp) {
      return decoded.exp > currentTime;
    }

    return false;
  };

  const setSession = (accessToken: string | null) => {
    if (accessToken) {
      globalThis.localStorage.setItem(STORAGE_KEY, accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      globalThis.localStorage.removeItem(STORAGE_KEY);
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const getCurrentUser = async (): Promise<void> => {
    try {
      const user = await authApi.me();

      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: true,
          //isTwoFactorAuthenticated: true,
          user,
        },
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          //isTwoFactorAuthenticated: false,
          user: null,
        },
      });
    }
  };

  const signIn = useCallback(
    async (options: SignInOptions): Promise<void> => {
      const user = await authApi.signIn(options);
      const { accessToken } = user;

      setSession(accessToken);

      dispatch({
        type: ActionType.LOGIN,
        payload: {
          user,
        },
      });
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (options: SignUpOptions) => {
      const user = await authApi.signUp(options);
      const { accessToken } = user;

      globalThis.localStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: ActionType.REGISTER,
        payload: {
          user: user,
        },
      });
    },
    [dispatch]
  );

  const signOut = useCallback(async (): Promise<void> => {
    return new Promise(() => {
      setTimeout(() => {
        setSession(null);
        dispatch({ type: ActionType.LOGOUT });
      }, 0);
    });
  }, [dispatch]);

  //   const twoFactorAuthenticate = async (options: TwoFactorOptions) => {
  //     const user = await authApi.verifyTwoFactorAuthentication(options);
  //     const { accessToken } = user;

  //     setSession(accessToken);

  //     dispatch({
  //       type: ActionType.TWOFACTOR,
  //     });
  //   };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "JWT",
        getCurrentUser,
        signIn,
        signOut,
        signUp,
        //twoFactorAuthenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
