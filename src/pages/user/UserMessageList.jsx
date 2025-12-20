// src/pages/user/UserMessageList.jsx
import UserList from "@components/user/UserList";
import {dummyUsers} from "@utils/dummyData";
import { useNavigate } from "react-router-dom";

export default function UserMessageList() {
  const navigate = useNavigate();

  const handleSelectUser = (id) => {
    navigate(`/user/messages/${id}`);
  };

  return (
    <UserList
      users={dummyUsers}
      activeUserId={null}
      onSelectUser={handleSelectUser}
      getStatusIcon={() => null}
      getStatusColor={() => "gray"}
    />
  );
}
