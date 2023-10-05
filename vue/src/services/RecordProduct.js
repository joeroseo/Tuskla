import http from "../http-common";

class RecordProduct {
  create(data) {
    return http.post("/products", data);
  }
}
export default new RecordProduct();
