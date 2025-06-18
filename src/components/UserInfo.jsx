export default function UserInfo({ user }) {
  return (
    <div className="user-info">
      <img src={user.photo_url} alt="User Avatar" className="avatar" />
      <p>
        👤{" "}
        <strong>
          {user.first_name} {user.last_name || ""}
        </strong>
      </p>
      <p>
        🆔 <strong>ID:</strong> {user.id}
      </p>
      <p>
        🔹 <strong>Username:</strong> @{user.username || "none"}
      </p>
    </div>
  );
}
