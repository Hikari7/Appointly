import { useMutation } from "react-query";
import { useNavigate } from "react-router";

import { setUser } from "../redux/slicers/userSlice";
import { setLoginToast } from "../redux/slicers/loginToastSlice";
import authApi from "../api/authApi";
import { useDispatch } from "react-redux";

const handleLogin = async ({email, password}) => {
  const res = await authApi.login({email, password})
  return res.data
}

const useLogin = (errorUpdater) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return useMutation(handleLogin, {
    onSuccess: data => {
      const loginDate = new Date(data.loginDate);
      const expireTime = loginDate.setHours(loginDate.getHours() + 12);

      const newObj = {};
      newObj.userId = data.userId;
      newObj.username = data.username;
      newObj.email = data.email;
      newObj.loginDate = expireTime;
      dispatch(setUser(newObj));

      navigate(`/${newObj.userId}/mypage`, { replace: true });
      dispatch(setLoginToast(true));
    },
    onError: error => errorUpdater(true)
  })
   
}

export default useLogin