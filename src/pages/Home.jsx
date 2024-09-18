import styled from 'styled-components'
import { useState } from 'react'
import MonthNavigation from '../components/MonthNavigation'
import ExpenseList from '../components/ExpenseList'
import CreateExpense from '../components/CreateExpense'
import { useAuthStore } from '../store/authStore'

const Container = styled.main`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`

export const Section = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
`

export default function Home() {
  const [month, setMonth] = useState(1)

  // const filteredExpenses = expenses.filter((expense) => expense.month === month)

  return (
    <Container>
      <MonthNavigation month={month} setMonth={setMonth} />
      <CreateExpense month={month} />
      <ExpenseList />
    </Container>
  )
}
