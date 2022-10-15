<script>
import PropertyDataService from "../services/PropertyDataService";

export default {
    data() {
        return {
            currentPage: 1,
            totalPages: 1,
            properties: [],
            paginationPages: [],
            loading: 1
        }
    },
    methods: {
        retrieveProperties() {
            this.loading = 1;
            PropertyDataService.getAll(this.currentPage)
                .then(response => {
                    this.properties = response.data.data;
                    this.totalPages = response.data.last_page;
                    this.loading = 0;
                    this.paginationPages = this.generatePaginationPages(this.currentPage, this.totalPages, 2);
                    console.log(response.data);
                })
                .catch(e => {
                    this.$notify({
                        type: "error",
                        title: "Error",
                        text: e.response.data.message,
                    });
                    console.log(e);
                });
        },
        generatePaginationPages(current, last, width = 2) {
            const left = current - width;
            const right = current + width + 1;
            const range = [];
            const rangeWithDots = [];
            let l;

            for (let i = 1; i <= last; i += 1) {
                if (i === 1 || i === last || (i >= left && i <= right)) {
                    range.push(i);
                } else if (i < left) {
                    i = left - 1;
                } else if (i > right) {
                    range.push(last);
                    break;
                }
            }

            range.forEach(i => {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1);
                    } else if (i - l !== 1) {
                        rangeWithDots.push('...');
                    }
                }
                rangeWithDots.push(i);
                l = i;
            });

            return rangeWithDots;
        },
        fetchPage(page) {
            this.currentPage = page;
            this.retrieveProperties();
        },
        deleteProperty(id) {
            this.loading = 1;
            PropertyDataService.delete(id)
                .then(response => {
                    this.$notify({
                        type: "success",
                        title: "Success",
                        text: response.data.message,
                    });
                    this.retrieveProperties();
                    console.log(response.data);
                })
                .catch(e => {
                    this.$notify({
                        type: "error",
                        title: "Error",
                        text: e.response.data.message,
                    });
                    console.log(e);
                });
        },
        fetchFromAPI() {
            PropertyDataService.fetchFromAPI()
                .then(response => {
                    this.$notify({
                        type: "success",
                        title: "Success",
                        text: response.data.message,
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    this.$notify({
                        type: "error",
                        title: "Error",
                        text: e.response.data.message,
                    });
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveProperties();
    }
}
</script>

<template>
    <div class="container py-3">
        <div class="d-flex justify-content-between">
            <RouterLink to="/properties/add" className="btn btn-primary">Add Property</RouterLink>
            <button type="button" class="btn btn-success" @click="fetchFromAPI()">Fetch From API</button>
        </div>

        <div v-if="!loading">
            <table class="table table-bordered table-striped bg-white mt-3">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Id</th>
                        <th>Api uuid</th>
                        <th>County</th>
                        <th>Country</th>
                        <th>Town</th>
                        <th>No. of bedrooms</th>
                        <th>No. of bathrooms</th>
                        <th>Price</th>
                        <th>Property Type</th>
                        <th>Type</th>
                        <th style="width: 140px; text-align: center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="property in properties">
                        <td>
                            <img :src="(property.image_thumbnail.substring(0,4) == 'http') ? property.image_thumbnail : 'http://localhost:8000/storage/image/'+property.image_thumbnail"
                                width="60">
                        </td>
                        <td>{{property.id}}</td>
                        <td>{{property.api_uuid}}</td>
                        <td>{{property.county}}</td>
                        <td>{{property.country}}</td>
                        <td>{{property.town}}</td>
                        <td>{{property.num_bedrooms}}</td>
                        <td>{{property.num_bathrooms}}</td>
                        <td style="text-align: right">{{property.price}}</td>
                        <td>{{property.property_type.title}}</td>
                        <td>{{property.type == 1 ? 'Rent' : 'Sale'}}</td>
                        <td style="text-align: center">
                            <RouterLink :to="'/properties/edit/'+property.id" className="btn btn-warning btn-sm">Edit
                            </RouterLink>
                            <button type="button" class="btn btn-danger btn-sm ms-2"
                                @click="deleteProperty(property.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <nav>
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous" @click="fetchPage(--currentPage)"
                            :class="{ disabled: currentPage==1 }">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item" v-for="pageNum in paginationPages"
                        :class="{ active: pageNum==currentPage, disabled: pageNum=='...' }">
                        <a class="page-link" href="#" @click="fetchPage(pageNum)">{{pageNum}}</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next" @click="fetchPage(++currentPage)"
                            :class="{ disabled: currentPage==totalPages }">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <div v-else class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    </div>
</template>

<style>

</style>
