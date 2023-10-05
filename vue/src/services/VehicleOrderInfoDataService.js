import http from "../http-common";

class VehicleOrderInfoDataService {
  getAll() {
    return http.get("/vehicleorderinfo");
  }

  get(order_id) {
    return http.get("/vehicleorderinfo/${order_id}");
  }

  findByPk(order_id) {
    return http.get("/vehicleorderinfo/${order_id}");
  }

  create(data) {
    return http.post("/vehicleorderinfo", data);
  }

  update(id, data) {
    return http.put(`/vehicleorderinfo/${id}`, data);
  }

  delete(order_id) {
    return http.delete(`/vehicleorderinfo/${order_id}`);
  }

  deleteAll() {
    return http.delete(`/vehicleorderinfo`);
  }

  findByTitle(order_id) {
    return http.get(`/vehicleorderinfo?order_id=${order_id}`);
  }

  findByOrderId(order_id) {
    return http.get(`/vehicleorderinfo?order_id=${order_id}`);
  }
}

export default new VehicleOrderInfoDataService();
