import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () =>
    import('@/containers/DefaultContainer')

// Views
const Dashboard = () =>
    import('@/views/Dashboard')

// Views - Components
const Channel = () =>
    import('@/views/base/Channel')
const Notification = () =>
    import('@/views/base/Notification')
const Category = () =>
    import('@/views/base/Category')
const Movie = () =>
    import('@/views/base/Movie')
const Serie = () =>
    import('@/views/base/Serie')
const Plan = () =>
    import('@/views/base/Plan')
const Link = () =>
    import('@/views/base/Link')
const Profile = () =>
    import('@/views/base/Profile')
const Roles = () =>
    import('@/views/base/Roles')
const Chapter = () =>
    import('@/views/base/Chapter')
const Users = () =>
    import('@/views/base/Users')
const Payments = () =>
    import('@/views/base/Payments')
const AddServices = () => 
    import('@/views/base/AddServices')

// View - Streaming
const Browse = () =>
    import('@/views/streaming/Browse')
const Detail = () =>
    import('@/views/streaming/Detail')
const Watch = () =>
    import('@/views/streaming/Watch')
const Categories = () =>
    import('@/views/streaming/Categories')
const Series = () =>
    import('@/views/streaming/Series')
const Channels = () =>
    import('@/views/streaming/Channels')
const Search = () =>
    import('@/views/streaming/Search')
const Setting = () =>
    import('@/views/streaming/Setting')
const DefaultView = () =>
    import('@/views/streaming/containers/DefaultView')
const Profiles = () =>
    import('@/views/streaming/Profiles')
const Manage_Profile = () =>
    import('@/views/streaming/Manage_Profile')
const Control = () =>
    import('@/views/streaming/Control')


// Views - Business
const Analytics = () =>
    import('@/views/business/Analytics')
const Revenue = () =>
    import('@/views/business/Revenue')
const Code = () =>
    import('@/views/business/Code')

// Views - Collaborator
const RegisterUser = () =>
    import('@/views/collaborator/RegisterUser')

// Views - Auth
const Welcome = () =>
    import('@/views/auth/Welcome')
const Page404 = () =>
    import('@/views/auth/Page404')
const Page500 = () =>
    import('@/views/auth/Page500')
const Login = () =>
    import('@/views/auth/Login')
const Register = () =>
    import('@/views/auth/Register')
const Recover = () =>
    import('@/views/auth/Recover')
const Subscription = () =>
    import('@/views/auth/Subscription')
const Resellers = () =>
    import('@/views/auth/Resellers')
const Transaction = () =>
    import('@/views/auth/Transaction')
const changePassword = () =>
    import('@/views/auth/Recover')
const Terms = () =>
    import('@/views/auth/Terms')
const Loading = () =>
    import('@/views/auth/Loading')

Vue.use(Router)

var ip = null;

function fnt_validate_rute(to, from, next) {
    axios.post('permission').then((res) => {
        if (res.status === 200) {
            if (res.data.rol_id !== 'c1a0761a-09a5-4cdd-b213-ec4639c55c06' && res.data.rol_id !== null && res.data.rol_id !== '' &&
                res.data.rol_id !== undefined) {
                let next_permisison = to.meta.permission.find((e) => e.code === res.data.rol_id);
                if (next_permisison) {
                    next(); //ef575f0f-0d43-4252-a6a2-5d3d9395ca36
                } else {
                    next({
                        name: 'Login'
                    });
                }
            } else {
                next({
                    name: 'Login'
                });
            }
        } else {
            next({
                name: 'Login'
            });
        }
    }).catch((error) => {
        console.log('Error', error);
    });
}

function fnt_validate_session(to, from, next) {
    axios.post('session').then((res) => {
        if (res.data.session.online === 0) {
            next({
                name: 'Login'
            });
        } else if (res.data.session.online === 1 && res.data.session.status_service === 0) {
            next({
                name: 'Setting'
            });
        } else if (res.data.session.online === 1 && res.data.session.status_service >= 1) {
            let json_session_data = JSON.parse(localStorage.getItem('sessionData'));
            if (json_session_data.activeServices !== res.data.session.status_service) {
                json_session_data.activeServices = res.data.session.status_service;
                localStorage.setItem('sessionData', JSON.stringify(json_session_data));
            }
            if (localStorage.getItem('profile') === undefined) {
                next({
                    name: 'Profiles'
                })
            } else {
                next()
            }
        }
    }).catch((error) => {
        console.log('Error', error);
    });
}

