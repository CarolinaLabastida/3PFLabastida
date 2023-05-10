
export interface Enrollment{
    id: number,
    courseId: number,
    studentId: number,
    date: Date
}

export interface formDataEnrollment {
    courseId: number,
    studentId: number
}

// const enrollments: Enrollment[] = [
//     {
//         id: 1,
//         courseId: 2,
//         studentId: 3,
//         date: new Date('2023-03-27')
//     },
//     {
//         id: 2,
//         courseId: 1,
//         studentId: 5,
//         date: new Date('2023-02-03')
//     },
//     {
//         id: 3,
//         courseId: 3,
//         studentId: 3,
//         date: new Date('2023-01-15')
//     },
//     {
//         id: 4,
//         courseId: 4,
//         studentId: 1,
//         date: new Date('2022-11-19')
//     },
//     {
//         id: 5,
//         courseId: 2,
//         studentId: 2,
//         date: new Date('2023-04-20')
//     },
//     {
//         id: 6,
//         courseId: 1,
//         studentId: 3,
//         date: new Date('2023-02-25')
//     },
//     {
//         id: 7,
//         courseId: 2,
//         studentId: 4,
//         date: new Date('2023-03-28')
//     },
//     {
//         id: 8,
//         courseId: 4,
//         studentId: 5,
//         date: new Date('2022-03-17')
//     }
// ]

// export default enrollments;