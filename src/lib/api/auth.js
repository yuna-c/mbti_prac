import axios from 'axios'

const AUTH_API_HOST = 'https://moneyfulpublicpolicy.co.kr'

// 회원가입
export const register = async ({ id, password, nickname }) => {
  try {
    // await axios.post(AUTH_API_HOST + '/register')
    const response = await axios.post(`${AUTH_API_HOST}/register`, {
      id: id,
      password: password,
      nickname: nickname
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error?.response?.data.message)
    alert(error?.response?.data.message)
  }
}
