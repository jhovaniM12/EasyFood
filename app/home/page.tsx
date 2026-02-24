import HomeHeader from "@/components/home/HomeHeader";
import SearchBar from "@/components/home/SearchBar";
import FilterTabs from "@/components/home/FilterTabs";
import RestaurantSection from "@/components/home/RestaurantSection";
import FeaturedProductCard from "@/components/home/FeaturedProductCard";
import ProductCard from "@/components/home/ProductCard";
import { products } from "@/constants/Products";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#FDF4ED] min-h-full pb-4">
      <HomeHeader name="Mateo" greeting="Buenos días" />
      <SearchBar />
      <FilterTabs />

      {/* Sección D'CAFÉ */}
      <RestaurantSection name="D'CAFÉ" location="Piso 1, Local 203">
        <FeaturedProductCard
          image="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80"
          badge="MÁS VENDIDO"
          name="Empanada de Carne"
          price="$3.500"
          description="Masa crujiente con carne sazonada."
          waitTime="5-10 min wait"
        />
      </RestaurantSection>

      {/* Sección Plazoleta Principal */}
      <RestaurantSection name="Plazoleta Principal" location="Primer piso">
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
              waitTime={product.waitTime}
            />
          ))}
        </div>
      </RestaurantSection>
    </div>
  );
}