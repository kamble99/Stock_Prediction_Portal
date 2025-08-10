import axios from "axios";


const baseURL=import.meta.env.VITE_BACKEND_BASE_API
const api = axios.create({
    baseURL: baseURL,
    headers:{
        'Content-Type': 'application/json',
    }
})


//request interceptor


api.interceptors.request.use(
    function(config){
        
        const accesstoken=localStorage.getItem('accessToken')
        if(accesstoken){
            config.headers['Authorization']=`Bearer ${accesstoken}`
        }
        return config;


        
    },function(error)
    {
            return Promise.reject(error)
    }

)


//response interceptor

api.interceptors.response.use(
    function(response){
        return response;
    },
    //handle failed responses
    async function(error){
        const originalresquest=error.config;
        if(error.response.status===401 && !originalresquest.retry){
            originalresquest.retry=true;
            const refershtoken=  localStorage.getItem('refreshToken')
            try{
                    const response= await api.post('token/refresh/',{refresh:refershtoken})
                    
                    localStorage.setItem('accesstoken',response.data.access)
                    originalresquest.headers['Authorization']=`Bearer ${response.data.access}`
                    return api(originalresquest)
            }catch(error){ 
                    localStorage.removeItem['accestoken']
                    localStorage.removeItem['refreshtoken']
                   
                    
            }
            //401 Unauthorized
            //redirect to login page
            //window.location.href='/login'
            //or
            //window.location.href='/login?redirect='+window.location.href
           

    }return Promise.reject(error);
}
)
export default api;