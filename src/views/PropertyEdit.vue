<script>

import PropertyTypeDataService from "../services/PropertyTypeDataService";
import PropertyDataService from "../services/PropertyDataService";

export default {
    data() {
        return {
            propertyTypesLoaded: 0,
            propertyLoaded: 0,
            propertyTypes: [],
            loadingForm: 0,
            property: {},
            propertyId: this.$route.params.id
        }
    },
    methods: {
        retrievePropertyTypes() {
            this.propertyTypesLoaded = 0;
            PropertyTypeDataService.getAll()
                .then(response => {
                    this.propertyTypes = response.data;
                    this.propertyTypesLoaded = 1;
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
        retrieveProperty(id) {
            this.propertyLoaded = 0;
            PropertyDataService.get(id)
                .then(response => {
                    let property = response.data.property;
                    this.property = {
                        county: property.county,
                        country: property.country,
                        town: property.town,
                        postcode: property.postcode,
                        description: property.description,
                        address: property.address,
                        num_bedrooms: property.num_bedrooms,
                        num_bathrooms: property.num_bathrooms,
                        price: property.price,
                        property_type_id: property.property_type_id,
                        type: property.type,
                    };
                    this.propertyLoaded = 1;
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
        updateProperty() {
            if (this.$refs.form.checkValidity()) {
                this.loadingForm = 1;
                let formData = new FormData;
                formData.append('county', this.property.county);
                formData.append('country', this.property.country);
                formData.append('town', this.property.town);
                formData.append('postcode', this.property.postcode);
                formData.append('description', this.property.description);
                formData.append('address', this.property.address);
                formData.append('num_bedrooms', this.property.num_bedrooms);
                formData.append('num_bathrooms', this.property.num_bathrooms);
                formData.append('price', this.property.price);
                formData.append('property_type_id', this.property.property_type_id);
                formData.append('type', this.property.type);
                if (this.$refs.file.files[0]) {
                    formData.append('image', this.$refs.file.files[0]);
                }

                PropertyDataService.update(this.propertyId, formData)
                    .then(response => {
                        this.loadingForm = 0;
                        this.$refs.form.classList.remove('was-validated');
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

            this.$refs.form.classList.add('was-validated');
        }
    },
    mounted() {
        this.retrievePropertyTypes();
        this.retrieveProperty(this.propertyId);
    }
}
</script>

<template>
    <div class="container py-3">

        <div v-if="propertyTypesLoaded && propertyLoaded" class="row">
            <div class="col-md-6">
                <form ref="form" @submit.prevent="updateProperty()" class="needs-validation" novalidate>
                    <div class="mb-3">
                        <label for="county" class="form-label">County</label>
                        <input type="text" class="form-control" id="county" v-model="property.county" required>
                        <div class="invalid-feedback">
                            Please enter a valid county.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="country" class="form-label">Country</label>
                        <input type="text" class="form-control" id="country" v-model="property.country" required>
                        <div class="invalid-feedback">
                            Please enter a valid country.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="town" class="form-label">Town</label>
                        <input type="text" class="form-control" id="town" v-model="property.town" required>
                        <div class="invalid-feedback">
                            Please enter a valid town.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="postcode" class="form-label">Postcode</label>
                        <input type="number" class="form-control" id="postcode" v-model="property.postcode" required>
                        <div class="invalid-feedback">
                            Please enter a valid postcode.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" v-model="property.description"
                            required></textarea>
                        <div class="invalid-feedback">
                            Please enter a valid description.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Displayable Address</label>
                        <input type="text" class="form-control" id="address" v-model="property.address" required>
                        <div class="invalid-feedback">
                            Please enter a valid address.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="image" class="form-label">Image</label>
                        <input type="file" class="form-control" id="image" ref="file" accept="image/*">
                    </div>
                    <div class="mb-3">
                        <label for="num_bedrooms" class="form-label">Number of bedrooms</label>
                        <select class="form-select" id="num_bedrooms" v-model="property.num_bedrooms" required>
                            <option value="" selected>Select</option>
                            <option v-for="(n) in 20" :value="n">{{ n }}</option>
                        </select>
                        <div class="invalid-feedback">
                            Please choose number of bedrooms.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="num_bathrooms" class="form-label">Number of bathrooms</label>
                        <select class="form-select" id="num_bathrooms" v-model="property.num_bathrooms" required>
                            <option value="" selected>Select</option>
                            <option v-for="(n) in 20" :value="n">{{ n }}</option>
                        </select>
                        <div class="invalid-feedback">
                            Please choose number of bathrooms.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Price</label>
                        <input type="number" class="form-control" id="price" v-model="property.price" required>
                        <div class="invalid-feedback">
                            Please enter a valid price.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="property_type_id" class="form-label">Property Type</label>
                        <select class="form-select" id="property_type_id" v-model="property.property_type_id" required>
                            <option value="" selected>Select</option>
                            <option v-for="(type) in propertyTypes" :value="type.id">{{ type.title }}</option>
                        </select>
                        <div class="invalid-feedback">
                            Please choose property type.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Type</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="type" id="typeSale"
                                v-model="property.type" value="0" required>
                            <label class="form-check-label" for="typeSale">
                                Sale
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="type" id="typeRent"
                                v-model="property.type" value="1" required>
                            <label class="form-check-label" for="typeRent">
                                Rent
                            </label>
                        </div>
                    </div>
                    <button v-if="!loadingForm" type="submit" class="btn btn-primary">Submit</button>
                    <button v-else class="btn btn-primary" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                </form>

            </div>
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