function configRoutes() {
    return [{
            path: '/',
            name: 'Main',
            component: Welcome
        },
        {
            path: '/tutorials',
            component: Welcome
        },
        {
            path: '/experience',
            component: Welcome
        },
        {
            path: '/premieres',
            component: Welcome
        },
        {
            path: '/header',
            component: Welcome
        },
        {
            path: '*',
            name: 'NotFound',
            component: Page404
        },
        {
            path: '/auth',
            redirect: '/auth/login',
            name: 'Auth',
            component: {
                render(c) {
                    return c('router-view')
                }
            },
            children: [{
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: 'terms',
                    name: 'Terms',
                    component: Terms
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register
                },
                {
                    path: 'recover',
                    name: 'Recover',
                    component: Recover
                },
                {
                    path: 'loading',
                    name: 'Loading',
                    component: Loading
                },
                {
                    path: 'subscription',
                    name: 'Subscription',
                    component: Subscription
                },
                {
                    path: 'resellers',
                    name: 'resellers',
                    component: Resellers
                },
                {
                    path: 'transaction',
                    name: 'Transaction',
                    component: Transaction
                }, {
                    path: 'changePassword/:id',
                    name: 'changePassword',
                    component: changePassword
                }
            ]
        },
        {
            path: '/streaming',
            redirect: '/streaming/profiles',
            name: 'Streaming',
            component: DefaultView,
            children: [{
                    path: 'manage/profile',
                    name: 'Manage_Profile',
                    component: Manage_Profile,
                },
                {
                    path: 'profiles',
                    name: 'Profiles',
                    component: Profiles,
                    props: true
                }, {
                    path: 'browse',
                    name: 'Browse',
                    component: Browse,
                    beforeEnter: fnt_validate_session
                },
                {
                    path: 'detail',
                    name: 'Detail',
                    component: Detail,
                    props: true,
                    beforeEnter: fnt_validate_session,
                },
                {
                    path: 'control',
                    name: 'Control',
                    component: Control,
                    props: true,
                    beforeEnter: fnt_validate_session,
                },
                {
                    // path: 'watch/:item',
                    path: 'watch',
                    name: 'Watch',
                    component: Watch,
                    props: true
                },
                {
                    path: 'categories',
                    name: 'Categories',
                    component: Categories,
                    props: true,
                    beforeEnter: fnt_validate_session,
                },
                {
                    path: 'series',
                    name: 'Series',
                    component: Series,
                    beforeEnter: fnt_validate_session,
                },
                {
                    path: 'channels',
                    name: 'Channels',
                    component: Channels,
                    beforeEnter: fnt_validate_session,
                },
                {
                    path: 'search',
                    name: 'Search',
                    component: Search,
                    beforeEnter: fnt_validate_session,
                },
                {
                    path: 'setting',
                    name: 'Setting',
                    component: Setting
                }
            ]
        }, {
            path: '/',
            redirect: '/business/analytics',
            name: 'Home',
            beforeEnter: fnt_validate_rute,
            meta: {
                permission: [{
                        code: "13b53dc5-f9b9-4275-bbf3-3617d09670ae",
                        value: "Empresa"
                    },

                    {
                        code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                        value: "Administrador"
                    }
                ]
            },
            component: DefaultContainer,
            children: [{
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                    meta: {
                        permission: [{
                                code: "13b53dc5-f9b9-4275-bbf3-3617d09670ae",
                                value: "Empresa"
                            },

                            {
                                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                value: "Administrador"
                            }
                        ]
                    }
                },
                {
                    path: 'users',
                    name: 'Users',
                    component: Users,
                    meta: {
                        permission: [{
                            code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                            value: "Administrador"
                        }]
                    }
                },
                {
                    path: 'base',
                    redirect: '/base/channel',
                    name: 'Base',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                            path: 'channel',
                            name: 'Channel',
                            component: Channel,
                            meta: {
                                permission: [{
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            }
                        },
                        {
                            path: 'notification',
                            name: 'Notification',
                            component: Notification,
                            meta: {
                                permission: [{
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            }
                        },
                        {
                       
                            path: 'add_services',
                            name: 'AddServices',
                            component: AddServices,
                            meta: {
                                permission: [{
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            }
                        },
                        {
                            path: 'category',
                            name: 'Category',
                            component: Category,
                            meta: {
                                permission: [{
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            }
                        },
                        {
                            path: 'movie',
                            name: 'Movie',
                            component: Movie,
                            meta: {
                                permission: [{
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            }
                        },
                        {
                            path: 'Serie',
                            name: 'Serie',
                            component: Serie,
                            meta: {
                                permission: [{
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            }
                        },
                        {
                            path: 'plan',
                            name: 'Plan',
                            component: Plan,
                            meta: {
                                permission: [{
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            }
                        },
                        {
                            path: 'link',
                            name: 'Link',
                            component: Link,
                            meta: {
                                permission: [{
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            }
                        },
                        {
                            path: 'profile',
                            name: 'Profile',
                            component: Profile,
                            meta: {
                                permission: [{
                                    code: "13b53dc5-f9b9-4275-bbf3-3617d09670ae",
                                    value: "Empresa"
                                }, {
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            }
                        },
                        {
                            path: 'roles',
                            name: 'roles',
                            component: Roles,
                            meta: {
                                permission: [{
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            }
                        },
                        {
                            path: 'payments',
                            name: 'Payments',
                            component: Payments,
                            meta: {
                                permission: [{
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            }
                        },
                        {
                            path: 'chapter',
                            name: 'Chapter',
                            meta: {
                                permission: [{
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }]
                            },
                            component: Chapter
                        },
                    ]
                },
                {
                    path: 'business',
                    redirect: '/business/analytics',
                    name: 'Business',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                            path: 'analytics',
                            name: 'Analytics',
                            component: Analytics,
                            beforeEnter: fnt_validate_rute,
                            meta: {
                                permission: [{
                                        code: "13b53dc5-f9b9-4275-bbf3-3617d09670ae",
                                        value: "Empresa"
                                    },
                                    {
                                        code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                        value: "Administrador"
                                    }
                                ]
                            }
                        },
                        {
                            path: 'revenue',
                            name: 'Revenue',
                            component: Revenue,
                            meta: {
                                permission: [{
                                        code: "13b53dc5-f9b9-4275-bbf3-3617d09670ae",
                                        value: "Empresa"
                                    },
                                    {
                                        code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                        value: "Administrador"
                                    }
                                ]
                            }
                        },
                        {
                            path: 'code',
                            name: 'Code',
                            component: Code,
                            meta: {
                                permission: [{
                                        code: "13b53dc5-f9b9-4275-bbf3-3617d09670ae",
                                        value: "Empresa"
                                    },

                                    {
                                        code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                        value: "Administrador"
                                    }
                                ]
                            }
                        }
                    ]
                }, {
                    path: 'collaborator',
                    redirect: '/collaborator/register/user',
                    name: 'Collaborator',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'register/user',
                        name: 'RegisterUser',
                        component: RegisterUser,
                        meta: {
                            permission: [{
                                    code: "1ed085ff-418d-4b5b-bc78-8d4c6bd17330",
                                    value: "Empleado"
                                },
                                {
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }
                            ]
                        }
                    },{
                        path: 'register/statics',
                        name: 'StaticsEmployee',
                        component: RegisterUser,
                        meta: {
                            permission: [{
                                    code: "1ed085ff-418d-4b5b-bc78-8d4c6bd17330",
                                    value: "Empleado"
                                },
                                {
                                    code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
                                    value: "Administrador"
                                }
                            ]
                        }
                    }]
                }
            ]
        }
    ]
}

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'open active',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: configRoutes()
})