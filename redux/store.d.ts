export const store: import("@reduxjs/toolkit").Store<any, any>;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
