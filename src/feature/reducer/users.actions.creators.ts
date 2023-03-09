import { createAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { usersActions } from "./users.actions";

export const readAllCreator = createAction<User[]>(usersActions.readAll);
export const readOneCreator = createAction<User[]>(usersActions.readOne);
export const updateCreator = createAction<Partial<User>>(usersActions.update);
export const createCreator = createAction<User>(usersActions.create);
export const deleteCreator = createAction<User["id"]>(usersActions.delete);
export const logUserCreator = createAction<User>(usersActions.logUser);
