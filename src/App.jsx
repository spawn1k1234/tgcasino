import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Проверяем, что WebApp Telegram загружен
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand(); // Раскрываем на весь экран

      // Данные пользователя (если есть)
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUserData({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name || "Не указано",
          username: user.username || "Не указан",
          photoUrl: user.photo_url || "https://via.placeholder.com/100",
        });
      } else {
        console.error("Данные пользователя не получены!");
      }
    } else {
      console.error("WebApp Telegram не инициализирован!");
    }
  }, []);

  // Если данных нет — показываем загрузку
  if (!userData) {
    return (
      <div className="app">
        <h1>Загрузка данных...</h1>
        <p>Пожалуйста, подождите.</p>
      </div>
    );
  }

  // Если данные есть — выводим их
  return (
    <div className="app">
      <h1>Ваш профиль</h1>
      <img src={userData.photoUrl} alt="Аватар" width={100} height={100} />
      <p>
        <strong>ID:</strong> {userData.id}
      </p>
      <p>
        <strong>Имя:</strong> {userData.firstName}
      </p>
      <p>
        <strong>Фамилия:</strong> {userData.lastName}
      </p>
      <p>
        <strong>Username:</strong> @{userData.username}
      </p>
    </div>
  );
}

export default App;
