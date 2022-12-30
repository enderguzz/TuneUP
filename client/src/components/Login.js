import React, { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { drumHeart } from "../media/mediaIndex";
// import { loginUser } from '../firebase';
import AuthService from "../services/auth.service";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Stores/User";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleChangeVisibility = () => {
    //convert to contrast visibility of password // true or false
    //e.preventDefault()
    setIsVisible(!isVisible);
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    AuthService.login(mail, password)
      .then((res) => {
        console.log(res.data)
        axios.defaults.headers.common["Authorization"] = res.data.token;
        dispatch(login({ name: res.data.name, email: res.data.email, id: res.data.id }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-[90%] w-[80%] md:w-[90%] sm:w-full">
      <div className="flex flex-col justify-center items-center w-full h-full overflow-x-hidden overflow-y-scroll scrollbar-hide rounded-lg bg-white mt-3 shadow-md py-2 px-8 sm:px-3">
        <h3 className="font-bold text-3xl mb-6 sm:mb-0">Login and Tune-UP</h3>
        <div className="flex flex-wrap gap-6 sm:gap-3 justify-center items-scenter">
          <div className="w-[300px] flex flex-col items-start justify-center">
            <img className="" src={drumHeart}></img>
          </div>

          <form className="flex flex-col gap-4 min-w-[230px] justify-center">
            <input
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              type={"text"}
              className="px-3 py-2 outline-none rounded-lg border border-transparent focus:border-indigo-600 bg-indigo-200 transition-all duration-200"
              placeholder="Mail"
            ></input>
            <div className="flex flex-row w-full items-center ">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={`${isVisible ? "text" : "password"}`}
                className="w-full px-3 py-2 outline-none rounded-l-lg border border-transparent focus:border-indigo-600 bg-indigo-200 transition-all duration-200"
                placeholder="Password"
              ></input>
              <div className=" flex rounded-r-lg h-full border border-transparent focus:border-indigo-600 bg-indigo-200 items-center">
                {isVisible ? (
                  <MdOutlineVisibility
                    onClick={handleChangeVisibility}
                    className="mr-2 opacity-60 hover:opacity-100 cursor-pointer text-base"
                  />
                ) : (
                  <MdOutlineVisibilityOff
                    onClick={handleChangeVisibility}
                    className="mr-2 opacity-60 hover:opacity-100 cursor-pointer text-base"
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleClickLogin}
              className="bg-indigo-600 font-semibold text-base px-2 py-1.5 rounded-lg mt-3 border-2 border-transparent text-white hover:border-indigo-800 hover:bg-indigo-300 hover:text-indigo-800 transition-all duration-200"
            >
              Start Tune-UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
