// 여러분 그냥 복사 붙여넣기를 하면 소용이 없어요. 왜냐하면 아직 페이지 컴포넌트들을 안만들었으니까요. 한번 어떻게 App.jsx 에서 라우팅 설정이 될 것인가 이해를 해봅시다.
// 그리고 여기에서 중요한 것은 저는 user 를 useState 를 이용해서 App.jsx 에서 상태관리를 해주고, 하위 라우터 혹은 컴포넌트들로 넘겨주고 있는데요. props-drilling 방식이 싫다! 라고 하시면, context 나 zustand 혹은 redux 같은 상태관리 라이브러리를 적극적으로 사용해주세요!

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
// import ProfilePage from './pages/ProfilePage'
// import TestPage from './pages/TestPage'
// import TestResultPage from './pages/TestResultPage'
// import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />

          {/*
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <ProfilePage user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute user={user}>
                <TestPage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute user={user}>
                <TestResultPage user={user} />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
