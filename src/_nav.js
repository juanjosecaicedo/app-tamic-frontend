export default {
    items: [{
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            title: true,
            name: "Sistema",
            class: "",
            wrapper: {
                element: "",
                attributes: {}
            }
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Dashboard",
            url: "/dashboard",
            icon: "icon-speedometer",
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Peliculas",
            url: "/base/movie",
            icon: "icon-control-play"
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Series",
            url: "/base/serie",
            icon: "icon-camrecorder"
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Canales TV",
            url: "/base/channel",
            icon: "icon-screen-desktop"
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Planes",
            url: "/base/plan",
            icon: "icon-bag"
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Usuarios",
            url: "/users",
            icon: "icon-people"
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Pagos",
            url: "/base/payments",
            icon: "icon-wallet"
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Notificaciones",
            url: "/base/notification",
            icon: "icon-bell"
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Añadir servicios",
            url: "/base/add_services",
            icon: "icon-bag"
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Módulos",
            url: "/base",
            icon: "icon-puzzle",
            children: [{
                    name: "Categorías",
                    url: "/base/category",
                    icon: "icon-puzzle"
                },
                {
                    name: "Enlaces",
                    url: "/base/link",
                    icon: "icon-puzzle"
                },
                {
                    name: "Roles",
                    url: "/base/roles",
                    icon: "icon-puzzle"
                },
                {
                    name: "Episodios",
                    url: "/base/chapter",
                    icon: "icon-puzzle"
                },
            ]
        },
        {
            permissions: [{
                code: "13b53dc5-f9b9-4275-bbf3-3617d09670ae"
            }, {
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            title: true,
            name: "Empresas",
            class: "",
            wrapper: {
                element: "",
                attributes: {}
            }
        },
        {
            permissions: [{
                code: "13b53dc5-f9b9-4275-bbf3-3617d09670ae"
            }, {
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Analítica",
            url: "/business/analytics",
            icon: "icon-graph"
        },
        {
            permissions: [{
                code: "13b53dc5-f9b9-4275-bbf3-3617d09670ae"
            }, {
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Ingresos",
            url: "/business/revenue",
            icon: "icon-chart"
        },
        {
            permissions: [{
                code: "13b53dc5-f9b9-4275-bbf3-3617d09670ae"
            }, {
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }],
            name: "Códigos",
            url: "/business/code",
            icon: "icon-layers"
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }, {
                code: "1ed085ff-418d-4b5b-bc78-8d4c6bd17330"
            }],
            title: true,
            name: "Colaborador",
            class: "",
            wrapper: {
                element: "",
                attributes: {}
            }
        },
        {
            permissions: [{
                code: "db2b9bdb-79c5-48d4-901c-09882a4db6eb"
            }, {
                code: "1ed085ff-418d-4b5b-bc78-8d4c6bd17330"
            }],
            name: "Crear usuario",
            url: "/collaborator/register/user",
            icon: "icon-settings"
        }

    ]
}