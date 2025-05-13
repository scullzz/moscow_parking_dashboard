import { Toaster } from 'sonner';
import AppProvider from './providers';
import AppRouter from './routes';
import { AuthProvider } from './pages/auth/signin/components/auth_context';

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
      <Toaster position="top-right" richColors />
    </AppProvider>
  );
}
