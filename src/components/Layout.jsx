import { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getUserInfo } from '../lib/api/auth'
import { useAuthStore } from '../store/authStore'

const Navbar = styled.nav`
  background-color: rgb(51, 51, 51);
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: calc(100% - 2rem);
  top: 0px;
  z-index: 1000;
  max-width: 1240px;
`
const NavItems = styled.div`
  display: flex;
  align-items: center;
`
const NavItem = styled(Link)`
  color: #fff;
  margin: 0 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`

const UserName = styled.span`
  color: #fff;
  margin-right: 20px;
`

const LogoutButton = styled.button`
  padding: 8px 12px;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`
const PageContainer = styled.div`
  padding: 6rem 2rem;
`

export default function Layout() {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const navigate = useNavigate()

  // 냐미냐미*
  useEffect(() => {
    getUserInfo().then((res) => {
      // 새로고침 시 회원 정보 access토큰으로 받아오고
      console.log('useEffect 내부 , 현재 로그인 된 유저가 있나요?', res)
      if (res) {
        setUser({ userId: res.id, nickname: res.nickname, avatar: res.avatar })
      } else {
        // 토큰 만료시 로컬스토리지 비우고, setUser 초기화, 로그인 페이지로 돌리기
        handleLogout()
      }
    })
  }, [])

  console.log(`현재 로그인 유저 아이디`, user)

  const handleLogout = () => {
    setUser(null)
    alert('로그아웃')
    navigate('/signin')
    localStorage.clear()
  }

  return (
    <>
      <Navbar>
        <NavItems>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/profile">프로필</NavItem>
        </NavItems>
        <UserProfile>
          {user && (
            <>
              <UserAvatar src={user.avatar} alt={user.nickname} />
              <UserName>{user.nickname}</UserName>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          )}
        </UserProfile>
      </Navbar>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  )
}
