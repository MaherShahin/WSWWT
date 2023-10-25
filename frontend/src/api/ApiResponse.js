import { toast } from 'react-toastify';

class ApiResponse {
    
    constructor(response, error = null) {
        if (error) {
            this.error = error;
            this.handleApiError();
        } else if (response && response.data) {
            this.response = response;
            this.handleApiResponse();
        } else {
            throw new Error('Invalid ApiResponse arguments: Both response and error cannot be null');
        }
    }

    handleApiError() {
        const errors = this.error?.response?.data?.errors;
        const status = this.error?.response?.status;

        if (errors && Array.isArray(errors)) {
            errors.forEach((err) => {
                toast.error(err.message);
            });
        } else if (status) {
            toast.error(`An error occurred (status ${status}). Please check your console.`);
        } else {
            toast.error('An unknown error occurred. Please check your console.');
        }
    }

    handleApiResponse() {    
        this.data = this.response.data.data;
        this.success = this.response.data.success;
        this.errors = this.response.data.errors;
    
        console.log('Set values:', this.data, this.success, this.errors);
    }

    hasData() {
        return Boolean(this.data);
    }

    hasErrors() {
        return Array.isArray(this.errors) && this.errors.length > 0;
    }

    length() {
        if (Array.isArray(this.data)) {
            return this.data.length;
        }
        return Object.keys(this.data).length;
    }

    getFirst() {
        if (Array.isArray(this.data)) {
            return this.data[0];
        }
        return this.data[Object.keys(this.data)[0]];
    }

    getData() {
        return this.data;
    }

    getErrors() {
        return this.errors;
    }
}

export default ApiResponse;
