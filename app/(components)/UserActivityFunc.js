import axios from "axios";

export default async function UserActivityFunc(message, userName, userEmail) {
  let body = {
    message: message,
    userName: userName,
    userEmail: userEmail,
  };

  try {
    if (message === "User logged In") {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/add-user-activity`,
        body
      );
     
      return;
    } else {
      const res = await axios.post(`/api/add-user-activity`, body);
     
      return;
    }
  } catch (err) {
    console.log(err);
    return;
  }
}
