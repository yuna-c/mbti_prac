import axios from 'axios'

const JSON_SERVER_HOST = 'http://localhost:5000'

// RESTfull API

// 지출 데이터 전체 가져오기
export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
    alert('데이터 로드할 수 없어요 루저야')
  }
}

// 지출 데이터 개별 가져오기
// getExpense가 useQuery로 실행이 되었을 때 queryKey를 배열로 받음 = ['expenses', id]
export const getExpense = async ({ queryKey }) => {
  // const [_, id] = queryKey
  try {
    // const response = await axios.get(`${JSON_SERVER_HOST}/expenses${id}`)
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses/${queryKey[1]}`)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
    alert('개별 데이터 로드할 수 없어요 루저야')
  }
}

// 지출 데이터 보내기
export const postExpense = async (newExpense /*새로운 지출*/) => {
  try {
    // post콜은 andPoint 다음에 어떤 데이터를 써야하는지 body로 보냄
    const { data } = await axios.post(`${JSON_SERVER_HOST}/expenses`, newExpense)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    alert('데이터 써지지 않아요 루저야')
  }
}

// 수정된 지출 데이터
export const putExpense = async (updatedExpense) => {
  const { id, ...rest } = updatedExpense // 아이디 빼고 다 바뀜
  try {
    const { data } = await axios.put(`${JSON_SERVER_HOST}/expenses/${id}`, rest)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    alert('데이터 수정이 되지 않아요 루저야')
  }
}

// 삭제된 지출 데이터
export const deleteExpense = async (id) => {
  console.log(id)
  try {
    const { data } = await axios.delete(`${JSON_SERVER_HOST}/expenses/${id}`)
    return data
  } catch (error) {
    console.log(error)
    alert('데이터 삭제가 되지 않아요 루저야')
  }
}
