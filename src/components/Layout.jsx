import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Props 로 꼭 children 만 받을 필요는 없답니다.
const Layout = ({ children, setUser, user }) => {
  const navigate = useNavigate()

  // 이곳에서 로그인 하지 않은 사용자를 login 페이지로 보내줄 거에요.
  useEffect(() => {}, [])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    navigate('/')
  }

  return (
    <>
      <header className="border border-black">
        <nav className="flex justify-between p-4">
          <Link to="/">홈</Link>
          <div className="space-x-4">
            {user ? (
              <div className="flex gap-2 items-center">
                <Link to="/profile">프로필</Link>
                <Link to="/test">테스트</Link>
                <Link to="/results">결과</Link>
                <div>{user.nickname}님</div>
                <button onClick={handleLogout}>로그아웃</button>
              </div>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto main">{children}</main>
    </>
  )
}

export default Layout
