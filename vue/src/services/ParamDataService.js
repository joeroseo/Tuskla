import http from "../http-common";

class ParamDataService {
  getAll() {
    return http.get("/datainfo");
  }

  findByPk(id) {
    return http.get(`/datainfo/${id}`);
  }

  create(data) {
    return http.post("/datainfo", data);
  }

  update(id, data) {
    return http.put(`/datainfo/${id}`, data);
  }

  delete(id) {
    return http.delete(`/datainfo/${id}`);
  }

  deleteAll() {
    return http.delete(`/datainfo`);
  }

  findByModel(model) {
    return http.get(`/datainfo?model=${model}`);
  }
}

export default new ParamDataService();
