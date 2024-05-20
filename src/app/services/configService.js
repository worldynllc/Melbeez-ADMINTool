import Cookie from "js-cookie";

const globalheader = "AdminPortal";

function reqType(obj, req) {
  let header = {
    "Content-Type": "application/json",
    "melbeez-platform": globalheader,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    Authorization: "Bearer " + localStorage.getItem("authToken"),
  };
  let reqoption = {};
  if (obj != null) {
    reqoption = {
      method: req,
      headers: header,
      body: JSON.stringify(obj),
    };
  } else {
    reqoption = {
      method: req,
      headers: header,
    };
  }
  return reqoption;
}
export function requestLocationList() {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(`${process.env.REACT_APP_API_URL}/api/locations`, reqoption);
}
// ------------APIs For User List-------------------//

export function requestUserList(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  const cSearch = Cookie.get("searchText");
  if (cSearch == null) {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/users?Skip=${skip}&Take=${take}`,
      reqoption
    );
  } else {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/users?Skip=${skip}&Take=${take}&SearchText=${cSearch}`,
      reqoption
    );
  }
}

// ....used for count...
export function getUserList() {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(`${process.env.REACT_APP_API_URL}/api/users`, reqoption);
}

export function userVerify(id, isEmailVerification, isPhoneVerification) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/admin/user-verification/${id}?isEmailVerification=${isEmailVerification}&isPhoneVerification=${isPhoneVerification}`,
    reqType(null, "POST")
  );
}
// ---------API of adminUserList----------//

export function reqAdminUserList(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  const adminSearch = Cookie.get("searchText");
  if (adminSearch == null) {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/admin-users?Skip=${skip}&Take=${take}`,
      reqoption
    );
  } else {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/admin-users?Skip=${skip}&Take=${take}&SearchText=${adminSearch}`,
      reqoption
    );
  }
}
export function addAdmin(obj) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(obj),
  };
  return fetch(`${process.env.REACT_APP_API_URL}/api/admin-users`, reqoption);
}

export function deleteAdmin(userId) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/user/${userId}`, reqoption
  );
}
// ------------------End of adminUserList-----------------------//

// ---------API of Privacy & Policy-----------//

export function reqPrivacyPolicy() {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/privacy-policy/web`,
    reqoption
  );
}

export function sendDataofPolicy(obj) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/privacy-policy`,
    reqType(obj, "POST")
  );
}
// ----API of Privacy & Policy Ends here---------//

// ----------API for term & condtion----------//

export function getTermnCondtion() {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/termsandconditions/web`,
    reqoption
  );
}

export function sendDataofTermnCondition(obj) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/termsandconditions`,
    reqType(obj, "POST")
  );
}

// ----------API for term & condtion ends here----------//

//------------------API for Eula-----------//

export function getEulaPolicy() {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/eula/web`,
    reqoption
  );
}

export function sendDataofEulaPolicy(obj) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/eula`,
    reqType(obj, "POST")
  );
}
// --------------End--------------------

// -----------API for Cookie Policy----------------

export function getCookiePolicy() {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/cookie-policy/web`,
    reqoption
  );
}

export function sendDataofCookiePolicy(obj) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/cookie-policy`,
    reqType(obj, "POST")
  );
}
// ------------End--------
// ------------------APIs for ProductCategory---------------//

export function reqProdCategory(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  const cSearch = Cookie.get("searchText");
  if (cSearch == null) {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/product-categories/web?Skip=${skip}&Take=${take}`,
      reqoption
    );
  } else {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/product-categories/web?Skip=${skip}&Take=${take}&SearchText=${cSearch}`,
      reqoption
    );
  }
}
export function addCategory(objs) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/product-categories`,
    reqType(objs, "POST")
  );
}
export function deleteCategory(categoryId) {
  return fetch(`${process.env.REACT_APP_API_URL}/api/product-categories/${categoryId}`, reqType(null, "DELETE"));
}
export function updateCategory(obj) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(obj)
  };
  return fetch(`${process.env.REACT_APP_API_URL}/api/product-categories`, reqoption);
}
// ..... in future this above api will have condition of put & post along with get ....

export function requestCitiesList() {
  return fetch(`${process.env.REACT_APP_API_URL}/api/cities`);
}
export function requestStateList() {
  return fetch(`${process.env.REACT_APP_API_URL}/api/states`);
}

export function requestCountryList(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  }
  return fetch(`${process.env.REACT_APP_API_URL}/api/countries?Skip=0&Take=300&OrderBy=id asc`, reqoption);
}

export function requestCountryyId(countyId) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/states/by-country/${countyId}`,
    reqoption
  );
}
//---------API for user-account-restriction------------------------//
export function reqUserRestriction(id, istempLock, isPermanentLock) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(`${process.env.REACT_APP_API_URL}/api/user/account-restriction/${id}?isTemporaryLock=${istempLock}&isPermanentLock=${isPermanentLock}`, reqoption)
}

