const axios = require('axios')

async function getCovid19Data() {
    try {
        console.log("Đang lấy dữ liệu xin vui lòng chờ")
        const response = await axios.get('https://api.covid19api.com/summary')
        return response
    } catch (error) {
        console.error(error)
    }
}

function getTheMostNewConfirmedCountries(countries) {
    const NewConfirmed = []
    countries.forEach(country => NewConfirmed[country.NewConfirmed] ? NewConfirmed[country.NewConfirmed]++ : NewConfirmed[country.NewConfirmed] = 1)
    const maxOfNewConfirmed = Math.max(...Object.keys(NewConfirmed))
    return countries.filter(country => country.NewConfirmed == maxOfNewConfirmed)
}

function getTheMostTotalDeathsCountries(countries) {
    const TotalDeaths = []
    countries.forEach(country => TotalDeaths[country.TotalDeaths] ? TotalDeaths[country.TotalDeaths]++ : TotalDeaths[country.TotalDeaths] = 1)
    const maxOfTotalDeaths = Math.max(...Object.keys(TotalDeaths))
    return countries.filter(country => country.TotalDeaths == maxOfTotalDeaths)
}

function printInformation(data) {
    console.log("Đã lấy dữ liệu thành công, đang xuất thống kê")
    console.log("Dữ liệu covid hôm nay:")
    console.log(`Nhiễm mới ${data.Global.NewConfirmed} - Số người chết mới: ${data.Global.NewDeaths} - Tổng số người chết: ${data.Global.TotalDeaths}`)
    const theMostTotalDeathsCountries = getTheMostTotalDeathsCountries(data.Countries)
    theMostTotalDeathsCountries.forEach(country => {
        console.log(`Quốc gia có số lượng tổng cộng người chết nhiều nhất là: ${country.Country} (${country.TotalDeaths} người)`)
    })
    const theMostNewConfirmedCountries = getTheMostNewConfirmedCountries(data.Countries)
    theMostNewConfirmedCountries.forEach(country => {
        console.log(`Quốc gia có số lượng người mắc mới trong ngày nhiều nhất là: ${country.Country} (${country.NewConfirmed} người)`)
    })
}

getCovid19Data()
    .then(response => printInformation(response.data))
    .catch(error => console.error(error))