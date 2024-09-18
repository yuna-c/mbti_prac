import axios from 'axios'

const JSON_SERVER_HOST = 'http://localhost:5000'

// 지출 데이터 가져오기
export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error?.response?.data.message)
    alert('데이터 받아오기 실패한 것 같아요 루져야')
  }
}