// ---------------API for Logs----------

export function GetEmailLog(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  const datholder = Cookie.get("dateforsearch");
  const datholder2 = Cookie.get("date2forsearch");
  const cSearch = Cookie.get("searchText");

  if (datholder > "") {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/email-transaction-logs?Skip=${skip}&Take=${take}&startDate=${datholder}&endDate=${datholder2}`,
      reqoption
    );
  } else if (cSearch > "") {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/email-transaction-logs?Skip=${skip}&Take=${take}&SearchText=${cSearch}`,
      reqoption
    );
  }
  else {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/email-transaction-logs?Skip=${skip}&Take=${take}&OrderBy=createdOn desc`,
      reqoption
    );
  }
}

export function GetPhoneLog(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  const datholder = Cookie.get("dateforsearch");
  const datholder2 = Cookie.get("date2forsearch");
  const cSearch = Cookie.get("searchText");

  if (datholder > "") {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/sms-transaction-logs?Skip=${skip}&Take=${take}&startDate=${datholder}&endDate=${datholder2}`,
      reqoption
    );
  } else if (cSearch > "") {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/sms-transaction-logs?Skip=${skip}&Take=${take}&SearchText=${cSearch}`,
      reqoption
    );
  } else {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/sms-transaction-logs?Skip=${skip}&Take=${take}&OrderBy=createdOn desc`,
      reqoption
    );
  }
}
export function GetErrorLog(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };

  const datholder = Cookie.get("dateforsearch");
  const datholder2 = Cookie.get("date2forsearch");
  const cSearch = Cookie.get("searchText");

  if (datholder > "") {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/SML-Error-logs?Skip=${skip}&Take=${take}&startDate=${datholder}&endDate=${datholder2}`,
      reqoption
    );
  } else if (cSearch > "") {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/SML-Error-logs?Skip=${skip}&Take=${take}&SearchText=${cSearch}`,
      reqoption
    );
  }
  else {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/SML-Error-logs?Skip=${skip}&Take=${take}&OrderBy=createdOn desc`,
      reqoption
    );
  }
}
export function GetContactUS(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  const cSearch = Cookie.get("searchText");
  if (cSearch == null) {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/contact-us?Skip=${skip}&Take=${take}&OrderBy=createdOn desc`,
      reqoption
    );
  } else {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/contact-us?&SearchText=${cSearch}`,
      reqoption
    );
  }
}
export function GetAdminLog(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  const datholder = Cookie.get("dateforsearch");
  const datholder2 = Cookie.get("date2forsearch");
  const cSearch = Cookie.get("searchText");
  if (datholder > "") {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/admin-transaction-logs?Skip=${skip}&Take=${take}&startDate=${datholder}&endDate=${datholder2}`,
      reqoption
    );
  } else if (cSearch > "") {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/admin-transaction-logs?Skip=${skip}&Take=${take}&SearchText=${cSearch}`,
      reqoption
    );
  }
  else {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/admin-transaction-logs?Skip=${skip}&Take=${take}&OrderBy=createdOn desc`,
      reqoption
    );
  }
}
export function GetShutdownLog(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/api-status?Skip=${skip}&Take=${take}&OrderBy=createdOn%20desc`,
    reqoption
  );
}

export function getActivityLog(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      Authorization: "Bearer " + authToken,
    },
  };
  const datholder = Cookie.get("dateforsearch");
  const datholder2 = Cookie.get("date2forsearch");
  const cSearch = Cookie.get("searchText");
  if (datholder > "") {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/api-activity-log?Skip=${skip}&Take=${take}&startDate=${datholder}&endDate=${datholder2}`,
      reqoption
    );
  } else if (cSearch > "") {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/api-activity-log?Skip=${skip}&Take=${take}&SearchText=${cSearch}`,
      reqoption
    );
  }
  else {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/log/api-activity-log?Skip=${skip}&Take=${take}`,
      reqoption
    );
  }
}
// -----------end of logs--------------

