
import { fetchUser }  from  "../utils/FetchLocalSotrageData";

const userInfo = fetchUser()



export const initialState = {
user  : userInfo ,


}