import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listCategories } from '../services/categories';
import { useAuth } from '../context/AuthContext';

type Category = {
  id: number;
  name: string;
  image: string;
};

export default function CategoriesView() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';
  const isSeller = user?.role === 'seller';

  useEffect(() => {
    listCategories()
      .then(setItems)
      .catch(() => setError('No se pudieron cargar las categorías'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categorías</h1>
        {isAdmin && (
          <button className="px-3 py-1.5 rounded bg-emerald-600 text-white text-sm">
            + Nueva categoría
          </button>
        )}
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(cat => (
          <div key={cat.id} className="border rounded p-3 bg-white dark:bg-slate-800 space-y-2">
            <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover rounded" />
            <h2 className="font-medium">{cat.name}</h2>
            <button
              onClick={() => navigate(`/api/categories/${cat.id}`)}
              className="w-full px-3 py-1.5 rounded bg-emerald-600 text-white text-sm"
            >
              Ver detalle
            </button>
            {(isAdmin || isSeller) && (
              <button className="w-full px-3 py-1.5 rounded bg-yellow-500 text-white text-sm">
                Editar
              </button>
            )}
            {isAdmin && (
              <button className="w-full px-3 py-1.5 rounded bg-red-600 text-white text-sm">
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}