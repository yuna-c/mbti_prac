import { Section } from '../pages/Home'
import styled from 'styled-components'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { postExpense } from '../lib/api/expense'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const InputRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
`

const InputGroupInline = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 120px;
  label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
    text-align: left;
  }
  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`

const AddButton = styled.button`
  padding: 8px 20px;
  height: 34px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #0056b3;
  }
`

export default function CreateExpense({ month }) {
  const user = useAuthStore((state) => state.user)

  const [newDate, setNewDate] = useState(`2024-${String(month).padStart(2, '0')}-01`)
  const [newItem, setNewItem] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const navigate = useNavigate()

  const queryClient = new QueryClient()

  // 2. 데이터 사용할 때는 Mutation
  const mutation = useMutation({
    mutationFn: postExpense,
    onSuccess: () => {
      // usequery 사용시 캐시처리 => 데이터 쓰더라도 API가 지정해준 캐시타임 안쪽에는 이전의 데이터를 줌
      // 쓰거나 추가 삭제하면 새로운 데이터가 와 줘야 하기 때문에 useQuery의 expenses쿼리키를  invalidateQueries배열 안에 넣어주면
      // useMutation에서 mutationFn 성공시 expenses라는 쿼리 키 값의 가진 애들의 캐시를 다 없애줌
      // 새롭게 useQuery가 실행이 될 때 캐시 데이터를 가져오지 않고 새롭게 다시 패치
      queryClient.invalidateQueries(['expenses'])
      navigate(0)
    }
  })

  const handleAddExpense = () => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    if (!datePattern.test(newDate)) {
      alert('날짜를 YYYY-MM-DD 형식으로 입력해주세요.')
      return
    }

    const parsedAmount = parseInt(newAmount, 10)
    if (!newItem || parsedAmount <= 0) {
      alert('유효한 항목과 금액을 입력해주세요.')
      return
    }

    const newExpense = {
      id: uuidv4(),
      month: parseInt(newDate.split('-')[1], 10),
      date: newDate,
      item: newItem,
      amount: parsedAmount,
      description: newDescription,
      createdBy: user.userId
    }

    mutation.mutate(newExpense) // 뮤테이션에서 json서버로 바로 보내기
    // setExpenses([...expenses, newExpense])

    setNewDate(`2024-${String(month).padStart(2, '0')}-01`)
    setNewItem('')
    setNewAmount('')
    setNewDescription('')
  }

  return (
    <Section>
      <InputRow>
        <InputGroupInline>
          <label htmlFor="date">날짜</label>
          <input type="text" id="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} placeholder="YYYY-MM-DD" />
        </InputGroupInline>
        <InputGroupInline>
          <label htmlFor="item">항목</label>
          <input type="text" id="item" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="지출 항목" />
        </InputGroupInline>
        <InputGroupInline>
          <label htmlFor="amount">금액</label>
          <input type="number" id="amount" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} placeholder="지출 금액" />
        </InputGroupInline>
        <InputGroupInline>
          <label htmlFor="description">내용</label>
          <input type="text" id="description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="지출 내용" />
        </InputGroupInline>
        <AddButton onClick={handleAddExpense}>저장</AddButton>
      </InputRow>
    </Section>
  )
}
