import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { getExpense, putExpense, deleteExpense } from '../lib/api/expense'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 16px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
    text-align: left;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.danger ? '#ff4d4d' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.danger ? '#cc0000' : '#0056b3')};
  }
`

const BackButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`

export default function Detail() {
  const navigate = useNavigate()
  const { id } = useParams()

  // const selectedExpense = expenses.find((element) => element.id === id)

  // 3. useQuery
  const {
    data: selectedExpense,
    isLoading,
    isError
  } = useQuery({
    // useParams의 ID 추가
    queryKey: ['expenses', id],
    queryFn: getExpense
  })

  console.log(`선택된 비동기 데이터 =>`, selectedExpense)
  // selectedExpense는 비동기로 받아온 데이터기 때문에 처음에는 값이 없다
  const [date, setDate] = useState('')
  const [item, setItem] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  // useEffect로 값을 갖게 되면 새롭게 선택된(불러온) DB데이터로 바꿔줌
  useEffect(() => {
    if (selectedExpense) {
      setDate(selectedExpense.date)
      setItem(selectedExpense.item)
      setAmount(selectedExpense.amount)
      setDescription(selectedExpense.description)
    }
  }, [selectedExpense])

  const queryClient = new QueryClient()

  // 4. 데이터 사용할 때는 Mutation
  const mutationEdit = useMutation({
    mutationFn: putExpense,
    onSuccess: () => {
      // expenses가 들어간 모든 useQuery 키 값들을 다 리패치 시키기 때문에
      // queryClient.invalidateQueries(['expenses']) 이 코드가 실행되는 시점에
      // 페이지 데이터 자체가 리패치가 되고 리랜더링이 되기 때문에 네비게이트까지 콜이 가지 않아서 순서 변경
      navigate('/')
      queryClient.invalidateQueries(['expenses'])
    }
  })

  // 5. 데이터 삭제할 때는 Mutation
  const mutationDelete = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      navigate('/')
      queryClient.invalidateQueries(['expenses'])
    }
  })

  const handleEditExpense = () => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    if (!datePattern.test(date)) {
      alert('날짜를 YYYY-MM-DD 형식으로 입력해주세요.')
      return
    }
    if (!item || amount <= 0) {
      alert('유효한 항목과 금액을 입력해주세요.')
      return
    }

    // const newExpenses = expenses.map((expense) => {
    //   if (expense.id !== id) {
    //     return expense
    //   } else {
    //     return {
    //       ...expense,
    //       date: date,
    //       item: item,
    //       amount: amount,
    //       description: description
    //     }
    //   }
    // })
    // setExpenses(newExpenses)

    const newExpenses = {
      id: id,
      date: date,
      item: item,
      amount: parseInt(amount, 10),
      description: description
    }

    mutationEdit.mutate(newExpenses)
  }

  const handleDeleteExpense = () => {
    // const newExpenses = expenses.filter((expense) => expense.id !== id)
    // setExpenses(newExpenses)
    // navigate('/')

    mutationDelete.mutate(id)
  }

  // console.log('isLoading', isLoading)
  // console.log('isError', isError)

  if (isLoading) return <div>로딩중</div>
  if (isError) return <div>에러</div>

  return (
    <Container>
      <InputGroup>
        <label htmlFor="date">날짜</label>
        <input type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="YYYY-MM-DD" />
      </InputGroup>
      <InputGroup>
        <label htmlFor="item">항목</label>
        <input type="text" id="item" value={item} onChange={(e) => setItem(e.target.value)} placeholder="지출 항목" />
      </InputGroup>
      <InputGroup>
        <label htmlFor="amount">금액</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="지출 금액" />
      </InputGroup>
      <InputGroup>
        <label htmlFor="description">내용</label>
        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="지출 내용" />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={handleEditExpense}>수정</Button>
        <Button danger="true" onClick={handleDeleteExpense}>
          삭제
        </Button>
        <BackButton onClick={() => navigate(-1)}>뒤로 가기</BackButton>
      </ButtonGroup>
    </Container>
  )
}
