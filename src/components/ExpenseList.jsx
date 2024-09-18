import { Section } from '../pages/Home'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getExpenses } from '../lib/api/expense'

const ExpenseItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  span {
    font-size: 16px;
    color: #333;
  }

  span:last-child {
    font-weight: bold;
    color: #007bff;
    flex-shrink: 0;
  }
`

const ExpenseDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    &:first-child {
      margin-bottom: 5px;
      color: #666;
      font-size: 14px;
    }

    &:last-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  }
`

export default function ExpenseList() {
  const navigate = useNavigate()

  // 1. 데이터 가져오기 useQuery
  const {
    data: expenses = [],
    // 데이터가 아직 로딩 중이거나 오류가 발생한 경우 expenses에 빈 배열 []을 기본값으로 설정
    isLoading,
    isError
  } = useQuery({
    queryKey: ['expenses'],
    // ['expense']라는 키를 통해 getExpenses 함수의 결과를 캐싱하고, 이후 동일한 키로 쿼리를 식별
    queryFn: getExpenses
  })

  console.log('isLoading', isLoading)
  console.log('isError', isError)
  console.log('expenses', expenses)

  if (isLoading) return <div>로딩중</div>
  if (isError) return <div>에러</div>

  return (
    <Section>
      <ExpenseItemList>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            onClick={() => {
              navigate(`/detail/${expense.id}`)
            }}
          >
            <ExpenseDetails>
              <span>{expense.date}</span>
              <span>{`${expense.item} - ${expense.description}`}</span>
            </ExpenseDetails>
            <span>{expense.amount ? expense.amount.toLocaleString() : '금액 정보 없음'} 원</span>
          </ExpenseItem>
        ))}
      </ExpenseItemList>
    </Section>
  )
}
