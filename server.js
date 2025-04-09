require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MySQL
let db;
(async () => {
  db = await mysql.createConnection({
    host: 'localhost',
    user: 'youruser',
    password: 'yourpass',
    database: 'yourdb'
  });
})();

// Serialize session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Configure Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE google_id = ?', [profile.id]);
    if (rows.length === 0) {
      await db.execute('INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)', [
        profile.id,
        profile.displayName,
        profile.emails[0].value
      ]);
    }
    done(null, {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    });
  } catch (err) {
    done(err, null);
  }
}));

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:5173')
);

app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));