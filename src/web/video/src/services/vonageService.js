import axios from 'axios';


export default {

  getUser: async (userLogin) => {
    return axios.get(`/vonage/join/${userLogin}`)
  }



};