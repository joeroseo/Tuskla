import http from "../http-common";

class OrderInfoDataService {
  getAll() {
    return http.get("/orderinfo");
  }

  get(order_id) {
    return http.get("/orderinfo/${order_id}");
  }

  findByPk(order_id) {
    return http.get("/orderinfo/${order_id}");
  }

  create(data) {
    return http.post("/orderinfo", data);
  }

  update(id, data) {
    return http.put(`/orderinfo/${id}`, data);
  }

  delete(order_id) {
    return http.delete(`/orderinfo/${order_id}`);
  }

  deleteAll() {
    return http.delete(`/orderinfo`);
  }

  findByTitle(order_id) {
    return http.get(`/orderinfo?order_id=${order_id}`);
  }

  findByOrderId(order_id) {
    return http.get(`/orderinfo?order_id=${order_id}`);
  }
}

export default new OrderInfoDataService();
