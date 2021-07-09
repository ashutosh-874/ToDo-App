import React, {useState} from 'react'
import { View, Text } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { ListView, TodoText, TodoDate, colors, HiddenButton, SwipedTodoText, ListViewHidden } from '../styles/appStyles'
import { Entypo } from '@expo/vector-icons'

const ListItems = ({todos, setTodos, handleTriggerEdit}) => {

    const [swipeRow, setSwipeRow] = useState(null)

    const handleDeleteTodo = (rowMap, rowKey) => {
        const newTodos = [...todos]
        const todoIndex = todos.findIndex((todo) => todo.key === rowKey)
        newTodos.splice(todoIndex, 1)
        setTodos(newTodos)
    }

    return (
        <>
        {todos.length === 0 && <TodoText>Wohoo! No tasks today</TodoText>}
        {todos.length !== 0 && <SwipeListView
                data={todos}
                renderItem = {(data) => {
                    const RowText = data.item.key === swipeRow ? SwipedTodoText : TodoText
                    return (
                        <ListView
                            underlayColor={colors.primary}
                            onPress={
                                () => {
                                    handleTriggerEdit(data.item)
                                }
                            }
                        >
                            <>
                            <RowText>{data.item.title}</RowText>
                            <TodoDate>{data.item.date}</TodoDate>
                            </>
                        </ListView>
                    )
                }} 
                renderHiddenItem = {(data, rowMap) => {
                    return (
                        <ListViewHidden>
                            <HiddenButton
                                onPress={
                                    () => handleDeleteTodo(rowMap, data.item.key)
                                }
                            >
                                <Entypo name="trash" size={25} color={colors.secondary} />
                            </HiddenButton>
                        </ListViewHidden>
                    )
                }}
                leftOpenValue={80}
                previewRowKey={"1"}
                previewOpenValue={80}
                previewOpenDelay={3000}
                disableLeftSwipe={true}
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1, paddingBottom: 30, marginBottom: 40
                }}
                onRowOpen={(rowKey) => {
                    setSwipeRow(rowKey)
                }}
                onRowClose = {() => {
                    setSwipeRow(null)
                }}
            />
        }
        </>
    )
}

export default ListItems
