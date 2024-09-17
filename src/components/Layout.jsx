import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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

export default function Layout() {
  return (
    <>
      <Navbar>여기가 네비바</Navbar>
      <Outlet />
    </>
  )
}
