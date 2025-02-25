import { BASEURL } from "./baseurl"
import { commonApi } from "./commonstructure"

export const signupApi=async(body)=>{
    return await commonApi('POST',`${BASEURL}/user/register`,body)
}
export const loginApi=async(body)=>{
    return await commonApi('POST',`${BASEURL}/user/login`,body)
}