import utils from './../utils';

export default function bikesService() {
    
    const getCompanies = async () => {
        let networksResponse;
        try {
            networksResponse = await utils().get('/networks');
        } catch(err) {
            return [];
        }
        return networksResponse.data.networks.map(network => ({
            id: network.id,
            name: network.name,
            city: network.location.city,
            country: network.location.country,
        }));
    };
    
    const getBikeNetworkDetails = async (id: string) => {
        let networkResponse;
        try {
            networkResponse = await utils().get(`/networks/${id}`);
        } catch(err) {
            console.log(err);
            console.log(`${id} not available`);
          return {};
        }
        console.log(networkResponse);
        const network = networkResponse.data.network;
        return {
            id: network.id,
            name: network.name,
            city: network.location ? network.location.city : '',
            stations: network.stations,
        };
    };
    
    return {
        getCompanies,
        getBikeNetworkDetails,
    };
}