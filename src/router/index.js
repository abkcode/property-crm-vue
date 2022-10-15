import { createRouter, createWebHistory } from "vue-router";
import PropertyList from "../views/PropertyList.vue";
import PropertyAdd from "../views/PropertyAdd.vue";
import PropertyEdit from "../views/PropertyEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/properties' },
    {
      path: "/properties",
      name: "properties-list",
      component: PropertyList,
    },
    {
      path: "/properties/add",
      name: "properties-add",
      component: PropertyAdd,
    },
    {
      path: "/properties/edit/:id",
      name: "properties-edit",
      component: PropertyEdit,
    },
  ],
});

export default router;
