interface NavItem{
    path:string;
    title: string;
    icon?: string;
}

const items: NavItem[] = [
    {
        path: "inicio",
        title: "Inicio",
        icon: "home"
    },
    {
        path: "alumnos",
        title: "Alumnos",
        icon: "group"
    },
    {
        path: "cursos",
        title: "Cursos",
        icon: "school"
    },
    {
        path: "inscripciones",
        title: "Inscripciones",
        icon: "collections_bookmark"
    }
]

export default items;