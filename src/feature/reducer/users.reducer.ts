import { createReducer } from "@reduxjs/toolkit";
import { User } from "../models/user";
import * as ac from "./users.actions.creators";

export type State = {
  loggedUser: User;
  users: User[];
};

const initialState: State = {
  users: [],
  loggedUser: {} as User,
};

export const usersReducer = createReducer(initialState, (builder) => {
  builder.addCase(ac.readAllCreator, (state, { payload }) => {
    return { ...state, users: payload };
  });

  builder.addCase(ac.readOneCreator, (state, { payload }) => {
    return { ...state, users: payload };
  });

  builder.addCase(ac.updateCreator, (state, { payload }) => {
    const info = [...state.users];
    const data = info.map((item) =>
      item.id === payload.id ? { ...item, ...payload } : item
    );
    return { ...state, users: data };
  });

  builder.addCase(ac.createCreator, (state, { payload }) => {
    return { ...state, users: [...state.users, payload] };
  });

  builder.addCase(ac.deleteCreator, (state, { payload }) => {
    const data = state.users.filter((item) => item.id !== payload);
    return { ...state, users: data };
  });

  builder.addCase(ac.logUserCreator, (state, { payload }) => {
    return { ...state, loggedUser: payload };
  });

  builder.addDefaultCase((state) => state);
});
