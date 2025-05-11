import { Toaster } from 'sonner';
import AppProvider from './providers';
import AppRouter from './routes';

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
      <Toaster position="top-right" richColors />
    </AppProvider>
  );
}