// ...................API for System Maintenance ...............

export function systemMaintenance(status) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/api-status?isAPIDown=${status}`,
    reqoption
  );
}
export function systemMaintenance1(count) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/api-status?Take=${count}`,
    reqoption
  );
}


// ------Phase 2 APIs call------


export function getProductModelInfo(skip, take) {
  let authToken = localStorage.getItem("authToken");
  const cSearch = Cookie.get("searchText");
  const filterValues = Cookie.get("filterValue");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  const apiUrl = `${process.env.REACT_APP_API_URL}/api/productModelInformation?status=${filterValues ?? ''}&Skip=${skip}&Take=${take}`;
  const searchText = cSearch ? `&SearchText=${cSearch}` : '';

  return fetch(`${apiUrl}${searchText}&OrderBy=createdOn desc`, reqoption);
}
// export function getProductModelPendingInfo(skip, take, status) {
//   debugger
//   let authToken = localStorage.getItem("authToken");
//   let cSearch = ""
//   cSearch = Cookie.get("searchText");
//   const filterValues = Cookie.get("filterValue");
//   const reqoption = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "melbeez-platform": globalheader,
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "Content-Type",
//       Authorization: "Bearer " + authToken,
//     },
//   };
//   const apiUrl = `${process.env.REACT_APP_API_URL}/api/productModelInformation?status=${filterValues ? filterValues : status ?? 0}&Skip=${skip}&Take=${take}`;
//   const searchText = cSearch ? `&SearchText=${cSearch}` : '';

//   return fetch(`${apiUrl}${searchText}&OrderBy=createdOn desc`, reqoption);
// }

export function getProductModelPendingInfo(skip, take, status) {
  let authToken = localStorage.getItem("authToken");
  let cSearch = "";
  cSearch = Cookie.get("searchText");
  const filterValues = Cookie.get("filterValue");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };

  let apiUrl = `${process.env.REACT_APP_API_URL}/api/productModelInformation?status=${filterValues ? filterValues : status ?? 0}&Skip=${skip}&Take=${take}`;

  if (filterValues) {
    apiUrl += `&filterValue=${filterValues}`;
  }

  const searchText = cSearch ? `&SearchText=${cSearch}` : '';

  return fetch(`${apiUrl}${searchText}&OrderBy=createdOn desc`, reqoption);
}


export function getProductModelSubmittedInfo(skip, take) {
  let authToken = localStorage.getItem("authToken");
  let cSearch = ""
  cSearch = Cookie.get("searchText");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  const apiUrl = `${process.env.REACT_APP_API_URL}/api/productModelInformation?status=2&Skip=${skip}&Take=${take}`;
  const searchText = cSearch ? `&SearchText=${cSearch}` : '';

  return fetch(`${apiUrl}${searchText}&OrderBy=createdOn desc`, reqoption);
}

export function getProductInputsById(payload) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/product-categories/form-builder-data/${payload}`,
    reqoption
  );
}

export function addProductInfo(payload) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(payload),
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/productModelInformation`,
    reqoption
  );
}
export function updateProduct(payload, productId) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(payload)
  };
  return fetch(`${process.env.REACT_APP_API_URL}/api/productModelInformation/${productId}`, reqoption);
}

export function deleteProductInfo(payload) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/productModelInformation?id=${payload}`, reqoption
  );
}

export function approveRejectProduct(payload) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(payload.id)
  };
  return fetch(`${process.env.REACT_APP_API_URL}/api/productModelInformation/approve-or-reject?status=${payload.status}`, reqoption);
}

export function bulkUpload(obj) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "POST",
    headers: {
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
    body: obj,
  };
  return fetch(`${process.env.REACT_APP_API_URL}/api/productModelInformation/bulk-upload`, reqoption);
}

export function updateApprovedProduct(payload, ID) {
  let authToken = localStorage.getItem("authToken");
  const reqoption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "melbeez-platform": globalheader,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(payload)
  };
  return fetch(`${process.env.REACT_APP_API_URL}/api/productModelInformation/${ID}`, reqoption);
}

