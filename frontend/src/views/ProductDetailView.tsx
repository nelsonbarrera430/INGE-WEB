import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/products';

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: { id: number; name: string };
};

export default function ProductDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProduct(Number(id))
      .then(setProduct)
      .catch(() => setError('No se pudo cargar el producto'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <button onClick={() => navigate(-1)} className="text-sm text-emerald-600 hover:underline">
        ← Volver
      </button>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {product && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 space-y-3">
          <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded" />
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <p className="text-emerald-600 text-lg font-bold">${product.price}</p>
          <p className="text-sm text-slate-500">Categoría: {product.category?.name}</p>
          <p className="text-sm">{product.description}</p>
        </div>
      )}
    </div>
  );
}