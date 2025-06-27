// frontend\frontend-app\src\App.jsx
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>⏳ Carregando sessão...</p>;

  return isAuthenticated ? <HomePage /> : <LoginPage />;
}

export default App;