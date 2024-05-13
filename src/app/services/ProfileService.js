const globalheader = "AdminPortal"

let authToken = localStorage.getItem("authToken");
 const hed = {
  "Content-Type": "application/json",
  "melbeez-platform": globalheader,
  Authorization: "Bearer " + authToken,
}

// .....my profile change pass api....
export const handleAPI = (obj) => {
      const reqoption = {
      method: "POST",
      headers: hed,
      body: JSON.stringify(obj),
    };
   return fetch( `${process.env.REACT_APP_API_URL}/api/user/change-password`,reqoption)
  };

  // ....update profile API .......
  export const updateProfile = (obj) => {
       const reqoption = {
      method: "PUT",
      headers:hed,
      body: JSON.stringify(obj),
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/api/user`,reqoption)
  };

  // .....get authenticated user.....
  export const authUserDetail = () => {
    const reqoption = {
      method: "GET",
      headers:hed,
    };
   return fetch(
      `${process.env.REACT_APP_API_URL}/api/user`,reqoption)
  };
