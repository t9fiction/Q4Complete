const initialState = {
    todoList: [
        {
            title: 'Task 1',
            id: "1"
        },
        {
            title: 'Task 2',
            id: "2"
        },
        {
            title: 'Task 3',
            id: "3"
        }
    ]
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO': {
            return {
                ...state,
                todoList: [...state.todoList, action?.payload]
            }

        }
        case 'DELETE_TODO': {
            return {
                ...state,
                todoList: state.todoList.filter((item) => item.id !== action.payload.id)
            }
        }
        case 'EDIT_TODO': {
            return {
                ...state,
                todoList: state.todoList.map((item) => {
                    if (item.id == state.payload.id) {
                        return {
                            ...item, title: action.payload.title
                        }
                    }
                    else {
                        return item;
                    }
                })
            }
        }
        case 'DELETE_ALL': {

            return {
                ...state,
                todoList: []
            }
        }
        default:
            return {
                ...state
            }
    }
}

// export default todoReducer;