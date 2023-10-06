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
  }
>;

export const signInStart: () => AnyAction;
export const signInSuccess: (payload: string) => AnyAction;
export const signInFailure: (payload: string) => AnyAction;
