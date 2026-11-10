import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const success = login(email, password);
    if (!success) {
      setError('Invalid email or password. Please verify your credentials.');
    }
    setIsLoading(false);
  };

  const fillDemoCredentials = () => {
    setEmail('admin@angelsparadise.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-voile flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block group">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-heading font-bold text-3xl italic shadow-soft mx-auto group-hover:scale-105 transition-transform">
              A
            </div>
          </Link>
          <div className="space-y-1">
            <h1 className="font-heading text-3xl font-bold text-bark-900">
              Angel's Paradise Studio
            </h1>
            <p className="text-xs text-bark-400 font-medium uppercase tracking-widest">
              Boutique Administrative Portal
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white p-8 sm:p-10 rounded-4xl border border-bark-100 shadow-soft-lg space-y-6">
          <div className="border-b border-bark-100 pb-4 text-center">
            <h2 className="font-heading text-xl font-bold text-bark-900">
              Studio Sign In
            </h2>
            <p className="text-xs text-bark-500 mt-0.5">
              Access orders, pieces, inventory, and storefront settings.
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center space-x-3 animate-fadeIn text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bark-700 mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-bark-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@angelsparadise.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bark-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-bark-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-bark-400 hover:text-bark-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-xs shadow-soft hover:shadow-soft-lg transition-all disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Verifying...' : 'Sign In to Dashboard'}
            </button>
          </form>

          {/* Demo Credentials Helper */}
          <div className="pt-4 border-t border-bark-100/80 text-center space-y-2">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="inline-flex items-center space-x-1 text-xs text-rose-500 hover:text-rose-600 font-semibold underline underline-offset-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Fill Studio Credentials</span>
            </button>
            <p className="text-[11px] text-bark-400 font-mono">
              admin@angelsparadise.com / admin123
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 text-xs text-bark-400 hover:text-bark-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
