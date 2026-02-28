"use client";

import { useEffect, useState } from "react";
import HomeHeader from "@/components/home/HomeHeader";
import SearchBar from "@/components/home/SearchBar";
import FilterTabs from "@/components/home/FilterTabs";
import RestaurantSection from "@/components/home/RestaurantSection";
import FeaturedProductCard from "@/components/home/FeaturedProductCard";
import ProductCard from "@/components/home/ProductCard";
import HomeSkeleton from "@/components/home/HomeSkeleton";
import { catalogService, Product, Restaurant, Category } from "@/services/catalog/CatalogService";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80";

export default function HomePage() {
  const { user } = useAuth();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      catalogService.getRestaurants().then(setRestaurants),
      catalogService.getCategories().then(setCategories),
      catalogService.getProducts({ limit: 20 }).then((res) => setProducts(res.data)),
    ])
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    catalogService
      .getProducts({ search, categoriaId: selectedCategory, limit: 20 })
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, [search, selectedCategory]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const handleAddToCart = (p: Product) => {
    addItem({
      id: p.id,
      name: p.nombre,
      description: p.descripcion,
      price: Number(p.precio),
      priceLabel: `$${Number(p.precio).toLocaleString("es-CO")}`,
      image: p.imagenUrl ?? FALLBACK_IMAGE,
    });
  };

  if (loading) return <HomeSkeleton />;

  return (
    <div className="flex flex-col bg-[#FDF4ED] min-h-full pb-4">
      <HomeHeader name={user?.nombre.split(" ")[0] ?? ""} greeting={getGreeting()} />
      <SearchBar onSearch={setSearch} />
      <FilterTabs
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {restaurants.map((restaurant) => {
        const restaurantProducts = products.filter((p) => p.restaurante === restaurant.nombre);
        if (!restaurantProducts.length) return null;
        const [featured, ...rest] = restaurantProducts;
        return (
          <RestaurantSection key={restaurant.id} name={restaurant.nombre} location={restaurant.ubicacion}>
            {featured && (
              <FeaturedProductCard
                image={featured.imagenUrl ?? FALLBACK_IMAGE}
                badge={featured.esPopular ? "MÁS VENDIDO" : undefined}
                name={featured.nombre}
                price={`$${Number(featured.precio).toLocaleString("es-CO")}`}
                description={featured.descripcion}
                waitTime={featured.tiempoEspera}
                onAdd={() => handleAddToCart(featured)}
              />
            )}
            {rest.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                {rest.map((p) => (
                  <ProductCard
                    key={p.id}
                    image={p.imagenUrl ?? FALLBACK_IMAGE}
                    name={p.nombre}
                    description={p.descripcion}
                    price={`$${Number(p.precio).toLocaleString("es-CO")}`}
                    waitTime={p.tiempoEspera}
                    onAdd={() => handleAddToCart(p)}
                  />
                ))}
              </div>
            )}
          </RestaurantSection>
        );
      })}
    </div>
  );
}