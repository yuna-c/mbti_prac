import { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getUserInfo } from '../lib/api/auth'

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
  margin-left: 10px;
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

export default function Layout({ setUser, user }) {
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
        setUser(null)
        navigate('/signin')
        localStorage.clear()
      }
    })
  }, [])

  console.log(`현재 로그인 유저 아이디`, user)

  return (
    <>
      <Navbar>여기가 네비바</Navbar>
      <Outlet />
    </>
  )
}
