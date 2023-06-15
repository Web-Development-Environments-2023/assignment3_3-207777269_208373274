import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/user/favorite_recipes",
    name: "favorite_recipes",
    component: () => import("./pages/FavoriteRecipesPage")
  },
  {
    path: "/user/user_recipes",
    name: "user_recipes",
    component: () => import("./pages/MyRecipesPage")
  },

  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
