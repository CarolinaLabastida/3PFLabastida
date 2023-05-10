
export interface Course{
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
    time: string
}

export interface formDataCourse {
    name: string,
    startDate: Date,
    endDate: Date,
    time: string
}

//     {
//         id: 1,
//         name: 'Java',
//         startDate: new Date('2023-05-15'),
//         endDate: new Date('2023-07-15'),
//         time: '14:00 - 16:00'
//     },
//     {
//         id: 2,
//         name: 'C#',
//         startDate: new Date('2023-07-03'),
//         endDate: new Date('2023-09-03'),
//         time: '10:00 - 12:00'
//     },
//     {
//         id: 3,
//         name: 'HTML',
//         startDate: new Date('2023-09-25'),
//         endDate: new Date('2023-11-25'),
//         time: '12:00 - 14:00'
//     },
//     {
//         id: 4,
//         name: 'Angular',
//         startDate: new Date('2023-06-01'),
//         endDate: new Date('2023-08-01'),
//         time: '8:00 - 10:00'
//     }
// ]

// export default courses;