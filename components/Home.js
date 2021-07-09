import React, {useState, useEffect} from 'react'
import { Text, View } from 'react-native'
import Header from './Header';
import {  } from "../styles/appStyles";
import ListItems from './ListItems';
import InputModel from './InputModel';

const Home = () => {

    // initial todos
    const initialTodos = [
        {
            title: 'Get Some cofee',
            date: "Fri, 08 Jan 20221 16:32:11 GMT",
            key: "1"
        },
        {
            title: 'Get me cofee',
            date: "Fri, 08 Jan 20221 16:32:11 GMT",
            key: "2"
        },
        {
            title: 'Get sdasds cofee',
            date: "Fri, 08 Jan 20221 16:32:11 GMT",
            key: "3"
        },
        {
            title: 'Get 1212 cofee',
            date: "Fri, 08 Jan 20221 16:32:11 GMT",
            key: "4"
        }
    ]

    const [todos, setTodos] = useState(initialTodos)
    const [modalVisible, setModalVisible] = useState(false)
    const [todoInputValue, setTodoInputValue] = useState()

    // add new todo
    const handleAddTodo = (todo) => {
        setTodos(initial => [...initial, todo])
        setModalVisible(false)
    }

    const handleClearTodos = () => {
        setTodos([])
    }
    
    const [todoToBeEdited, setTodoToBeEdited] = useState(null)

    useEffect(() => {
        console.log('todoToBeedited', todoToBeEdited)
    }, [todoToBeEdited])

    const handleTriggerEdit = (item) => {
        setTodoToBeEdited(item)
        setModalVisible(true)
        setTodoInputValue(item.title)
    }

    const handleEditTodo = (editedTodo) => {
        const newTodos = [...todos]
        const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key)
        newTodos.splice(todoIndex, 1, editedTodo)
        setTodos(newTodos)
        setTodoToBeEdited(null)
        setModalVisible(false)
    }
    
    return (
        <>
            <Header handleClearTodos={handleClearTodos} />
            <ListItems todos={todos} setTodos={setTodos} handleTriggerEdit={handleTriggerEdit} />
            <InputModel 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                todoInputValue={todoInputValue}
                setTodoInputValue={setTodoInputValue}
                handleAddTodo={handleAddTodo}
                todos={todos}
                todoToBeEdited={todoToBeEdited}
                setTodoToBeEdited={setTodoToBeEdited}
                handleEditTodo={handleEditTodo}
            />
        </>
    )
}

export default Home
