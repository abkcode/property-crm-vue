import http from "../http-common";

class PropertyDataService {
  getAll(page) {
    return http.get("/properties", { params: { page: page } });
  }

  get(id) {
    return http.get(`/properties/${id}`);
  }

  fetchFromAPI() {
    return http.get(`/properties/fetch`);
  }

  create(formData) {
    return http.post("/properties", formData, {
      headers: {
        'Content-Type': `multipart/form-data;`
      },
    });
  }

  update(id, formData) {
    return http.post(`/properties/${id}`, formData, { params: { _method: 'PUT' } });
  }

  delete(id) {
    return http.delete(`/properties/${id}`);
  }
}

export default new PropertyDataService();