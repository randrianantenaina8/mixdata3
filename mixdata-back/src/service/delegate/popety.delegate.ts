import { contentType } from '../../data/constants/content-type';
import { popety } from '../../data/constants/urls';
import { useGet, usePost } from '../../common/technical/axios.technical';
import { configs } from '../../data/constants/configs';
import { headers } from '../../data/constants/popetyHeader';

export class PopetyDelegate {
    async getByCity(query) {
        try {
          const accessToken = "xxxxxxx";
    
          return useGet(popety.citySearch)({
            body: query,
            customHeader: { access_token: accessToken, 'Content-Type': contentType.json },
          });
        } catch (error) {
          return Promise.reject(error);
        }
      }

      async login(query) {
        try {
          console.log('url ', `${configs.popetyEndPoint}${popety.baseApi}${popety.login}`);
          return usePost(`${configs.popetyEndPoint}${popety.baseApi}${popety.login}`)({
            body: query,
            customHeader: { 'Content-Type': contentType.json, 'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36" },
          });
        } catch (error) {
          console.log('error ==== ', error);
          return Promise.reject(error);
        }
      }

      async getLandsByCity(query) {
        try {
          return usePost(`${configs.popetyEndPoint}${popety.baseApi}${popety.searchLand}`)({
            body: query,
            customHeader: {
              ...headers,
              Authorization: headers.Authorization.replace("JWT_VALUE", `${configs.popetyToken}`)
            },
          });
        } catch (error) {
          return Promise.reject(error);
        }
      }

      async getCities() {
        try {
          return useGet(`${configs.popetyEndPoint}${popety.baseApi}${popety.citySearch}`)({
            body: {},
            customHeader: {
              ...headers,
              Authorization: headers.Authorization.replace("JWT_VALUE", `${configs.popetyToken}`)
            },
          });
        } catch (error) {
          return Promise.reject(error);
        }
      }
}

export const popetyDelegate = new PopetyDelegate();