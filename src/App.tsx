import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Loader2 } from "lucide-react";

// Lazy load other pages
const TestPage = lazy(() => import("./pages/TestPage"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const CategoriesPage = lazy(() => import("./pages/admin/CategoriesPage"));
const ProductsPage = lazy(() => import("./pages/admin/ProductsPage"));
const MenuOrderPage = lazy(() => import("./pages/admin/MenuOrderPage"));
const LoginPage = lazy(() => import("./pages/admin/LoginPage"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));

const LoadingFallback = () => (
  <div className="fixed inset-0 bg-bg flex items-center justify-center">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <Loader2 className="animate-spin text-primary" size={40} />
      <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">Loading...</span>
    </motion.div>
  </div>
);

// We need motion for the fallback, importing it
import { motion } from "framer-motion";

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="order" element={<MenuOrderPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;


