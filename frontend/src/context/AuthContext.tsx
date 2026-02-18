import {createContext, useContext, useEffect, useState, ReactNode} from "react";
import {Session, User} from "@supabase/supabase-js";
import {supabase} from "../lib/supabase.ts";

type AuthContextType = {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}){
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Check actual session
         supabase.auth.getSession().then(({data: {session}}) => {
             setSession(session);
             setUser(session?.user ?? null);
             setLoading(false);
         });

         //Check changes
        const{
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });
        return() => subscription.unsubscribe();
    }, []);

    const signOut = async() => {
        await supabase.auth.signOut()
    };

    return(
        <AuthContext.Provider value={{session, user,loading, signOut}}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth= () => {
    const context = useContext(AuthContext);
    if (context == undefined){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};