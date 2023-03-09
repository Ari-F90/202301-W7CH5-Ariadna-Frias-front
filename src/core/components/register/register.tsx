/* eslint-disable @typescript-eslint/no-unused-vars */
import { SyntheticEvent, useMemo } from "react";
import { useUsers } from "../../../feature/hooks/use.users";
import { UserApiRepo } from "../../../feature/services/repository/user.api.repo";

import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseConfig } from "../../../feature/services/repository/firebase/firebase";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
let pictureName: string = "picture.png";
const storageRef = ref(storage, pictureName);
let urlUserPicture: string = "";

export default function Register() {
  const repo = useMemo(() => new UserApiRepo(), []);

  const { createUser } = useUsers(repo);
  const handleSubmit = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = ev.currentTarget;

    const fileUserPicture = (formData[3] as HTMLInputElement).files?.item(0);

    if (fileUserPicture) {
      pictureName = `${(formData[0] as HTMLFormElement).value}.png`;
      await uploadBytes(storageRef, fileUserPicture);

      urlUserPicture = await getDownloadURL(storageRef);
    }

    const newUser = {
      userName: (formData[0] as HTMLInputElement).value,
      email: (formData[1] as HTMLInputElement).value,
      password: (formData[2] as HTMLInputElement).value,
      picture: urlUserPicture,
    };

    createUser(newUser);
    pictureName = "";
    urlUserPicture = "";
    formData.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input type="text" name="userName" required />
      </label>

      <label>
        Email
        <input type="email" name="email" required />
      </label>

      <label>
        Password
        <input type="password" name="password" required />
      </label>
      <label>
        Photo
        <input type="file" name="photo" required />
      </label>

      <button type="submit">Register</button>
    </form>
  );
}
