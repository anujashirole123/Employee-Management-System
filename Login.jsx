import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

  // Create stars
  useEffect(() => {
    const tempStars = [];
    for (let i = 0; i < 50; i++) {
      tempStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5
      });
    }
    setStars(tempStars);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      alert(`Logged in as ${username}${remember ? " (Remember Me checked)" : ""}`);
      navigate("/home");
    } else {
      alert("Please enter username and password!");
    }
  };

  const handleSocialLogin = (platform) => {
    let url = "";
    if (platform === "google") url = "https://accounts.google.com/signin";
    if (platform === "facebook") url = "https://www.facebook.com/login";
    if (platform === "twitter") url = "https://twitter.com/login";
    window.open(url, "_blank");
  };

  return (
    <>
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #191827, #17071a);
          overflow: hidden;
        }

        /* Star animation */
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: twinkle 3s infinite alternate;
        }

        @keyframes twinkle {
          0% { opacity: 0.2; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(-2px); }
          100% { opacity: 0.2; transform: translateY(2px); }
        }

        .welcome-heading {
          font-size: 36px;
          font-weight: 700;
          color: #f1eaf1;
          margin-bottom: 20px;
          text-align: center;
          text-shadow: 2px 2px 5px rgba(0,0,0,0.4);
          animation: headingFade 1.5s ease forwards;
          opacity: 0;
        }

        @keyframes headingFade {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .login-card {
          width: 380px;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 12px 25px rgba(0,0,0,0.5);
          background: rgba(17,17,59,0.9);
          text-align: center;
          animation: slideFadeIn 1s ease forwards;
          opacity: 0;
          color: #fff;
          position: relative;
          z-index: 1;
        }

        @keyframes slideFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-form { display: flex; flex-direction: column; gap: 15px; }

        .login-form input {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #fff;
          font-size: 16px;
          transition: all 0.3s ease;
          background: rgba(5, 2, 2, 0.2);
          color: #fff;
        }

        .login-form input::placeholder { color: #eee; }

        .login-form input:focus {
          border-color: #ff69b4;
          box-shadow: 0 0 6px rgba(255,105,180,0.5);
          outline: none;
        }

        .password-container { position: relative; }
        .toggle-password {
          position: absolute; right: 10px; top: 50%;
          transform: translateY(-50%);
          cursor: pointer; color: #fff; font-size: 14px;
        }
        .toggle-password:hover { color: #ffb6c1; }

        .remember-forgot {
          display: flex;
          justify-content: space-between;
          font-size: 14px; margin-bottom: 10px;
          color: #fff;
        }
        .forgot-link { text-decoration: underline; cursor: pointer; }
        .forgot-link:hover { color: #ffb6c1; }

        .btn-animate {
          background: #fff; color: #ff1493;
          border: none; padding: 12px;
          border-radius: 5px; font-size: 16px; font-weight: 600;
          cursor: pointer; transition: all 0.3s ease;
        }
        .btn-animate:hover {
          background: #ff69b4; color: #fff;
          transform: translateY(-2px); box-shadow: 0 6px 15px rgba(255,105,180,0.5);
        }

        .social-login { display: flex; justify-content: center; gap: 15px; margin-top: 20px; flex-wrap: wrap; }
        .social-btn { flex: 1; padding: 10px 0; border-radius: 5px; border: none; cursor: pointer; font-weight: 600; color: #fff; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .social-btn.google { background: #db4437; }
        .social-btn.facebook { background: #4267B2; }
        .social-btn.twitter { background: #1DA1F2; }
        .social-btn:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.4); }

        @media (max-width: 500px) {
          .login-card { width: 95%; padding: 25px; }
          .login-form input { font-size: 14px; padding: 8px; }
          .btn-animate { font-size: 14px; padding: 10px; }
          .social-btn { flex: 100%; margin-bottom: 10px; }
          .welcome-heading { font-size: 28px; margin-bottom: 20px; }
        }
      `}</style>

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      <h2 className="welcome-heading">Welcome to Employee Management Website</h2>

      <div className="login-card">
        <h1>Login</h1>
        <p>Enter your credentials to continue</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember Me
            </label>
            <a className="forgot-link" href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="btn-animate">Go to Home</button>
        </form>

        <div className="social-login">
          <button className="social-btn google" onClick={() => handleSocialLogin("google")}>Google</button>
          <button className="social-btn facebook" onClick={() => handleSocialLogin("facebook")}>Facebook</button>
          <button className="social-btn twitter" onClick={() => handleSocialLogin("twitter")}>Twitter</button>
        </div>
      </div>
    </>
  );
}

export default Login;