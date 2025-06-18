import { useEffect, useState } from "react";
import UserInfo from "./components/UserInfo";
import "./styles.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand(); // Раскрываем на весь экран

      // Проверяем данные (оба варианта)
      console.log("initData:", tg.initData); // Закодированная строка
      console.log("initDataUnsafe.user:", tg.initDataUnsafe?.user); // Готовый объект

      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      } else {
        console.error("Данные пользователя не пришли!");
      }
    }
  }, []);

  return (
    <div className="app">
      <h1>Telegram Mini App</h1>
      {user ? <UserInfo user={user} /> : <p>Loading user data...</p>}
    </div>
  );
}

export default App;
