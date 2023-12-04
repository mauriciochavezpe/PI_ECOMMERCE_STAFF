import { 
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL, 
    CATEGORY_DETAILS_RESET
    
  } from '../constants/categoryConstants'
  
  const dataInit = {
    categories:[
        {
          categoria: "ACCESORIOS COMPUTACIÓN",
        },
        {
          categoria: "IMPRESORAS",
        },
        {
          categoria: "LAPTOPS",
        },
        {
          categoria: "ALMACENAMIENTO",
        },
        {
          categoria: "MONITORES",
        },
        {
          categoria: "TABLETS",
        },
        {
          categoria: "COMPUTADORES DE ESCRITORIO",
        },
        {
          categoria: "SOFTWARES",
        },
        {
          categoria: "ALL IN ONE",
        },
        {
          categoria: "Tarjetas de Video",
        },
        {
          categoria: "Tarjetas Madre",
        },
        {
          categoria: "Procesadores",
        },
        {
          categoria: "Memoria RAM",
        },
        {
          categoria: "Fuentes de Poder",
        },
        {
          categoria: "Gabinetes",
        },
        {
          categoria: "Refrigeración",
        },
        {
          categoria: "Periféricos",
        },
        {
          categoria: "Cámaras Web",
        },
        {
          categoria: "Redes",
        },
      ],
   
        brands: [
          {
            "brand": "Intel"
          },
          {
            "brand": "AMD"
          },
          {
            "brand": "Nvidia"
          },
          {
            "brand": "Samsung"
          },
          {
            "brand": "Micron"
          },
          {
            "brand": "ASUS"
          },
          {
            "brand": "Gigabyte"
          },
          {
            "brand": "Western Digital"
          },
          {
            "brand": "Seagate"
          },
          {
            "brand": "Corsair"
          },
          {
            "brand": "Kingston"
          },
          {
            "brand": "HP"
          },
          {
            "brand": "Dell"
          },
          {
            "brand": "AOC"
          },
          {
            "brand": "Apple"
          },
          {
            "brand": "Sony"
          },
          {
            "brand": "Panasonic"
          },
          {
            "brand": "LG"
          },
          {
            "brand": "Toshiba"
          },
          {
            "brand": "Lenovo"
          },
          {
            "brand": "MSI"
          },
          {
            "brand": "EVGA"
          },
          {
            "brand": "BenQ"
          },
          {
            "brand": "Hitachi"
          }
          // Puedes añadir más marcas si lo deseas
        ]
 
      
  }

 
  
  export const category_list = (
    state = dataInit,
    action
  ) => {
    const { type, payload } = action
  
    switch (type) {
      case CATEGORY_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case CATEGORY_DETAILS_SUCCESS:
        return {
          loading: false,
          CATEGORY: payload,
        }
      case CATEGORY_DETAILS_FAIL:
        return {
          loading: false,
          error: payload,
        }
      case CATEGORY_DETAILS_RESET:
        return {
          loading: true,
          CATEGORYItems: [],
          shippingAddress: {},
        }
      default:
        return state
    }
  } 
  