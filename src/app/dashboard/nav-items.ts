interface NavItem{
    path:string;
    title: string;
    icon?: string;
    roles: string[];
}

const items: NavItem[] = [
    {
        path: "inicio",
        title: "Inicio",
        icon: "home",
        roles: ['Administrador', 'Usuario']
    },
    {
        path: "alumnos",
        title: "Alumnos",
        icon: "group",
        roles: ['Administrador', 'Usuario']
    },
    {
        path: "cursos",
        title: "Cursos",
        icon: "school",
        roles: ['Administrador', 'Usuario']
    },
    {
        path: "inscripciones",
        title: "Inscripciones",
        icon: "collections_bookmark",
        roles: ['Administrador', 'Usuario']
    },
    {
        path: "usuarios",
        title: "Usuarios",
        icon: "manage_accounts",
        roles: ['Administrador']
    }
]

export default items;