import http from "../http-common";

class PropertyTypeDataService {
  getAll() {
    return http.get("/property_types");
  }
}

export default new PropertyTypeDataService();