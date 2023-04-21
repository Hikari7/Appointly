import { useNavigate } from 'react-router'
import { useMutation } from 'react-query';

import authApi from '../api/authApi';

const handleSignup = async ({username, email, password}) => {
  const res = await authApi.signup({username, email, password});
  return res.data
}

const useSignup = (successUpdater, errorUpdater) => {
  const navigate = useNavigate()

  return useMutation(handleSignup, {
    onSuccess: data => {
      if(data.status === 404){
        errorUpdater(true)
      }else{
        successUpdater(true);
  
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    },
    onError: error => console.log(error)
  })
}

export default useSignup