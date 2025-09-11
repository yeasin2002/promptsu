'use client';

import { authClient } from '@/lib/auth-client';

const Profile = () => {
  const { data } = authClient.useSession();
  console.log(data);
  return (
    <div>
      <h1>User</h1>
      <div>
        <p>Name: {data?.user?.name}</p>
        <p>Email: {data?.user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
