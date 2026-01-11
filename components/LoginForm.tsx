
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [exposure, setExposure] = useState(65);
  const [contrast, setContrast] = useState(40);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  // Mock background image URL from user prompt
  const bgImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCTaU3LseSzrkllsLz43ji7VbQejt9L6Ze6yBZaGk6FaCmmZSs5DIflmXSnsyPxYY6ph5O20O6KBf9azuHEU5nvnu3LhDL8luyK0B0mzZQiey5lhBrabsqLhRXmNaObQe1Jfbn6dqeyazPLdBLvs4mxRaxNlXhTd66BxuQc7hOphYy_4oNWZoJLQH2LVoiqXfah5kJmZ4EmgyPBcv1cJQJxeiXWUFiKzxBcyqdwKanInw2K1orfGWtZndKV2mZDm9jfpmSiYGxMdKP7";

  // Calculate CSS filters based on demo sliders
  const filterStyle = {
    filter: `brightness(${exposure + 50}%) contrast(${contrast + 80}%)`
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden custom-scrollbar">
      {/* Header Visual Section */}
      <div className="relative w-full h-[35vh] min-h-[300px]">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-300 ease-out"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(16, 22, 34, 0.2), rgba(16, 22, 34, 1)), url("${bgImage}")`,
            ...filterStyle
          }}
        />
        
        {/* Floating Editing Sliders Overlay */}
        <div className="absolute bottom-8 left-4 right-4 flex flex-col gap-4 backdrop-blur-md bg-black/40 p-5 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-sm text-white/70">wb_sunny</span>
            <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden relative">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={exposure} 
                onChange={(e) => setExposure(parseInt(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
              />
              <div className="bg-primary h-full transition-all duration-200" style={{ width: `${exposure}%` }}></div>
            </div>
            <span className="text-[10px] font-bold text-white/70 w-16 uppercase tracking-wider">Exposure</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-sm text-white/70">contrast</span>
            <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden relative">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={contrast} 
                onChange={(e) => setContrast(parseInt(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
              />
              <div className="bg-primary h-full transition-all duration-200" style={{ width: `${contrast}%` }}></div>
            </div>
            <span className="text-[10px] font-bold text-white/70 w-16 uppercase tracking-wider">Contrast</span>
          </div>
        </div>

        {/* App Logo/Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="size-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-white text-xl">photo_camera</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Lumina</h1>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex flex-col px-6 pb-10 -mt-6 relative z-10 bg-background-light dark:bg-background-dark rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="pt-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 text-base mt-2">Sign in to continue your creative workflow.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Social Login Button */}
          <button 
            type="button"
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 px-5 bg-white dark:bg-card-dark text-gray-900 dark:text-white border border-gray-200 dark:border-border-dark gap-3 font-semibold transition-all hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98] mb-6 shadow-sm"
          >
            <img 
              alt="Google Logo" 
              className="w-5 h-5" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcVk4I54IhjkJngd-oYiHMMMT8e7OiAKWTC_GCp4hGaOtAm2ukWaEMklHP87awTRb1L0D1syzE6YDZnvn0bAJsYNKoEPFP-8PsgxU1vilmQ5kHdDqvy6hYAxxIBfQEfmJNetQbyJYr_VCME7Ej1BbH8HBjwvxcRQ9D4TC3DM801lrh93a3HjIxpadCp4vRHCNxmcXj2Xg8Wyu2ltLH_y87PoaGJnpKG_X77yekvUpFYQFlfUKs1UYvH9sHwoVLVAIIAccDFgL2KIdy"
            />
            <span>Sign in with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-gray-200 dark:bg-border-dark"></div>
            <span className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="flex-1 h-[1px] bg-gray-200 dark:bg-border-dark"></div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-gray-700 dark:text-white text-sm font-semibold px-1">Email Address</label>
            <div className="relative">
              <input 
                className="flex w-full rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-card-dark h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-5 text-base font-normal transition-all" 
                placeholder="name@example.com" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex justify-between items-center px-1">
              <label className="text-gray-700 dark:text-white text-sm font-semibold">Password</label>
              <button type="button" className="text-primary text-xs font-bold hover:underline">Forgot Password?</button>
            </div>
            <div className="relative">
              <input 
                className="flex w-full rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-card-dark h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-5 text-base font-normal transition-all" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Login CTA */}
          <button 
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center rounded-2xl h-14 bg-primary text-white font-bold text-lg shadow-xl shadow-primary/30 hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
          >
            <span>Log In</span>
          </button>
        </form>

        {/* Footer Signup */}
        <div className="mt-auto pt-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            New to Lumina? 
            <button className="text-primary font-bold ml-2 hover:underline">Create Account</button>
          </p>
        </div>
      </div>
      
      {/* iOS Home Indicator Spacing */}
      <div className="h-8 w-full bg-background-light dark:bg-background-dark"></div>
    </div>
  );
};

export default LoginForm;
