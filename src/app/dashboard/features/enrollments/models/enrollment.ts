import { Course } from "../../courses/models/course"
import { Student } from "../../students/models/student"

export interface Enrollment{
    id: number,
    courseId: number,
    studentId: number,
    date: Date
}

export interface EnrollmentModel{
    id: number,
    courseId: number,
    studentId: number,
    date: Date,
    course: Course,
    student: Student
}

export interface formDataEnrollment {
    courseId: number,
    studentId: number
}

