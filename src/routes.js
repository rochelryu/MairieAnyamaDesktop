
import Dashboard from "views/Dashboard.jsx";
import Icons from "views/Icons.jsx";
import Typography from "views/Typography.jsx";
import TableList from "views/Tables.jsx";
import Create from "views/Create.jsx";
//import UpgradeToPro from "views/Upgrade.jsx";
var routes = [
  {
    path: "/dashboard",
    name: "Tableau de Bord",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Naissance",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Mariage",
    icon: "nc-icon nc-pin-3",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Divorce",
    icon: "nc-icon nc-bell-55",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "Déccès",
    icon: "nc-icon nc-single-02",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Impressions",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Etablissement Santé",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/create",
    name: "Gestion des Comptes",
    icon: "nc-icon nc-single-02",
    component: Create,
    layout: "/admin"
  }
];
export default routes;
