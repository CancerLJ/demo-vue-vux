const Index = res => require(['@/views/index'], res)
const Article = res => require(['@/views/article'], res)
const Search = res => require(['@/views/search'], res)
const User = res => require(['@/views/user'], res)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/user',
    name: 'user',
    component: User
  }
]

export default routes
