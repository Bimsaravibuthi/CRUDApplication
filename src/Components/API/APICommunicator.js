import axios from 'axios';

export default function APICommunicator()
{
    const baseURL = "https://localhost:44310/";

    const getRequest = async (endPoint) =>{
        try 
        {
          console.log(baseURL+endPoint);
          const response = await axios.get(baseURL + endPoint);
          return({state: "success", msg: response.data});
        } 
        catch (error) 
        {
            if(error.response)
            {
                return({state: "error", msg: "Server responded with an error: " + error.response.status});
            }
            else if(error.request)
            {
                return({state: "error", msg: "No response received from the server"})
            }
            else
            {
                return({state: "error", msg: "Some error occurred"})
            }
        }
    }

    const postRequest = async (endPoint, requestBody) =>{
        try 
        {
          const response = await axios.post(baseURL + endPoint, requestBody);
          return(response.data);
        }
        catch (error) 
        {
            if(error.response)
            {
                return({state: "error", msg: "Server responded with an error: " + error.response.status});
            }
            else if(error.request)
            {
                return({state: "error", msg: "No response received from the server"})
            }
            else
            {
                return({state: "error", msg: "Some error occurred"})
            }
        }
    }

    const putRequest = async (endPoint, requestBody) =>{
        try 
        {
          const response = await axios.put(baseURL + endPoint, requestBody);
          return(response.data);
        } 
        catch (error) 
        {
            if(error.response)
            {
                return({state: "error", msg: "Server responded with an error: " + error.response.status});
            }
            else if(error.request)
            {
                return({state: "error", msg: "No response received from the server"})
            }
            else
            {
                return({state: "error", msg: "Some error occurred"})
            }
        }
    }

    const deleteRequest = async (endPoint) =>{
        try 
        {
          const response = await axios.delete(baseURL + endPoint);
          return(response.data);
        } 
        catch (error) 
        {
            if(error.response)
            {
                return({state: "error", msg: "Server responded with an error: " + error.response.status});
            }
            else if(error.request)
            {
                return({state: "error", msg: "No response received from the server"})
            }
            else
            {
                return({state: "error", msg: "Some error occurred"})
            }
        }
    }

    return{
        getRequest : getRequest,
        postRequest : postRequest,
        putRequest : putRequest,
        deleteRequest : deleteRequest
    };
}