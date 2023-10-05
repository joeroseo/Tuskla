import http from "../http-common";

class OrderDataService {
  getAll() {
    return http.get("/orders");
  }

  get(order_id) {
    return http.get(`/orders/${order_id}`);
  }

  findByPk(order_id) {
    return http.get("/orderinfo/${order_id}");
  }

  create(data) {
    return http.post("/orders", data);
  }

  update(order_id, data) {
    return http.put(`/orders/${order_id}`, data);
  }

  delete(order_id) {
    return http.delete(`/orders/${order_id}`);
  }

  deleteAll() {
    return http.delete(`/orders`);
  }

  findByOrderId(order_id) {
    return http.get(`/orders?order_id=${order_id}`);
  }
}

export default new OrderDataService();
