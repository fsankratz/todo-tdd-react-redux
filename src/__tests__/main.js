import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import App from "../App";
import {configureStore} from "@reduxjs/toolkit";
import {todosReducer} from "../story/Todos";
import {Provider} from "react-redux";

const renderWithStore = ui => {
    render(<Provider store={configureStore({ reducer: todosReducer })}>{ui}</Provider>)
}

const renderAppWith = (...args) => {
    renderWithStore(<App />)
    args.forEach(arg => arg())
}

describe('after loading the app', () => {
    const washDishes = "wash dishes"
    const enterWashDishes = () => {
        const todoInput = screen.getByLabelText('Todo:')
        userEvent.type(todoInput, washDishes)
    }
    test('when there are no todos, see text that says "nothing here yet"', () => {
        renderAppWith()
        const nothingHereText = screen.getByText("Nothing here yet...")
        expect(nothingHereText).toBeInTheDocument()
    })

    test('see an input field to add an item', () => {
        renderAppWith()
        const todoInput = screen.getByLabelText('Todo:')
        expect(todoInput).toBeInTheDocument()
    })

    test('see a button saying "add"', () => {
        renderAppWith()
        const addBtn = screen.getByRole('button', { name: 'Add'})
        expect(addBtn).toBeInTheDocument()
    })
    test('the add button is disabled when input is empty', () => {
        renderAppWith()
        const addBtn = screen.getByRole('button', { name: 'Add'})
        expect(addBtn).toBeDisabled()
    })

    describe('after adding a todo item', () => {
        const addWashDishesTodo = () => {
            enterWashDishes()
            const addBtn = screen.getByRole('button', { name: 'Add'})
            userEvent.click(addBtn)
        }
        test('hide the text saying "nothing here yet"', () => {
            renderAppWith(addWashDishesTodo)
            const nothingHereText = screen.queryByText('Nothing here yet...')
            expect(nothingHereText).not.toBeInTheDocument()
        })
        test('see the text I entered in the todo list', () => {
            renderAppWith(addWashDishesTodo)
            const todo = screen.getByText(washDishes)
            expect(todo).toBeInTheDocument()
        })
        test('clear the input', () => {
            renderAppWith(addWashDishesTodo)
            const todoInput = screen.getByLabelText('Todo:')
            expect(todoInput).toHaveDisplayValue('')
        })
        test('show a button to remove the todo', () => {
            renderAppWith(addWashDishesTodo)
            const removeBtn = screen.getByRole('button', {name: 'Remove'})
            expect(removeBtn).toBeInTheDocument()
        })
        test('remove the task when clicking on the remove button', () => {
            renderAppWith(addWashDishesTodo)
            const removeBtn = screen.getByRole('button', {name:'Remove'})
            userEvent.click(removeBtn)
            const todo = screen.queryByText(washDishes)
            expect(todo).not.toBeInTheDocument()
        })
        test('see a button to clear all tasks', () => {
            renderAppWith(addWashDishesTodo)
            const clearBtn = screen.getByRole('button', { name: 'Clear all'})
            expect(clearBtn).toBeInTheDocument()
        })
        describe('when clicking on the todo', () => {
            const clickOnTodoOnce = () => {
                const todo = screen.getByRole('button', {name: washDishes})
                userEvent.click(todo)
            }
            test('make it strikethrough', () => {
                renderAppWith(addWashDishesTodo, clickOnTodoOnce)
                const todo = screen.getByRole('button', {name: washDishes})
                expect(todo).toHaveClass('line-through')
            })
            test('twice, remove strikethrough', () => {
                renderAppWith(addWashDishesTodo, clickOnTodoOnce, clickOnTodoOnce)
                const todo = screen.getByRole('button', {name: washDishes})
                expect(todo).not.toHaveClass('line-through')
            })
        })
        describe('after adding a second item', () => {
            const doHomework = 'do homework'
            const addDoHomeworkTodo = () => {
                const addBtn = screen.getByRole('button', { name: 'Add'})
                const todoInput = screen.getByLabelText('Todo:')
                userEvent.type(todoInput, doHomework)
                userEvent.click(addBtn)
            }
            test('see both', () => {
                renderAppWith(addWashDishesTodo, addDoHomeworkTodo)
                const washDishesTodo = screen.getByText(washDishes)
                const doHomeworkTodo = screen.getByText(doHomework)
                expect(washDishesTodo).toBeInTheDocument()
                expect(doHomeworkTodo).toBeInTheDocument()
            })
            test('after clicking clear all button, see empty list', () => {
                renderAppWith(addWashDishesTodo, addDoHomeworkTodo)
                const clearBtn = screen.getByRole('button', { name: 'Clear all'})
                userEvent.click(clearBtn)
                const nothingHereText = screen.getByText('Nothing here yet...')
                expect(nothingHereText).toBeInTheDocument()
            })
        })
    })
})
