import { useEffect, useState } from "react";
import UserInfo from "./components/UserInfo";
import "./styles.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверяем, что Telegram WebApp инициализирован
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand(); // Раскрываем приложение на весь экран
      setUser(tg.initDataUnsafe?.user); // Получаем данные пользователя
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
