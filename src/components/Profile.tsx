import { useAuth } from "../context/useAuth.ts";
import { useEffect } from "react";

const Profile = () => {
  const { token } = useAuth();

  // TODO: <StrictMode> causes this to be invoked twice. Should I be using useEffect() to make my API calls?
  useEffect(() => {
    if (token) {
      // Make API calls with the token
      // fetch('/api/some-endpoint', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      //   .then(response => response.json())
      //   .then(data => console.log(data))
      //   .catch(error => console.error('Error:', error));

      console.log("Making API calls with token:", token);
    }
  }, [token]);

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome to the profile page!</p>
    </div>
  );
};

export default Profile;
