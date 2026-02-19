import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {supabase} from "../lib/supabase.ts";

export default function LoginPage(){
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const inputClasses = "block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500 transition-colors outline-none";
    const labelClasses = "mb-2 block text-sm font-medium text-gray-300";

    const handleAuth = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        try{
            if(isSignUp){
                const {error} = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage("Sign up successfully");
            } else {
                const {error} = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate("/bets");
            }
        } catch(err: any){
            setError(err.message || "An error occurred.");
        } finally {
            setIsLoading(false);
        }
        
    }

    return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">

        {/* Header */}
        <div className="p-8 pb-6 text-center border-b border-gray-700">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">BetVault</h1>
          <p className="text-gray-400 text-sm">
            {isSignUp ? "Create an account to start" : "Log in to manage your bets"}
          </p>
        </div>

        {/* Form */}
        <div className="p-8 pt-6">

          {/* Error / Success */}
          {error && (
            <div className="mb-4 p-3 rounded bg-red-900/30 border border-red-800 text-red-200 text-sm flex items-center gap-2">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 rounded bg-emerald-900/30 border border-emerald-800 text-emerald-200 text-sm flex items-center gap-2">
               {message}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label htmlFor="email" className={labelClasses}>Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClasses}>Contraseña</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClasses}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-emerald-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-emerald-900/20"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                   <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isSignUp ? "Register" : "Log In"
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setMessage(null);
              }}
              className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
            >
              {isSignUp
                ? "Already have an account? Log in"
                : "Don't have an account? Sign up for free"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}