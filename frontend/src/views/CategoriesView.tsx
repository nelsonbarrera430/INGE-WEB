import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listCategories } from '../services/categories';

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

  useEffect(() => {
    listCategories()
      .then(setItems)
      .catch(() => setError('No se pudieron cargar las categorías'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Categorías</h1>
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
          </div>
        ))}
      </div>
    </div>
  );
}