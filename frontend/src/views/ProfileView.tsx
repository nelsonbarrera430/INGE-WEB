import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { clearToken } from '../services/session';

type User = {
  id: number;
  email: string;
  role: string;
};

export default function ProfileView() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/api/login');
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow space-y-4">
      <h1 className="text-xl font-semibold">Mi Perfil</h1>
      {loading && <p>Cargando...</p>}
      {user && (
        <div className="space-y-2">
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Rol:</span> {user.role}</p>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </div>
  );
}