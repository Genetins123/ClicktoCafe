import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);

  // Load userId from localStorage if logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined" && storedUser.trim() !== "") {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed._id) {
          setUserId(parsed._id);
        } else {
          setUserId(null);
        }
      } catch (err) {
        console.error("Error parsing user in FavoritesContext:", err);
        setUserId(null);
      }
    } else {
      setUserId(null);
    }
  }, []);

  // Load favorites when userId changes
  useEffect(() => {
    if (userId) {
      try {
        const stored = localStorage.getItem(`favorites_${userId}`);
        setFavorites(stored && stored !== "undefined" ? JSON.parse(stored) : []);
      } catch (err) {
        console.error("Error parsing favorites:", err);
        setFavorites([]);
      }
    } else {
      setFavorites([]); // clear if no user
    }
  }, [userId]);

  // Save favorites to user-specific key
  useEffect(() => {
    if (userId) {
      try {
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
      } catch (err) {
        console.error("Error saving favorites:", err);
      }
    }
  }, [favorites, userId]);

  const toggleFavorite = (food) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item._id === food._id);
      if (exists) {
        return prev.filter((item) => item._id !== food._id);
      } else {
        return [...prev, food];
      }
    });
  };

  // Called after login
  const loginUser = (user) => {
    if (user && user._id) {
      setUserId(user._id);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  // Called on logout
  const logoutUser = () => {
    setUserId(null);
    setFavorites([]);
    localStorage.removeItem("user");
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, loginUser, logoutUser, userId }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
