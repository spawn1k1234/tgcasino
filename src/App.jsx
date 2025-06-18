import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    // 1. Проверяем, что мы в Telegram
    if (!window.Telegram?.WebApp) {
      setStatus("error:not_telegram");
      return;
    }

    const tg = window.Telegram.WebApp;
    tg.expand();

    // 2. Проверяем данные пользователя
    if (!tg.initDataUnsafe?.user) {
      setStatus("error:no_data");
      return;
    }

    // 3. Всё OK - сохраняем данные
    setUser({
      id: tg.initDataUnsafe.user.id,
      name: [
        tg.initDataUnsafe.user.first_name,
        tg.initDataUnsafe.user.last_name,
      ]
        .filter(Boolean)
        .join(" "),
      username: tg.initDataUnsafe.user.username || "нет",
      photo:
        tg.initDataUnsafe.user.photo_url || "https://via.placeholder.com/200",
    });
    setStatus("success");
  }, []);

  // Статусы
  if (status === "error:not_telegram") {
    return (
      <div style={{ padding: 20 }}>
        <h1>🚫 Ошибка</h1>
        <p>Откройте приложение через Telegram-бота:</p>
        <a href="https://t.me/smartakwabot?startapp=webapp">@smartakwabot</a>
      </div>
    );
  }

  if (status === "error:no_data") {
    return (
      <div style={{ padding: 20 }}>
        <h1>🔐 Нет доступа</h1>
        <p>1. Проверьте домен в @BotFather</p>
        <p>2. Откройте через кнопку в боте</p>
      </div>
    );
  }

  if (!user) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <img src={user.photo} width={100} style={{ borderRadius: "50%" }} />
      <h1>{user.name}</h1>
      <p>@{user.username}</p>
      <p>ID: {user.id}</p>
    </div>
  );
}
