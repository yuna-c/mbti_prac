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

// 로그인
export const login = async ({ id, password }) => {
  try {
    // ?expiresIn=10m : 유효시간을 10분인 accessToken 요청
    const response = await axios.post(`${AUTH_API_HOST}/login?expiresIn=10m`, {
      id: id,
      password: password
    })
    console.log(response)
    localStorage.setItem('accessToken', response.data.accessToken)
    return response.data
  } catch (error) {
    console.log(error?.response?.data.message)
    alert(error?.response?.data.message)
  }
}

// 회원정보 가져오기
export const getUserInfo = async () => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    try {
      const response = await axios.get(`${AUTH_API_HOST}/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response.data
    } catch (error) {
      console.log(error?.response?.data.message)
      alert('accessToken이 만료되었습니다')
      localStorage.clear()
    }
  }
}

// 업데이트 프로필
// https://developer.mozilla.org/ko/docs/Web/API/FormData
export const updateProfile = async (formData /*{ nickname, avatar }*/) => {
  console.log(formData)
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    try {
      const response = await axios.petch(
        `${AUTH_API_HOST}/profile`,
        { formData },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      return response.data
    } catch (error) {
      console.log(error?.response?.data.message)
      alert(error?.response?.data.message)
      localStorage.clear()
    }
  }
}
