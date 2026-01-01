import { useState, useEffect } from "react";

//icon imports
import { CiSearch } from "react-icons/ci";
import { FaFacebook, FaLinkedin, FaYoutube, FaTwitter, FaInstagram  } from "react-icons/fa";

//style sheet
import "./App.css";

function NavBar({ onToggleTheme, isDark }) {
  return (
    <header className="top-nav">
      <div className="logo">
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
      <nav className="main-menu">
        <a href="#home">Home</a>
        <a href="#friends">Friends</a>
        <a href="#about">About</a>
        <button className="btn-primary" onClick={onToggleTheme}>
          {isDark ? "Light mode" : "Dark mode"}
        </button>
      </nav>
    </header>
  );
}

function FriendCard({ friend, onToggleFavorite }) {
  return (
    <div
      className={
        "friend-card" + (friend.isFavorite ? " friend-card-favorite" : "")
      }
      onClick={() => onToggleFavorite(friend.id)}
    >
      <div className="add-icon">{friend.isFavorite ? "★" : "+"}</div>
      <div className={friend.avatarClass} />
      <h2>{friend.name}</h2>
      <p>{friend.game}</p>
      <p>{friend.description}</p>
    </div>
  );
}

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
      name: "Lib_Lab_lub",
      game: "Main Game: Fortnite",
      description: "Number 1 victory royale. Yeah fortnite we bout to get down. 10 kills on the board right now. Just wiped out tomato town.",
      avatarClass: "Libavatar",
      isFavorite: false,
    },
  ]);

  // Simple useEffect for the assignment: log whenever favorites change
  useEffect(() => {
    const favoriteNames = friends
      .filter((f) => f.isFavorite)
      .map((f) => f.name)
      .join(", ");
    console.log("Favorite friends:", favoriteNames || "none");
  }, [friends]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleToggleFavorite = (id) => {
    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === id
          ? { ...friend, isFavorite: !friend.isFavorite }
          : friend
      )
    );
  };

  const favoriteCount = friends.filter((f) => f.isFavorite).length;

  return (
    <div className={isDark ? "app app-dark" : "app"}>
      <NavBar onToggleTheme={handleToggleTheme} isDark={isDark} />

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay">
            <button className="search-game-btn">
              Search By Game <CiSearch />
            </button>
          </div>
        </section>

        <section className="friends-suggest" id="friends">
          <h1>You may enjoy playing with:</h1>
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
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span> Made for gamers by the ultimate gamer: Alivia Wynn</span>
        <div className="socials">
          <a href="#facebook"><FaFacebook /></a>
          <a href="#twitter"><FaTwitter /></a>
          <a href="#insta"><FaInstagram /></a>
          <a href="#youtube"><FaYoutube /></a>
          <a href="#linkedin"><FaLinkedin /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
