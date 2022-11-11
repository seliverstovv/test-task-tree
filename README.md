# Тестовое задание
### Нарисовать дерево

Из внешнего API приходит дерево объектов в виде:
```
[
    {id: 1, x: 100, y: 0, parent_id: null},
    {id: 2, x: 80, y: 10, parent_id: 1},
    {id: 3, x: 120, y: 10, parent_id: 1},
    {id: 4, x: 70, y: 20, parent_id: 2},
    {id: 5, x: 90, y: 20, parent_id: 2},
    {id: 6, x: 130, y: 20, parent_id: 3}
]
```

Нужно нарисовать это дерево на SVG с использованием react:
```
      1
     / \
    2   3
   /\    \
  4  5    6
```

#### Часть 1 (done)
По клику на узел выделяем цветом его, всех его потомков и соединяющие их линии.
#### Часть 2 (done)
По клику на листовой элемент выделяем цветом его и путь к корневому элементу.
#### Часть 3 (done)
По клику на элемент(с зажатой клавишей shift) выделяем цветом его, при клике на другой элемент(с зажатой клавишей shift) выделяем цветом его 
и путь между двумя элементами.
#### Часть 4 (todo)
В ответе API не приходят координаты вершин, вычислять их автоматически для визуально удобного отображения дерева.
#### Часть 5 (todo)
Создать стор с использованием хука useReducer, избавиться от prop drilling
#### Часть 6 (todo)
Подготовить на базе разработанного функционала готовый для использования npm пакет

gh-pages - https://seliverstovv.github.io/test-task-tree/

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
