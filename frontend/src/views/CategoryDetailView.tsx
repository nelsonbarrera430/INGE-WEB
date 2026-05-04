import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategory } from '../services/categories';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type Category = {
  id: number;
  name: string;
  image: string;
  products: Product[];
};

export default function CategoryDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategory(Number(id))
      .then(setCategory)
      .catch(() => setError('No se pudo cargar la categoría'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="space-y-4">
      <button onClick={() => navigate('/api/categories')} className="text-sm text-emerald-600 hover:underline">
        ← Volver a categorías
      </button>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {category && (
        <>
          <h1 className="text-xl font-semibold">{category.name}</h1>
          <img src={category.image} alt={category.name} className="w-full h-48 object-cover rounded" />
          <h2 className="text-lg font-medium">Productos</h2>
          {category.products?.length === 0 && <p>No hay productos en esta categoría.</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.products?.map(p => (
              <div key={p.id} className="border rounded p-3 bg-white dark:bg-slate-800">
                <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded" />
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-emerald-600">${p.price}</span>
                </div>
                <button
                  onClick={() => navigate(`/api/products/${p.id}`)}
                  className="mt-2 w-full px-3 py-1 rounded bg-slate-800 text-white text-sm"
                >
                  Ver detalle
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}