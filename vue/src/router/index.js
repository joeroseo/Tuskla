import { createRouter, createWebHistory } from 'vue-router'
import Start from '../views/Start.vue'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'
import AddOrder from '../views/AddOrder.vue'
import OrderStatus from '../views/OrderStatus.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import FileUpload from '../views/FileUpload.vue'
import ProductMaintenance from '../views/ProductMaintenance.vue'
import Login from '../components/LoginForm.vue'
import Register from '../components/SignupForm.vue'
import Logout from '../components/Logout.vue'
import SearchOrders from '../views/SearchOrders.vue'
import SearchVehicleOrders from '../views/SearchVehicleOrders.vue'
import OrderStatusAdmin from '../views/OrderStatusAdmin.vue'
import Vehicle from '../views/Vehicle.vue'
import Model3First from '../views/Model3First.vue'
import ModelYFirst from '../views/ModelYFirst.vue'
import ModelXFirst from '../views/ModelXFirst.vue'
import ModelSFirst from '../views/ModelSFirst.vue'
import VehicleCart from '../views/VehicleCart.vue'
import VehicleAddOrder from '../views/VehicleAddOrder.vue'
import VehicleOrderStatus from '../views/VehicleOrderStatus.vue'
import VehicleOrderStatusAdmin from '../views/VehicleOrderStatusAdmin.vue'
import DataProperties from '../views/DataProperties.vue'
import TruncateEmailLog from '../views/TruncateEmailLog.vue'
import Param from '../views/Param.vue'
import Modal2 from '../components/modal/Modal2.vue'

/* eslint-disable */

const routes = [
  {

    path: '/',
    name: 'Root',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'Start',
        component: Start,
      },
      {
        path: '/start',
        name: 'StartInitial2',
        component: Start,
      },
      {
        path: '/vehicle',
        name: 'DefaultVehicle',
        component: Vehicle,
        props: { VehicleModel: 'Model 3' }, // Provide a default value here
      },
      {
        path: '/vehicle/:VehicleModel',
        name: 'VehicleWithModel',
        component: Vehicle,
        props: true, // Keep props: true if you want to pass 'VehicleModel' as a prop
      },
      {
        path: '/products',
        name: 'Products',
        component: Products
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: '/addorder',
        name: 'AddOrder',
        component: AddOrder
      },
      {
        path: '/orderstatus',
        name: 'OrderStatus',
        component: OrderStatus,
        props: true
      },
      {
        path: '/orderstatus/:order_id/:email',
        name: 'OrderStatus',
        component: OrderStatus,
        props: true
      },
      {
        path: '/orderstatus2/:id',
        name: 'SearchOrders',
        component: SearchOrders,
      },
      {
        path: '/fileupload',
        name: 'FileUpload',
        component: FileUpload,
      },
      {
        path: '/productmaintenance',
        name: 'ProductMaintenance',
        component: ProductMaintenance,
      },
      {
        path: '/ordersadmin',
        name: 'OrderStatusAdmin',
        component: OrderStatusAdmin,
        props: true
      },
      {
        path: '/model3first',
        name: 'Model3First',
        component: Model3First,
        props: true
      },
      {
        path: '/modelYfirst',
        name: 'ModelYFirst',
        component: ModelYFirst,
        props: true
      },
      {
        path: '/modelXfirst',
        name: 'ModelXFirst',
        component: ModelXFirst,
        props: true
      },
      {
        path: '/modelSfirst',
        name: 'ModelSFirst',
        component: ModelSFirst,
        props: true
      },
      {
        path: '/vehiclecart',
        name: 'VehicleCart',
        component: VehicleCart,
        props: true
      },
      {
        path: '/vehicleaddorder',
        name: 'VehicleAddOrder',
        component: VehicleAddOrder,
        props: true
      },
      {
        path: '/vehicleorderstatus',
        name: 'VehicleOrderStatus',
        component: VehicleOrderStatus,
        props: true
      },
      {
        path: '/vehicleorderstatus/:order_id/:email',
        name: 'VehicleOrderStatus',
        component: VehicleOrderStatus,
        props: true
      },
      {
        path: '/vehicleordersadmin',
        name: 'VehicleOrderStatusAdmin',
        component: VehicleOrderStatusAdmin,
        props: true
      },
      {
        path: '/dataproperties',
        name: 'DataProperties',
        component: DataProperties,
        props: true
      },
      {
        path: '/param/:id',
        name: 'Param',
        component: Param,
        props: true
      },

      {
        path: '/register',
        name: 'Register',
        component: Register
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/logout',
        name: 'Logout',
        component: Logout
      },
      {
        path: '/searchorders',
        name: 'SearchOrders',
        component: SearchOrders
      },
      {
        path: '/searchvehicleorders',
        name: 'SearchVehicleOrders',
        component: SearchVehicleOrders
      },
      {
        path: '/truncateemaillog',
        name: 'TruncateEmailLog',
        component: TruncateEmailLog
      },
      {
        path: '/modal2/:open/:doctype',
        name: 'Modal2',
        component: Modal2,
        props: route => ({
          open: route.params.open === 'true', // Cast to boolean
          doctype: route.params.doctype
        })
      }
    ],
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router

