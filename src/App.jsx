import { useState, useEffect } from "react";

// icon imports
import { CiSearch } from "react-icons/ci";
import { FaFacebook, FaLinkedin, FaYoutube, FaTwitter, FaInstagram} from "react-icons/fa";

// style sheet
import "./App.css";

// react-router
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// New User Page

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(
          "https://disc-assignment-5-users-api-iyct.onrender.com/api/users"
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="users-loading">Loading users...</p>;
  }

  if (error) {
    return <p className="users-error">Failed to load users: {error}</p>;
  }

  return (
    <section className="users-page">
      <h1>All Users</h1>
      <p className="users-subtitle">Loaded from the users API.</p>
      <div className="users-grid">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            {user.profilePicture && (
              <img
                src={user.profilePicture}
                alt={`${user.firstName} ${user.lastName}`}
                className="user-avatar"
              />
            )}
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p className="user-email">{user.email}</p>
            <p className="user-major">
              {user.major} · Class of {user.graduationYear}
            </p>
            <p className="user-bio">{user.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

//pre-existing content components

function NavBar({ onToggleTheme, isDark }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="top-nav navbar navbar-expand-md">
      <div className="logo navbar-brand">
      <span class="logo-icon">
            <svg
              width="61"
              height="54"
              viewBox="0 0 61 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 15.25C0 11.2054 1.60669 7.32655 4.46662 4.46662C7.32655 1.60669 11.2054 0 15.25 0H45.75C49.7946 0 53.6735 1.60669 56.5334 4.46662C59.3933 7.32655 61 11.2054 61 15.25V53.375C56.6055 53.3759 52.3457 51.8585 48.9414 49.0795C45.5372 46.3005 43.1977 42.4307 42.3188 38.125H18.6812C17.8024 42.4307 15.4628 46.3005 12.0586 49.0795C8.65433 51.8585 4.39449 53.3759 0 53.375L0 15.25ZM50.5233 19.0625C50.5233 20.3279 50.0206 21.5415 49.1258 22.4363C48.231 23.3312 47.0173 23.8338 45.7519 23.8338C44.4865 23.8338 43.2729 23.3312 42.3781 22.4363C41.4833 21.5415 40.9806 20.3279 40.9806 19.0625C40.9806 17.7976 41.4831 16.5844 42.3775 15.69C43.2719 14.7956 44.4851 14.2931 45.75 14.2931C47.0149 14.2931 48.2281 14.7956 49.1225 15.69C50.0169 16.5844 50.5233 17.7976 50.5233 19.0625ZM15.25 23.8319C15.8874 23.85 16.522 23.74 17.1162 23.5085C17.7104 23.277 18.2521 22.9287 18.7093 22.4842C19.1666 22.0398 19.53 21.5081 19.7782 20.9207C20.0264 20.3333 20.1543 19.7021 20.1543 19.0644C20.1543 18.4267 20.0264 17.7955 19.7782 17.2081C19.53 16.6207 19.1666 16.0891 18.7093 15.6446C18.2521 15.2001 17.7104 14.8518 17.1162 14.6203C16.522 14.3888 15.8874 14.2788 15.25 14.2969C14.0191 14.3461 12.8549 14.8698 12.0014 15.7581C11.1479 16.6464 10.6712 17.8306 10.6712 19.0625C10.6712 20.2944 11.1479 21.4786 12.0014 22.3669C12.8549 23.2552 14.0191 23.7827 15.25 23.8319Z"
                fill="#5B3B8C"
              />
            </svg>
          </span>
        <span>Cats on Console</span>
      </div>

      {/* Hamburger button (shows below md breakpoint) */}
      <button
        className="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* Collapsible nav links + dark mode button */}
      <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
        <nav className="main-menu navbar-nav ms-auto">
          <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link className="nav-link" to="/users" onClick={() => setIsOpen(false)}>
            Users
          </Link>
          <a className="nav-link" href="#about" onClick={() => setIsOpen(false)}>
            About
          </a>
          <button
            className="btn-primary nav-btn"
            type="button"
            onClick={onToggleTheme}
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </nav>
      </div>
    </header>
  );
}


function FriendCard({ friend, onToggleFavorite }) {
  return (
    <div
      className={
        friend.isFavorite ? "friend-card friend-card-favorite" : "friend-card"
      }
      onClick={() => onToggleFavorite(friend.id)}
    >
      <div className={friend.avatarClass}></div>
      <h2>{friend.name}</h2>
      <p>{friend.game}</p>
      <p>{friend.description}</p>
    </div>
  );
}

// app is now the home page 

function HomePage({ isDark, onToggleTheme, friends, favoriteCount, onToggleFavorite,}) {
  return (
    <>
      <NavBar onToggleTheme={onToggleTheme} isDark={isDark} />

      <main>
        {/* HERO SECTION */}
        <section className="hero" id="home">
          <div className="hero-overlay">
            <button className="search-game-btn">
              Search By Game <CiSearch />
            </button>
          </div>
        </section>

        {/* FRIENDS SECTION */}
        <section className="friends-suggest" id="friends">
          <h1>You may enjoy playing with</h1>
          <p className="friends-subtitle">
            Click a card to add or remove it from your favorites list.
          </p>
          <p className="favorites-counter">
            Favorites selected: {favoriteCount}
          </p>
          <div className="friend-cards">
            {friends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Made for gamers by the ultimate gamer Alivia Wynn</span>
        <div className="socials">
          <a href="https://facebook.com">
            <FaFacebook />
          </a>
          <a href="https://twitter.com">
            <FaTwitter />
          </a>
          <a href="https://instagram.com">
            <FaInstagram />
          </a>
          <a href="https://youtube.com">
            <FaYoutube />
          </a>
          <a href="https://linkedin.com">
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </>
  );
}

// App with router shell

function App() {
  const [isDark, setIsDark] = useState(false);
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "TS_Dorris",
      game: "Main Game: Mortal Kombat",
      description: "Bayaneta Main",
      avatarClass: "TSavatar",
      isFavorite: false,
    },
    {
      id: 2,
      name: "Sojo",
      game: "Main Game: Minecraft",
      description: "So we back in the mines!",
      avatarClass: "Sojoavatar",
      isFavorite: false,
    },
    {
      id: 3,
      name: "LibLablub",
      game: "Main Game: Fortnite",
      description:
        "Number 1 victory royale. Yeah fortnite we bout to get down.",
      avatarClass: "Libavatar",
      isFavorite: false,
    },
  ]);

  useEffect(() => {
    const favoriteNames = friends
      .filter((f) => f.isFavorite)
      .map((f) => f.name)
      .join(", ");
    console.log("Favorite friends:", favoriteNames);
  }, [friends]);

  const handleToggleTheme = () => setIsDark((prev) => !prev);

  const handleToggleFavorite = (id) => {
    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === id ? { ...friend, isFavorite: !friend.isFavorite } : friend
      )
    );
  };

  const favoriteCount = friends.filter((f) => f.isFavorite).length;

  return (
    <BrowserRouter>
      <div className={isDark ? "app app-dark" : "app"}>
        {/* Routes decide what shows under the nav */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isDark={isDark}
                onToggleTheme={handleToggleTheme}
                friends={friends}
                favoriteCount={favoriteCount}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
