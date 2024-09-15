import TestForm from '../components/TestForm'
import { calculateMBTI } from '../utils/mbtiCalculator'
import { createTestResult } from '../api/testResults'
import { useNavigate } from 'react-router-dom'

const TestPage = ({ user }) => {
  const navigate = useNavigate()

  const handleTestSubmit = async (answers) => {
    const result = calculateMBTI(answers)
    const resultData = {
      userId: user.id,
      nickname: user.nickname,
      result,
      answers,
      date: new Date().toISOString(),
      visibility: true
    }
    console.log(result)
    console.log(resultData)
    await createTestResult(resultData)
    navigate('/results')
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">MBTI 테스트</h1>
      <TestForm onSubmit={handleTestSubmit} />
    </div>
  )
}

export default TestPage
