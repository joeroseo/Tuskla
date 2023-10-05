import { createStore } from 'vuex'
/* eslint-disable */

export default createStore({
  state: {
    currrent_order_id: '',
    cart: [],
    cartTotal: 0,
    vehicle_description: 'Model 3 Standard',
    paint_description: 'Midnight Silver Metallic',
    paint_cost: '0',
    interior_description: 'Black',
    interior_cost: '0',
    interior_rows: '5 Seat Option',
    interior_row_cost: '0',
    steering_description: 'Regular Steering Wheel',
    steering_cost: "0",
    rims_description: '18" Aero Wheels',
    rims_cost: '0',
    rims_selected: '18',
    autopilot: false,
    autopilot_cost: '0',
    autopilot_description: 'Autopilot None',
    full_self_driving: false,
    full_self_driving_cost: 0,
    full_self_driving_description: 'Full Self Driving None',
    wallcharger: false,
    wallcharger_cost: '0',
    wallcharger_description: 'Wall Charger None',
    mobilecharger: false,
    mobilecharger_cost: '0',
    mobilecharger_description: 'Mobile Charger None',
    destination_fee: '1390',
    vehicle_price: '40240',
    VehicleTotal: 0,

    StandardPprice: "$40,240",
    StandardActualPrice: "40240",
    StandardPpriceSavings: "$27,940",
    StandardLoanPrice: "$560",
    StandardLoanPriceSavings: "$414",
    StandardLeasePrice: "$429",
    StandardLeasePriceSavings: "$362",

    LongRangePprice: "$47,240",
    LongRangeActualPrice: "47240",
    LongRangePpriceSavings: "$34,940",
    LongRangeLoanPrice: "$666",
    LongRangeLoanPriceSavings: "$520",
    LongRangeLeasePrice: "$524",
    LongRangeLeasePriceSavings: "$457",

    PerformancePprice: "$53,240",
    PerformanceActualPrice: "53240",
    PerformancePpriceSavings: "$40,940",
    PerformanceLoanPrice: "$757",
    PerformanceLoanPriceSavings: "$611",
    PerformanceLeasePrice: "$634",
    PerformanceLeasePriceSavings: "$567",


    StandardRange: "272mi",
    LongRangeRange: "333mi",
    PerformanceRange: "315mi",

    StandardTopSpeed: "140mph",
    LongRangeTopSpeed: "145mph",
    PerformanceTopSpeed: "162mph",

    StandardAccel: "5.8sec",
    LongRangeAccel: "4.2sec",
    PerformanceAccel: "3.1sec",

  },

  mutations: {

    setFullSelfDrivingCost(state, cost) {
      state.full_self_driving_cost = cost;
    },

    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },

    updateVehiclePrice(state, newPrice) {
      state.vehicle_price = newPrice;
    },

    async initialiseStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      }
      if (localStorage.getItem('cartTotal')) {
        state.cartTotal = parseFloat(localStorage.getItem('cartTotal'))
      }
      return true;
    },

    addRemoveCart(state, payload) {
      payload.toAdd ?
        state.cart.push(payload.product) :
        state.cart = state.cart.filter(function (obj) {
          return obj.id !== payload.product.id
        });
      state.cartTotal = state.cart.reduce((accumulator, object) => {
        return parseFloat(accumulator) + parseFloat(object.price * object.qty);
      }, 0);
      localStorage.setItem('cartTotal', JSON.stringify(state.cartTotal));
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    updateCart(state, payload) {
      state.cart.find(o => o.id === payload.product.id).qty = payload.product.qty;
      state.cartTotal = state.cart.reduce((accumulator, object) => {
        return parseFloat(accumulator) + parseFloat(object.price * object.qty);
      }, 0);
      localStorage.setItem('cartTotal', JSON.stringify(state.cartTotal));
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }

  },
  actions: {},
  modules: {},
})
