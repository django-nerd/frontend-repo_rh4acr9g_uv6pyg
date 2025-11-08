import React, { useState } from 'react';

const Auth = () => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e) => {
    e.preventDefault();
    setMessage(
      mode === 'login'
        ? 'Logged in (demo). In production, this will authenticate with the server.'
        : 'Account created (demo). In production, this will register on the server.'
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-10">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-slate-800/70 border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">
              {mode === 'login' ? 'Log in to GoDigitalNest' : 'Create your account'}
            </h1>
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-indigo-300 hover:text-white"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </div>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            {mode === 'signup' && (
              <label className="block">
                <span className="text-slate-300 text-sm">Full Name</span>
                <input
                  className="mt-1 w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            )}
            <label className="block">
              <span className="text-slate-300 text-sm">Email</span>
              <input
                type="email"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-slate-300 text-sm">Password</span>
              <input
                type="password"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg py-2"
            >
              {mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
            {message && <p className="text-center text-slate-300 text-sm">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
