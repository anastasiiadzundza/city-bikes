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
            city: network.location ? network.location.city : '',
            country: network.location ? network.location.country : '',
        }));
    };
    
    const getBikeNetworkDetails = async (id: string) => {
        let networkResponse;
        try {

            networkResponse = await utils().get(`/networks/${id}`);
            const network = networkResponse.data.network;
            return {
                id: network.id,
                name: network.name,
                city: network.location ? network.location.city : '',
                stations: network.stations,
            };

        } catch(err) {
            console.log(err);
            console.log(`${id} not available`);
          return {
              id,
              name: '',
              city: '',
              stations: '',
          };
        }
    };
    
    return {
        getCompanies,
        getBikeNetworkDetails,
    };
}