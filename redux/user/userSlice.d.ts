// ../../redux/user/userSlice.d.ts

interface UserState {
  currentUser: string | null;
  error: string | null;
  loading: boolean;
}

export const userSlice: import("@reduxjs/toolkit").Slice<
  UserState,
  {
    signInStart: () => AnyAction;
    signInSuccess: (payload: string) => AnyAction;
    signInFailure: (payload: string) => AnyAction;
    updateUserStart: () => AnyAction;
    updateUserSuccess: (payload: string) => AnyAction;
    updateUserFailure: (payload: string) => AnyAction;
    deleteUserStart: () => AnyAction;
    deleteUserSuccess: (payload: string) => AnyAction;
    deleteUserFailure: (payload: string) => AnyAction;
    signOutUserStart: () => AnyAction;
    signOutUserSuccess: (payload: string) => AnyAction;
    signOutUserFailure: (payload: string) => AnyAction;
  }
>;

export const signInStart: () => AnyAction;
export const signInSuccess: (payload: string) => AnyAction;
export const signInFailure: (payload: string) => AnyAction;
export const updateUserStart: () => AnyAction;
export const updateUserSuccess: (payload: string) => AnyAction;
export const updateUserFailure: (payload: string) => AnyAction;
export const deleteUserStart: () => AnyAction;
export const deleteUserSuccess: (payload: string) => AnyAction;
export const deleteUserFailure: (payload: string) => AnyAction;
export const signOutUserStart: () => AnyAction;
export const signOutUserSuccess: (payload: string) => AnyAction;
export const signOutUserFailure: (payload: string) => AnyAction;
