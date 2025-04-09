//supposed to route users to aunthenticator then back to the website when done
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // You could store profile info to your DB here
  return done(null, profile);
}));

// Start the Google auth process
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle callback from Google
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to Vue app after login
    res.redirect('http://localhost:8080/#/dashboard');
  }
);

// Get the current user info
app.get('/api/user', (req, res) => {
  res.json(req.user || null);
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));