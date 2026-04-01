import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import { ChefHat } from 'lucide-react';
import BackgroundCarousel from '../components/BackgroundCarousel';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const backgroundImages = [
    '/login_bg_1_1774981499798.png',
    '/login_bg_2_1774981519376.png',
    '/login_bg_3_1774981540986.png',
  ];

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
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
      <BackgroundCarousel images={backgroundImages} />
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="mb-4 bg-blue-500/10 p-4 rounded-2xl text-blue-400 border border-blue-500/20">
            <ChefHat size={48} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Cloud Kitchen</h2>
          <p className="text-slate-300">
            {isLogin ? 'Sign in to manage your kitchens' : 'Create a new admin account'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300 ml-1">Username</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border-white/10 text-white focus:border-blue-500/50 transition-colors" 
              placeholder="Enter your username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 ml-1">Email</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border-white/10 text-white focus:border-blue-500/50 transition-colors" 
                placeholder="Enter your email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-white/5 border-white/10 text-white focus:border-blue-500/50 transition-colors" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-4 rounded-2xl transition-all shadow-xl shadow-blue-900/20 transform hover:-translate-y-1 mt-4"
          >
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-300">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); setSuccessMsg(''); }} 
            className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4"
          >
            {isLogin ? 'Register now' : 'Log in here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
