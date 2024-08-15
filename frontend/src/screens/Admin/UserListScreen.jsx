import { FaTrash, FaTimes, FaEdit, FaCheck } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const deletedUser = await deleteUser(id);
        if (deletedUser.error) {
          toast.error("Cannot delete");
        } else {
          toast.success("User deleted");
        }
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="h-[100%]  overflow-auto">
      {loadingDelete && <Loader />}
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message></Message>
      ) : (
        <div>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message>{error?.data?.message || error.error}</Message>
          ) : (
            <div>
              <table className="w-full lg:w-4/6 text-center ">
                <thead>
                  <tr className="border-b-2">
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr className="odd:bg-gray-300" key={user._id}>
                      <td className="py-2 w-fit">{user._id}</td>
                      <td className="py-2">{user.name}</td>
                      <td className="py-2">{user.email}</td>
                      <td className="py-2">
                        <Button
                          onClick={null}
                          background=""
                          additionalClasses={"flex mx-auto"}
                        >
                          {user.isAdmin ? (
                            <FaCheck style={{ color: "green" }} />
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </Button>
                      </td>
                      <td className="py-2">
                        <Link to={`/admin/userlist/${user._id}/edit`}>
                          <div className="flex justify-center">
                            <FaEdit />
                          </div>
                        </Link>
                      </td>
                      <td className="py-2">
                        <Button
                          onClick={() => deleteHandler(user._id)}
                          background=""
                          additionalClasses={"flex mx-auto"}
                        >
                          <FaTrash style={{ color: "black" }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserListScreen;
