import axios from 'axios';
import { API } from "./utils/services/api";
const checkServerConnection = async () => {
    console.log(API)
    try {
        const response = await API.get("/");
        if (response.status === 200) {
      console.log('Conexión exitosa al servidor backend');
    } else {
      console.log('Error al conectar al servidor backend');
    }
  } catch (error) {
    console.error('Error al conectar al servidor backend', error);
  }
};

checkServerConnection();
