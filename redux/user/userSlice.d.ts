// ../../redux/user/userSlice.d.ts

interface UserState {
  currentUser: string | null;
  error: string | null;
  loading: boolean;
}

export const userSlice: import("@reduxjs/toolkit").Slice<
  UserState,
  {
    signInStart: () => void;
    signInSuccess: (payload: string) => void;
    signInFailure: (payload: string) => void;
  }
>;

export const signInStart: () => void;
export const signInSuccess: (payload: string) => void;
export const signInFailure: (payload: string) => void;
