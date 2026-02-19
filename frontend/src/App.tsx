import {AuthProvider} from "./context/AuthContext.tsx";
import AppRouter from "./routes/AppRouter.tsx";

export default function App(){
   return (
       <AuthProvider>
          <AppRouter/>
       </AuthProvider>
   );
}