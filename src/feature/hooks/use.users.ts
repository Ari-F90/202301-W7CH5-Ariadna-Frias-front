import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import * as ac from "../reducer/users.actions.creators";
import { useEffect } from "react";
import { UserApiRepo } from "../services/repository/user.api.repo";
import { User } from "../models/user";

export function useUsers(repo: UserApiRepo) {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const readAllUsers = async () => {
      try {
        const data = await repo.readAllUsers();
        dispatch(ac.readAllCreator(data.results));
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    readAllUsers();
  }, [dispatch, repo]);

  const readUser = async (id: string) => {
    try {
      const data = await repo.readOneUser(id);
      dispatch(ac.readOneCreator(data.results));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const createUser = async (info: Partial<User>) => {
    try {
      const data = await repo.create(info, "register");
      dispatch(ac.createCreator(data.results[0]));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const updateUser = async (
    info: Partial<User>,
    token: string,
    action: string
  ) => {
    try {
      const data = await repo.update(info, token, action);
      dispatch(ac.updateCreator(data.results[0]));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const deleteUser = async (id: string, token: string) => {
    try {
      await repo.delete(id, token);
      dispatch(ac.deleteCreator(id));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const loginUser = async (info: Partial<User>) => {
    try {
      const data = await repo.create(info, "login");
      dispatch(ac.logUserCreator(data.results[0]));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return {
    users,
    readUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
  };
}
