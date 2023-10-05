import http from "../http-common";

class OrderInfoDataService2 {
  getAll() {
    return http.get("/orderInfo2");
  }

  get(email) {
    return http.get(`/orderInfo2/${email}`);
  }

  create(data) {
    return http.post("/orderInfo2", data);
  }

  update(email, data) {
    return http.put(`/orderInfo2/${email}`, data);
  }

  delete(email) {
    return http.delete(`/orderInfo2/${email}`);
  }

  deleteAll() {
    return http.delete(`/orderInfo2`);
  }

  findByEmail(email) {
    return http.get(`/orderInfo2?email=${email}`);
  }
}

export default new OrderInfoDataService2();
