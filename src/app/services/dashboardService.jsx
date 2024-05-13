
const globalheader = "AdminPortal"

// -------------API for Dashboard Charts---------
export function reqDashboardChart(isWeekly) {
    let authToken = localStorage.getItem("authToken")
    var myHeaders = {
    'Content-Type' :  'application/json',
    "melbeez-platform": globalheader,
    Authorization : "Bearer " + authToken
    }
    const reqOption = {
        method: "GET",
        headers: myHeaders
    }
    return fetch(`${process.env.REACT_APP_API_URL}/api/chart/admin-dashboard/?IsWeekly=${isWeekly}`, reqOption);
}
export function reqDashboardChartforyear(isWeekly, year) {
    let authToken = localStorage.getItem("authToken")
    var myHeaders = {
    'Content-Type' :  'application/json',
    "melbeez-platform": globalheader,
    Authorization : "Bearer " + authToken
    }
    const reqOption = {
        method: "GET",
        headers: myHeaders, 
    }
    return fetch(`${process.env.REACT_APP_API_URL}/api/chart/admin-dashboard/?Year=${year}&IsWeekly=${isWeekly}`, reqOption);
}
export function reqDashboardChartformonth(isWeekly,year,month) {
    let authToken = localStorage.getItem("authToken")
    var myHeaders = {
    'Content-Type' :  'application/json',
    "melbeez-platform": globalheader,
    Authorization : "Bearer " + authToken
    }
    const reqOption = {
        method: "GET",
        headers: myHeaders
    }
    return fetch(`${process.env.REACT_APP_API_URL}/api/chart/admin-dashboard/?Month=${month}&Year=${year}&IsWeekly=${isWeekly}`, reqOption);
}

export function getDashBoardChart () {
    let authToken = localStorage.getItem("authToken")
    var myHeaders = {
    'Content-Type' :  'application/json',
    "melbeez-platform": globalheader,
    Authorization : "Bearer " + authToken
    }
    const reqOption = {
        method: "GET",
        headers: myHeaders
    }
    return fetch(`${process.env.REACT_APP_API_URL}/api/chart/admin-dashboard`, reqOption);
}



// ................................API FOR DOWNLOAD CHART................

export function reqChartGraph(type,year,month,isWeekly) {
    let authToken = localStorage.getItem("authToken")
    var myHeaders = {
    'Content-Type' :  'application/json',
    "melbeez-platform": globalheader,
    Authorization : "Bearer " + authToken
    }
    const reqOption = {
        method: "GET",
        headers: myHeaders
    }
    if(month == null ){
        return fetch(`${process.env.REACT_APP_API_URL}/api/chart/Report?GraphName=${type}&Year=${year}&IsWeekly=${isWeekly}`, reqOption);
    }
    else{
        return fetch(`${process.env.REACT_APP_API_URL}/api/chart/Report?GraphName=${type}&Year=${year}&Month=${month}&IsWeekly=${isWeekly}`, reqOption);
    }
}