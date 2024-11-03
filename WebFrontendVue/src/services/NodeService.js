import axios from 'axios';

class NodeService {
    async getCategories() {
        try {
            const response = await axios.get('/api/v1/questions/category/list/tree');
            if (response.data.status === 1) {
                return response.data.data;
            } else {
                console.error('Veri alınırken bir hata oluştu:', response.data);
                return [];
            }
        } catch (error) {
            console.error('API isteği sırasında bir hata oluştu:', error);
            return [];
        }
    }

    async getSubCategories(categoryId) {
        try {
            const response = await axios.get(`/api/v1/questions/sub-category/list/tree?categoryId=${categoryId}`);
            if (response.data.status === 1) {
                return response.data.data;
            } else {
                console.error('Alt kategori verisi alınırken bir hata oluştu:', response.data);
                return [];
            }
        } catch (error) {
            console.error('Alt kategori API isteği sırasında bir hata oluştu:', error);
            return [];
        }
    }
}

export default new NodeService();
