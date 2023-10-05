import http from "../http-common";

class VehicleOrderInfoDataService2 {
  getAll() {
    return http.get("/vehicleorderInfo2");
  }

  get(email) {
    return http.get(`/vehicleorderInfo2/${email}`);
  }

  create(data) {
    return http.post("/vehicleorderInfo2", data);
  }

  update(email, data) {
    return http.put(`/vehicleorderInfo2/${email}`, data);
  }

  delete(email) {
    return http.delete(`/vehicleorderInfo2/${email}`);
  }

  deleteAll() {
    return http.delete(`/vehicleorderInfo2`);
  }

  findByEmail(email) {
    return http.get(`/vehicleorderInfo2?email=${email}`);
  }
}

export default new VehicleOrderInfoDataService2();
