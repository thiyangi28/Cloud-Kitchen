import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import { ChefHat } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      if (isLogin) {
        const res = await authAPI.login({ username, password });
        if (typeof res.data === 'string' && res.data.startsWith('Login failed')) {
          setError(res.data);
          return;
        }
        localStorage.setItem('token', res.data || 'fake-jwt-token-or-real-one');
        window.location.href = '/'; 
      } else {
        const res = await authAPI.register({ username, password, email, role: 'ADMIN' });
        if (res.data === 'User Name is already Taken') {
          setError(res.data);
          return;
        }
        setSuccessMsg(res.data || 'Registered successfully! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        setError("Network Error: Cannot connect to Backend. Is the backend running?");
      } else {
        setError(err.response?.data || 'An error occurred');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 p-10 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="mb-4 bg-blue-500/10 p-3 rounded-2xl text-blue-500">
            <ChefHat size={48} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Cloud Kitchen</h2>
          <p className="text-slate-400">
            {isLogin ? 'Sign in to manage your kitchens' : 'Create a new admin account'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border-l-4 border-red-500 text-red-200 text-sm">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-200 text-sm">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Username</label>
            <input 
              type="text" 
              className="w-full" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Email</label>
              <input 
                type="email" 
                className="w-full" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Password</label>
            <input 
              type="password" 
              className="w-full" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 mt-4"
          >
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); setSuccessMsg(''); }} 
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            {isLogin ? 'Register here' : 'Sign in here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
