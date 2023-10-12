const INITIAL_STATE = {
  user: null,
  users: [],
  token: null,
  error: false,
  isLoading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const cases = {
    loginUser: {
      ...state,
      user: action.payload?.userDb,
      token: action.payload?.token,
      error: false,
    },
    loginError: { ...INITIAL_STATE, error: action.payload },

    registerUser: { ...state, user: action.payload, error: false },
    registerError: { ...INITIAL_STATE, error: action.payload },

    logoutUser: { ...INITIAL_STATE },
    logoutError: { ...INITIAL_STATE, error: action.payload },

    putUser: { ...state, user: action.payload, error: false },
    putUserError: { ...state, error: action.payload },

    putUsers: { ...state, users: action.payload, error: false },
    putUsersError: { ...state, error: action.payload },

    deleteUser: {
      ...state,
      users: state.users.filter((user) => user._id !== action.payload),
    },
    deleteUserError: { ...state, error: action.payload },

    getAllUsers: {
      ...state,
      users: action.payload,
      error: false,
    },
    getAllUsersError: { ...state, error: action.payload },

    userChecksession: {
      ...state,
      user: action.payload?.userDb,
      token: action.payload?.token,
      error: false,
    },
  };

  return cases[action.type] || state;
};

export default authReducer;
