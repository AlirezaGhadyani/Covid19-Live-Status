// select elements
const countryName = $selector('.name')
const totalCases = $selector('.total-cases .value')
const recoveredCases = $selector('.recovered .value')
const deathsCases = $selector('.deaths .value')

//data varaibles
let total, recovered, deaths

// getting data from api
const fetchApi = async country => {
  try {
    const response = await fetch(
      `https://covid-19-data.p.rapidapi.com/country?name=${country}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            'c189d4b624mshdae4096eb9c1042p19bdb5jsne1b91f574ab0',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
        }
      }
    )
    const data = await response.json()
    total = data[0].confirmed
    recovered = data[0].recovered
    deaths = data[0].deaths
    setData()
  } catch (error) {
    console.log(error)
  }
}

// get the users country code with geoPlugine Api
const userCountruCode = geoplugin_countryCode()
let userCountry

country_List.forEach(country => {
  if (country.code == userCountruCode) {
    userCountry = country.name
  }
})
countryName.innerText = userCountry
fetchApi(userCountry)

const fetchData = country => {
  userCountry = country.innerText
  countryName.innerText = userCountry
  fetchApi(userCountry)
}

//set data in dom
const setData = () => {
  totalCases.innerText = total
  recoveredCases.innerText = recovered
  deathsCases.innerText = deaths
}
