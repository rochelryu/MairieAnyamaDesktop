
import Profil from "views/Profil.jsx";
//import UpgradeToPro from "views/Upgrade.jsx";

var routesSecond = [
  {
    path: "/profil",
    name: "Profil",
    icon: "nc-icon nc-person",
    component: Profil,
    layout: "/admins"
  },
  {
    path: "/paramettre",
    name: "Paramettre",
    icon: "nc-icon nc-setting",
    component: Profil,
    layout: "/admins"
  },
  {
    path: "/logout",
    name: "Deconnexion",
    icon: "nc-icon nc-pin-3",
    component: Profil,
    layout: "/admins"
  }
];
export default routesSecond;
