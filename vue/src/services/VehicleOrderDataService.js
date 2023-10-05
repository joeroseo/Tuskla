import http from "../http-common";

class VehicleOrderDataService {
  getAll() {
    return http.get("/vehicleorders");
  }

  get(order_id) {
    return http.get(`/vehicleorders/${order_id}`);
  }

  findByPk(order_id) {
    return http.get("/vehicleorders/${order_id}");
  }

  create(data) {
    return http.post("/vehicleorders", data);
  }

  update(order_id, data) {
    return http.put(`/vehicleorders/${order_id}`, data);
  }

  delete(order_id) {
    return http.delete(`/vehicleorders/${order_id}`);
  }

  deleteAll() {
    return http.delete(`/vehicleorders`);
  }

  findByOrderId(order_id) {
    return http.get(`/vehicleorders?order_id=${order_id}`);
  }
}

export default new VehicleOrderDataService();
